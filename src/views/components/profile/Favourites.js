import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Card, CardBody } from 'reactstrap';
import BookmarkFoodCard from '../food/BookmarkFoodCard';
import axios from 'axios';
import { CiGlass } from 'react-icons/ci';

function Favourites() {
  const [token, setToken] = useState([]);
  const [shopId, setShopId] = useState([]);
  const [food, setFood] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem('accessToken'));
    console.log('Favourites called...');
    getBookMarkFood();
  }, []);

  const getBookMarkFood = async () => {
    setIsLoading(true);
    try {
      const bookmarkFood = await axios.get(
        `${
          process.env.REACT_APP_API
        }/food/bookmarkFood?shopId=${'2af3906a-7313-46a1-8f66-416e5cc0f78a'}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (bookmarkFood.status === 200) {
        setFood(bookmarkFood.data.data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  };

  const UnbookmarkFood = (id) => {
    console.log('UnbookmarkFood called....');
    setFood((prevFood) => {
      const updatedFood = prevFood.filter((f) => f.id !== id);
      return updatedFood;
    });
    // const tobeRemoveFood = food.find((f) => f.id === id);
    // const findIndex = food.indexOf(tobeRemoveFood);
    // console.log('findIndex: ', findIndex);
    // if (findIndex > -1) {
    //   food.splice(findIndex, 1);
    //   setFood(food);
    // }
  };
  return (
    <>
      {isLoading ? (
        <Skeleton />
      ) : (
        food.map((food) => {
          return (
            <BookmarkFoodCard food={food} UnbookmarkFood={UnbookmarkFood} />
          );
        })
      )}
    </>
  );
}

export default Favourites;
