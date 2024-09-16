import React from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";
import Loading from "../Loading.tsx";

import { useAppSelector, useAppDispatch } from "../../hooks/hooks.ts";

import { CardProps } from "../../types/types.ts";
import { useGetCardListQuery } from "../../state/Api/ApiSlice.ts";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

import { setTotalPages } from "../../state/Pagination/PaginationSlice.ts";

const CardList = () => {
  const dispatch = useAppDispatch();

  const { searchText } = useAppSelector((state) => state.search);
  const { currentPage } = useAppSelector((state) => state.pagination);
  const { isLoading, error, isFetching, data } = useGetCardListQuery({
    searchText,
    currentPage,
  });
  const cardList = data?.cards;
 

  const errorHandle = () => {
    console.log("Error button clicked");
    //dispatch(setError("I crashed!"));
    throw new Error("I crashed!");
  };

  if (error) {
    let errorMessage = "Unknown error occurred";
    if ("status" in error) {
      // Это FetchBaseQueryError (ошибка от запроса)
      const fetchError = error as FetchBaseQueryError;
      errorMessage = `Error ${fetchError.status}: ${fetchError?.data || "Unknown error"}`;
    } else if ("message" in error) {
      // Это SerializedError (общая ошибка)
      const serializedError = error as SerializedError;
      errorMessage = serializedError.message || "Unknown serialized error";
    }

    throw new Error(errorMessage);
  }
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
