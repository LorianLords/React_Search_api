import React, { FC, useCallback, useState } from "react";
import styles from "./Card.module.css";
import { CardProps } from "../../types/types";
import defaultImg from "../../assets/react.svg";
import placeholder from "../../assets/placeholder.jpg";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import {
  setCardId,
  setIsBlocked,
  toggleIsDetailsOpen,
} from "../../state/DetailsCard/DetailsSlice.tsx";

const Card: FC<CardProps> = (props: CardProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const { isBlocked } = useAppSelector((state) => state.details);
  const dispatch = useAppDispatch();

  const handleCardDetails = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isBlocked) {
      e.preventDefault();
    }
    dispatch(setIsBlocked(true));

    navigate(`./card/${props.id}`);
    searchParams.set("page", page?.toString() || "1");
    setSearchParams(searchParams);
    dispatch(setCardId(props.id));
    setTimeout(() => {
      dispatch(toggleIsDetailsOpen(true));
      dispatch(setIsBlocked(false));
    }, 100);
    e.stopPropagation();
  };

  return (
    <div className={styles.card} onClick={handleCardDetails}>
      {!isLoaded && <img src={placeholder} alt="placeholder" />}
      <img
        src={props.image || defaultImg}
        alt="picture"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsLoaded(false)}
        style={{ display: isLoaded ? "block" : "none" }}
      />
      <h2>{props.title}</h2>
      <p>{props.date_display}</p>
      <p>{props.artist_display}</p>
    </div>
  );
};

export default Card;
