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
import { Star } from 'react-feather';

// ** Images
import veg from '@src/assets/images/veg/icons8-veg-48.png';
import nonVeg from '@src/assets/images/veg/non-vegetarian-food-symbol-48.png';

function BookmarkFoodCard({ food, UnbookmarkFood }) {
  const history = useHistory();
  const [isFavorites, setIsFavorites] = useState(true);
  const [token, setToken] = useState([]);

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
  }, []);

  const handleFavorites = async (id) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/food/bookmark?foodId=${id}`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (res.status === 200) {
        setIsFavorites(false);
        UnbookmarkFood(food.id);
      }
    } catch (error) {
      setIsFavorites(true);
      console.log('error: ', error);
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
              {isFavorites || food.isbookmark ? (
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
              )}
            </div>
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
}

export default BookmarkFoodCard;
