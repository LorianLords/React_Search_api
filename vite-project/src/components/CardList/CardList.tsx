import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import Loading from "../Loading.tsx";
import {
  fetchCardList,
  setError,
  setLoading,
} from "../../state/CardList/CardsSlice.ts";
import { useAppSelector, useAppDispatch } from "../../hooks/hooks.ts";

import { CardProps } from "../../types/types.ts";
import { useGetCardListQuery } from "../../state/Api/ApiSlice.ts";

const CardList = () => {
  const dispatch = useAppDispatch();
  const { cardList, loading, error } = useAppSelector((state) => state.cards);
  const { searchText } = useAppSelector((state) => state.search);
  const { currentPage } = useAppSelector((state) => state.pagination);
  const { data, isLoading } = useGetCardListQuery();
  if (!isLoading){
    console.log(data);
  }
  useEffect(() => {
    // Создаем экземпляр AbortController
    const controller = new AbortController();
    const signal = controller.signal;

    console.log("Компонента смонтирована"); // Действие при монтировании компоненты

    dispatch(setLoading(true));
    dispatch(fetchCardList({ searchText, currentPage }));

    return () => {
      console.log("Компонента размонтирована");
      controller.abort(); // Отменяем запрос
    };
  }, [searchText, currentPage]);

  const errorHandle = () => {
    console.log("Error button clicked");
    dispatch(setError("I crashed!"));
  };

  if (error) throw new Error(error);
  if (loading) return <Loading />;

  setTimeout(() => {
    if (cardList.length === 0) {
      return (
        <div className="about">
          <h3>Sorry. There are no such pictures </h3>
        </div>
      );
    }
  }, 10000);

  return (
    <div className={styles.cardList}>
      <button className={styles.errButton} onClick={errorHandle}>
        Error button
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
