import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { GoHeart } from 'react-icons/go';
import { GoHeartFill } from 'react-icons/go';
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
import { CloudLightning, Star } from 'react-feather';

// ** Images
import veg from '@src/assets/images/veg/icons8-veg-48.png';
import nonVeg from '@src/assets/images/veg/non-vegetarian-food-symbol-48.png';

function AddToCartCard({ food, UpdateQuantity }) {
  const history = useHistory();
  const [isFavorites, setIsFavorites] = useState(false);
  const [token, setToken] = useState([]);

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    // Set initial quantity once food prop is available
    if (food) {
      setQuantity(food.quantity);
    }
  }, [food]);

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

  const handleAddToCart = async (id, qty) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/food/addFoodInCart`,
        {
          foodId: id,
          shopId: '2af3906a-7313-46a1-8f66-416e5cc0f78a',
          quantity: qty,
        },
      );

      if (res.status === 200) {
        UpdateQuantity(id, qty);
        if (qty === 0) {
          // setAddToCart(false);
        } else {
          // setAddToCart(true);
        }
      }
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem('accessToken');
        history.push('/login');
      }
    }
  };

  // const handleFavorites = async (id) => {
  //   try {
  //     const res = await axios.post(
  //       `${process.env.REACT_APP_API}/food/bookmark?foodId=${id}`,
  //       { headers: { Authorization: `Bearer ${token}` } },
  //     );

  //     if (res.status === 200) {
  //       setIsFavorites(!isFavorites);
  //     }
  //   } catch (error) {
  //     if (error.response.status === 403) {
  //       localStorage.removeItem('accessToken');
  //       history.push('/login');
  //     }
  //     setIsFavorites(false);
  //   }
  // };

  const handlemain = (e, id, shopId) => {
    e.preventDefault();
    history.push({
      pathname: '/foodPage',
      state: { foodId: id, shopId: shopId },
    });
  };

  const handleIncreaseQuantity = () => {
    setQuantity((q) => q + 1);
    handleAddToCart(food.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((q) => q - 1);
    handleAddToCart(food.id, quantity - 1);
  };
  return (
    <Card className="card-snippet mt-2">
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
          <CardHeader className="p-0 px-1 d-flex justify-content-start">
            <CardTitle
              tag="h5"
              className="text-truncate"
              onClick={(e) => handlemain(e, food.id, food.shopId)}
            >
              {food.title}
            </CardTitle>
          </CardHeader>
          <CardBody className="p-0 px-1 d-flex flex-column">
            <p className="mb-0 text-truncate" style={{ fontSize: '10px' }}>
              {food.description}
            </p>
            <p className="mb-0" style={{ fontSize: '13px', fontWeight: '800' }}>
              <span style={{ paddingTop: '4px' }}>
                <FaRupeeSign size={12} />
              </span>
              : {food.price}
            </p>
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img
                  src={food?.isVeg ? veg : nonVeg}
                  alt="veg or non-veg icon"
                  width={12}
                  height={12}
                  style={{ marginRight: '5px' }}
                />
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
              </div>
              {/* {isFavorites || food.isbookmark ? (
                <GoHeartFill
                  size={15}
                  color="#7367f0"
                  onClick={() => handleFavorites(food.id)}
                />
              ) : (
                <GoHeart
                  size={15}
                  color="#000"
                  onClick={() => handleFavorites(food.id)}
                />
              )} */}
            </div>
            {quantity > 0 ? (
              <ButtonGroup className="mt-1" style={{ marginLeft: 'auto' }}>
                <Button
                  style={{ padding: '7px 11px' }}
                  outline
                  onClick={handleDecreaseQuantity}
                >
                  -
                </Button>
                <Button style={{ padding: '7px 11px' }} outline>
                  {quantity}
                </Button>
                <Button
                  style={{ padding: '7px 11px' }}
                  outline
                  onClick={handleIncreaseQuantity}
                >
                  +
                </Button>
              </ButtonGroup>
            ) : (
              <Button
                color="primary"
                className="mt-1"
                style={{
                  padding: '7px 11px',
                  fontSize: '1rem',
                  marginLeft: 'auto',
                }}
                onClick={handleIncreaseQuantity}
              >
                Add to cart
              </Button>
            )}
          </CardBody>
        </Col>
      </Row>
    </Card>
  );
}

export default AddToCartCard;
