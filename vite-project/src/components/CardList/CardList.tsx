import React, {useEffect, useRef, useState} from "react";
import Card from "../Card/Card";
import styles from "./CardList.module.css";

import { CardProps } from "../../types/types";
import { fetchData } from "../../services/apiService";

/*
const items: CardProps[] = [
  /!*{ cardName: "Pepe", description: "you know what it is", img: cardImage },
  { cardName: "Lanfan", description: "you know what it is", img: cardImage },
  { cardName: "Peter", description: "you know what it is", img: cardImage },
  { cardName: "Goshua", description: "you know what it is", img: cardImage },
  { cardName: "Goshua", description: "you know what it is", img: cardImage },*!/
];
*/
interface CardListProps {
  search: string | null;
  setSearch: React.Dispatch<React.SetStateAction<string | null>>;
}
const CardList = ({search, setSearch}: CardListProps) => {

  const [data, setData] = useState<CardProps[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)


useEffect(() => {

  // Создаем экземпляр AbortController
  const controller = new AbortController();
  const signal = controller.signal;

  // Действие при монтировании компоненты
  console.log('Компонента смонтирована');

  fetchData(search).then((response) => {
    setData(response);
    setLoading(false);
  }).catch((error) => {
    setError(error.message);
    setLoading(false);
    setData([]);
  });


  return () => {
    console.log('Компонента размонтирована');
    controller.abort(); // Отменяем запрос
  };
}, [search])

  const errorHandle = () => {
    console.log("Error button clicked");
    setError("error");
  };


   if (error){
     throw new Error("I crashed!");
   }
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className={styles.cardList}>
        <div>
          <button onClick={errorHandle}>Error button</button>
        </div>

        {data.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            date_display={item.date_display}
            artist_display={item.artist_display}
            image={item.image}
          />
        ))}
      </div>
    );

}

export default CardList;
