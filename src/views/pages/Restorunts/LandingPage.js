import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { CiHeart } from 'react-icons/ci';
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
import FoodCard from '../../components/food/foodCard';

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
      if (error.response.status === 403) {
        localStorage.removeItem('accessToken');
        history.push('/login');
      }
      setIsLoading(false);
    }
  };

  const toggleCategory = async (index, categoryName) => {
    setActive(index);
    try {
      setCategoryLoading(true);
      const categoryItemRes = await axios.get(
        `${process.env.REACT_APP_API}/food/getFoodByCategory?category=${categoryName}&shopId=2af3906a-7313-46a1-8f66-416e5cc0f78a`,
        { headers: { Authorization: `Bearer ${token}` } }, //TODO change Here
      );

      if (categoryItemRes.status === 200) {
        setCategoryLoading(false);
        setFood(categoryItemRes.data.data);
      }
    } catch (error) {
      if (error.response.status === 403) {
        localStorage.removeItem('accessToken');
        history.push('/login');
      }
      setCategoryLoading(false);
    }
  };

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
          return <FoodCard food={food} />;
        })
      )}
    </>
  );
}

export default LandingPage;
