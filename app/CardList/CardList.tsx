'use client';
import React, { useState } from 'react';
import Card from './Card/Card';
import styles from './CarList.module.css';
//import Loading.tsx from '../Loading.tsx.tsx';
import { useAppSelector, useAppDispatch } from '@/services/hooks';
import { CardProps } from '@/types/types';
import { useGetCardListQuery } from '@/redux/Api/apiSlice';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import Loading from '@/components/Loading';

const CardList = () => {
  const [handErr, setHandErr] = useState(false);
  const { searchText } = useAppSelector((state) => state.search);
  const { currentPage } = useAppSelector((state) => state.pagination);
  const { isLoading, error, isFetching, data } = useGetCardListQuery({
    searchText,
    currentPage,
  });
  const cardList = data?.cards;

  const errorHandle = () => {
    console.log('Error button clicked');
    setHandErr(true);
  };

  if (error) {
    let errorMessage = 'Unknown error occurred';
    if ('status' in error) {
      // Это FetchBaseQueryError (ошибка от запроса)
      const fetchError = error as FetchBaseQueryError;
      errorMessage = `Error ${fetchError.status}: ${fetchError?.data || 'Unknown error'}`;
    } else if ('message' in error) {
      // Это SerializedError (общая ошибка)
      const serializedError = error as SerializedError;
      errorMessage = serializedError.message || 'Unknown serialized error';
    }

    throw new Error(errorMessage);
  }
  if (handErr) throw new Error('I crashed!');
  if (isLoading || isFetching) return <Loading />;

  if (!cardList || cardList.length === 0) {
    return (
      <div className="about">
        <h3>Sorry. There are no such pictures </h3>
      </div>
    );
  }

  return (
    <div className={styles.cardList}>
      <button className={styles.errButton} onClick={errorHandle}>
        Error
      </button>
      {cardList.map((item: CardProps) => (
        <Card
          key={item.id}
          id={item.id}
          title={item.title}
          date_display={item.date_display}
          artist_display={item.artist_display}
          image={item.image}
          image_id={item.image_id}
        />
      ))}
    </div>
  );
};

export default CardList;
