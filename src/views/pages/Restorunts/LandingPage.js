import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from 'reactstrap';
import { FaRupeeSign } from 'react-icons/fa';
import Rating from 'react-rating';
import { Star } from 'react-feather';

function LandingPage() {
  const history = useHistory();
  const [active, setActive] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [token, setToken] = useState(null);
  const [category, setCategory] = useState([]);
  const [food, setFood] = useState([]);

  useEffect(() => {
    let getToken = localStorage.getItem('accessToken');
    if (!getToken) {
      history.push('/login');
    }

    setToken(getToken);
    getAllCategory();
    // toggleCategory();
  }, []);

  const getAllCategory = async () => {
    setIsLoading(true);
    try {
      const categoryRes = await axios.post(
        `${process.env.REACT_APP_API}/food/getAllCategory`,
        { shopId: '2af3906a-7313-46a1-8f66-416e5cc0f78a' },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (categoryRes.status === 200) {
        setCategory(categoryRes.data.data);
        setIsLoading(false);
        toggleCategory('0', categoryRes.data.data[0].category);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const toggleCategory = async (index, categoryName) => {
    setActive(index);
    try {
      setCategoryLoading(true);
      const categoryItemRes = await axios.get(
        `${process.env.REACT_APP_API}/food/getFoodByCategory?category=${categoryName}&shopId=2af3906a-7313-46a1-8f66-416e5cc0f78a`,
      );

      if (categoryItemRes.status === 200) {
        setCategoryLoading(false);
        setFood(categoryItemRes.data.data);
      }
    } catch (error) {
      console.log('error: ', error);
      setCategoryLoading(false);
    }
  };
  const handlemain = (e, id, shopId) => {
    e.preventDefault();
    history.push({
      pathname: '/foodPage',
      state: { foodId: id, shopId: shopId },
    });
  };
  const handleAddToCart = (e, id) => {};
  return (
    <>
      <div
        className="d-flex w-100 overflow-scroll"
        style={{ paddingBottom: '7px' }}
      >
        {isLoading ? (
          <Skeleton />
        ) : (
          category.map((cat, index) => {
            return (
              <Button
                style={{ marginRight: '4px', padding: '5px 15px' }}
                color="primary"
                outline={active !== index.toString()}
                onClick={() => toggleCategory(index.toString(), cat.category)}
              >
                {cat.category}
              </Button>
            );
          })
        )}
      </div>
      {categoryLoading ? (
        <Skeleton />
      ) : (
        food.map((food, index) => {
          return (
            <Card className="card-snippet mt-2" key={index}>
              <Row className="p-1">
                <Col xs="4">
                  <div
                    style={{
                      background: `url(${food.image[0]}) no-repeat center center/cover`,
                      borderRadius: '5px',
                      width: '100px',
                      height: '100px',
                    }}
                    onClick={(e) => handlemain(e, food.id, food.shopId)}
                  ></div>
                </Col>
                <Col xs="8" className="px-0 d-flex flex-column">
                  <CardHeader className="p-0 px-1">
                    <CardTitle
                      tag="h5"
                      className=""
                      onClick={(e) => handlemain(e, food.id, food.shopId)}
                    >
                      {food.title}
                    </CardTitle>
                  </CardHeader>
                  <CardBody className="p-0 px-1 d-flex flex-column">
                    <p
                      className="mb-0 text-truncate"
                      style={{ fontSize: '10px' }}
                    >
                      {food.description}
                    </p>
                    <p
                      className="mb-0"
                      style={{ fontSize: '13px', fontWeight: '800' }}
                    >
                      <span style={{ paddingTop: '4px' }}>
                        <FaRupeeSign size={12} />
                      </span>
                      : {food.price}
                    </p>
                    <Rating
                      fractions={2}
                      direction="ltr"
                      initialRating={3}
                      emptySymbol={
                        <Star size={12} fill="#babfc7" stroke="#babfc7" />
                      }
                      fullSymbol={
                        <Star size={12} fill="#FFB534" stroke="#FFB534" />
                      }
                    />
                    <Button
                      color="primary"
                      className="mt-1"
                      style={{
                        padding: '7px 11px',
                        fontSize: '1rem',
                        marginLeft: 'auto',
                      }}
                      onClick={(e) => handleAddToCart(e, food.id)}
                    >
                      Add to cart
                    </Button>
                    {/* <ButtonGroup className="mt-1" style={{ marginLeft: 'auto' }}>
                <Button style={{ padding: '7px 11px' }} outline>
                  -
                </Button>
                <Button style={{ padding: '7px 11px' }} outline>
                  1
                </Button>
                <Button style={{ padding: '7px 11px' }} outline>
                  +
                </Button>
              </ButtonGroup> */}
                  </CardBody>
                </Col>
              </Row>
            </Card>
          );
        })
      )}
    </>
  );
}

export default LandingPage;
