import React, { FC, useCallback, useState } from "react";
import styles from "./Card.module.css";
import { CardProps } from "../../types/types";
import defaultImg from "../../assets/react.svg";
import placeholder from "../../assets/placeholder.jpg";

const Card: FC<CardProps> = (props: CardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    setIsLoaded(false);
  };
  return (
    <div className={styles.card}>
      {!isLoaded && (
        <img
          src={placeholder}
          alt="placeholder"
        />
      )}
      <img
        src={props.image || defaultImg}
        alt="picture"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: isLoaded ? "block" : "none" }}
      />
      <h2>{props.title}</h2>
      <p>{props.date_display}</p>
      <p>{props.artist_display}</p>
    </div>
  );
};

export default Card;
