import React, { FC } from "react";
import styles from "./Card.module.css";
import { CardProps } from "../../types/types";
import defaultImg from "../../assets/react.svg";
const Card: FC<CardProps> = (props: CardProps) => {
  return (
    <div className={styles.card}>
      <img src={props.image || defaultImg} alt="" />
      <h2>{props.title}</h2>
      <p>{props.date_display}</p>
      <p>{props.artist_display}</p>
    </div>
  );
};

export default Card;
