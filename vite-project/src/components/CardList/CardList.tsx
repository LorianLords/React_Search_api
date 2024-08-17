import React, { useEffect, useRef, useState } from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";

import { CardProps } from "../../types/types";
import { fetchData } from "../../services/apiService";

interface CardListProps {
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  currentPage: number;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}
const CardList = ({
  search,
  currentPage,
  setTotalPages,
  setIsLoading,
  isLoading,
}: CardListProps) => {
  const [data, setData] = useState<CardProps[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Создаем экземпляр AbortController
    const controller = new AbortController();
    const signal = controller.signal;
    setIsLoading(true);
    // Действие при монтировании компоненты
    console.log("Компонента смонтирована");

    fetchData(search, currentPage, setTotalPages)
      .then((response) => {
        setData(response);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
        setData([]);
      });

    return () => {
      console.log("Компонента размонтирована");
      controller.abort(); // Отменяем запрос
    };
  }, [search, currentPage]);

  const errorHandle = () => {
    console.log("Error button clicked");
    setError("error");
  };

  if (error) {
    throw new Error("I crashed!");
  }
  if (isLoading) {
    return (
      <div
        style={{
          display: "flex ",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "150px",
        }}
      >
        Loading...
      </div>
    );
  }

  setTimeout(() => {
    if (data.length === 0) {
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
      {data.map((item) => (
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
