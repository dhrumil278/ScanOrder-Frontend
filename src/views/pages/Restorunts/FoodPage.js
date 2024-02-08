// ** React Imports
import { Fragment, useEffect, useState } from 'react';

// ** Hooks
import { useRTL } from '@hooks/useRTL';
import { FaRupeeSign } from 'react-icons/fa';

// ** Third Party Components
import SwiperCore, {
  Grid,
  Lazy,
  Virtual,
  Autoplay,
  Navigation,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
} from 'swiper';

// ** Third Party Components
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';

// ** Reactstrap Imports
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Badge,
  Button,
  ButtonGroup,
} from 'reactstrap';

// ** Images
import veg from '@src/assets/images/veg/icons8-veg-48.png';
import nonVeg from '@src/assets/images/veg/non-vegetarian-food-symbol-48.png';

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap';

// ** Styles
import '@styles/react/libs/swiper/swiper.scss';
import Rating from 'react-rating';
import { Star } from 'react-feather';
import { useLocation } from 'react-router-dom/cjs/react-router-dom';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton';
import { GoHeart, GoHeartFill } from 'react-icons/go';

// ** Init Swiper Functions
SwiperCore.use([
  Navigation,
  Grid,
  Pagination,
  EffectFade,
  EffectCube,
  EffectCoverflow,
  Autoplay,
  Lazy,
  Virtual,
]);

const Slider = () => {
  // ** Hooks

  const location = useLocation();
  const [isRtl] = useRTL();
  const [token, setToken] = useState(null);
  const [food, setFood] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [getFoodLoader, setGetFoodLoader] = useState(false);
  const [isFavorites, setIsFavorites] = useState(false);

  const foodId = location.state.foodId;
  const shopId = location.state.shopId;

  useEffect(() => {
    let getToken = localStorage.getItem('accessToken');
    if (!getToken) {
      history.push('/login');
    }

    setToken(getToken);
    getFood();
  }, []);

  const handleFavorites = async (id) => {
    if (token) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/food/bookmark?foodId=${id}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res.status === 200) {
          setIsFavorites(!isFavorites);
        }
      } catch (error) {
        if (error.response.status === 403) {
          localStorage.removeItem('accessToken');
          history.push('/login');
        }
        setIsFavorites(isFavorites);
      }
    }
  };

  const getFood = async () => {
    setGetFoodLoader(true);
    if (token) {
      try {
        const getFood = await axios.get(
          `${process.env.REACT_APP_API}/food/getOneFood/${foodId}/${shopId}`,
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (getFood.status === 200) {
          setFood(getFood?.data?.data);
          setQuantity(getFood?.data?.data?.quantity);
          setIsFavorites(getFood?.data?.data?.isbookmark);
          setGetFoodLoader(false);
        }
      } catch (error) {
        if (error.response.status === 403) {
          localStorage.removeItem('accessToken');
          history.push('/login');
        }
        setGetFoodLoader(false);
      }
    }
  };
  const handleOrder = async () => {};

  const handleAddToCart = async (id, qty) => {
    if (token) {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API}/food/addFoodInCart`,
          {
            foodId: id,
            shopId: '2af3906a-7313-46a1-8f66-416e5cc0f78a',
            quantity: qty,
          },
          { headers: { Authorization: `Bearer ${token}` } },
        );

        if (res.status === 200) {
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
    }
  };

  const handleIncreaseQuantity = () => {
    setQuantity((q) => q + 1);
    handleAddToCart(food.id, quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    setQuantity((q) => q - 1);
    handleAddToCart(food.id, quantity - 1);
  };

  const a =
    'https://res.cloudinary.com/divpwvus4/image/upload/v1704369907/d5vbp7ksbfk1j7ltjfuk.jpg';
  return (
    <Fragment>
      {getFoodLoader ? (
        <Skeleton />
      ) : (
        <Row>
          <Col sm="12">
            <Card>
              <CardBody>
                <Swiper dir={isRtl ? 'rtl' : 'ltr'}>
                  {food?.image?.map((images, index) => {
                    return (
                      <SwiperSlide>
                        <img
                          className="img-fluid"
                          style={{
                            background: `url(${images}) no-repeat center center/cover`,
                            width: '100%',
                            minHeight: '250px',
                          }}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
                <div
                  className="d-flex justify-content-between align-items-center"
                  style={{ marginTop: '5px' }}
                >
                  <Badge color="primary" className="align-self-end">
                    {food?.category}
                  </Badge>
                  <span>
                    {isFavorites || food?.isbookmark ? (
                      <GoHeartFill
                        size={20}
                        color="#7367f0"
                        onClick={() => handleFavorites(food?.id)}
                      />
                    ) : (
                      <GoHeart
                        size={20}
                        color="#000"
                        onClick={() => handleFavorites(food?.id)}
                      />
                    )}
                  </span>
                </div>
                <CardTitle
                  className="mb-0"
                  style={{ marginTop: '3px', marginBottom: '5px' }}
                >
                  {food?.title}
                  <span>
                    <img
                      src={food?.isVeg ? veg : nonVeg}
                      alt="veg or non-veg icon"
                      width={15}
                      height={15}
                    />
                  </span>
                </CardTitle>
                <div className="">
                  <Rating
                    fractions={2}
                    direction="ltr"
                    initialRating={3.7}
                    emptySymbol={
                      <Star size={12} fill="#babfc7" stroke="#babfc7" />
                    }
                    fullSymbol={
                      <Star size={12} fill="#FFB534" stroke="#FFB534" />
                    }
                  />
                  <span
                    className="align-self-end"
                    style={{ fontSize: '10px', paddingLeft: '5px' }}
                  >
                    3.7
                  </span>
                </div>
                <h5 className="" style={{ marginTop: '5px' }}>
                  Price : <FaRupeeSign size={15} />
                  {food?.price}
                </h5>
                <p
                  // className=""
                  style={{
                    fontSize: '12px',
                    lineHeight: '17px',
                    textAlign: 'justify',
                    marginTop: '5px',
                  }}
                >
                  <strong>Description:</strong> {food?.description}
                </p>
                <div className="d-flex">
                  {/* <Button
                    outline
                    style={{ flexBasis: '50%', marginRight: '2px' }}
                  >
                    Add to cart
                  </Button> */}
                  {quantity > 0 ? (
                    <ButtonGroup
                      className=""
                      style={{
                        flexBasis: '50%',
                        marginRight: '5px',
                      }}
                    >
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
                      color="secondary"
                      style={{
                        flexBasis: '50%',
                        marginRight: '5px',
                      }}
                      onClick={handleIncreaseQuantity}
                      outline
                    >
                      Add to cart
                    </Button>
                  )}
                  <Button
                    color="primary"
                    style={{ flexBasis: '50%', marginLeft: '2px' }}
                    onClick={handleOrder}
                  >
                    Order Now
                  </Button>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
    </Fragment>
  );
};

export default Slider;
