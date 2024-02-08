import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import FoodCard from '../../components/food/foodCard';
import { Button, Card, CardBody, Spinner } from 'reactstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import AddToCartCard from '../../components/food/addToCartCard';

function AddToCartPage() {
  const [food, setFood] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [status, setStatus] = useState(false);
  const history = useHistory();
  const [orderLoading, setOrderLoading] = useState(false);

  useEffect(() => {
    let getToken = localStorage.getItem('accessToken');
    setToken(getToken);
    getAddToCartFood();
  }, []);

  const UpdateQuantity = (id, qty) => {
    setFood((prevFood) => {
      if (qty > 0) {
        for (let i = 0; i < prevFood.length; i++) {
          if (prevFood[i].id === id) {
            prevFood[i].quantity = qty;
            break;
          }
        }
        return prevFood;
      } else {
        let updatedFood = prevFood.filter((f) => f.id !== id);
        return updatedFood;
      }
    });
  };

  const preparedPayload = async () => {
    let foodData = [];
    if (food) {
      food.forEach((food) => {
        foodData.push(food.id);
      });
    }

    if (foodData.length > 0) {
      return foodData;
    }
  };

  const getAddToCartFood = async () => {
    setIsLoading(true);
    try {
      const addToCartRes = await axios.get(
        `${process.env.REACT_APP_API}/food/getAddToCartFood?shopId=2af3906a-7313-46a1-8f66-416e5cc0f78a`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (addToCartRes.status === 200) {
        setFood(addToCartRes?.data?.data);
        setIsLoading(false);
      }
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem('accessToken');
        history.push('/login');
      }
      setIsLoading(false);
    }
  };

  const handleOrder = async () => {
    setOrderLoading(true);
    const payload = await preparedPayload();
    if (token) {
      try {
        const addToCartRes = await axios.post(
          `${process.env.REACT_APP_API}/order/orderCreate`,
          {
            foodIds: payload,
            shopId: '2af3906a-7313-46a1-8f66-416e5cc0f78a',
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        console.log('addToCartRes: ', addToCartRes);
        if (addToCartRes.status === 200) {
          setOrderLoading(false);
          history.push({
            pathname: '/confirmOrderPage',
            state: {
              orderDetail: addToCartRes.data.data,
            },
          });
        }
      } catch (error) {
        console.log('error: ', { error });
        if (error.response.status === 403) {
          localStorage.removeItem('accessToken');
          history.push('/login');
        }
        setOrderLoading(false);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        <>
          <strong className="fs-3 mb-0" style={{ paddingLeft: '2px' }}>
            Cart
          </strong>
          {food && food.length > 0 ? (
            food.map((f) => {
              return <AddToCartCard food={f} UpdateQuantity={UpdateQuantity} />;
            })
          ) : (
            <Card>
              <CardBody>This is an Empty Cart</CardBody>
            </Card>
          )}
          <div className="d-flex">
            {orderLoading ? (
              <Button
                color="primary"
                style={{ flexBasis: '50%', marginLeft: '2px' }}
              >
                <Spinner size={15} />
              </Button>
            ) : (
              <Button
                color="primary"
                style={{ flexBasis: '50%', marginLeft: '2px' }}
                onClick={handleOrder}
                disabled={food?.length < 1}
              >
                Order Now
              </Button>
            )}
          </div>
        </>
      )}
    </>
  );
}

export default AddToCartPage;

{
  /* <Button
              color="primary"
              style={{ flexBasis: '50%', marginLeft: '2px' }}
              onClick={handleOrder}
            >
              Order Now
            </Button> */
}
