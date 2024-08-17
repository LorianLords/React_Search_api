import React from "react";
import styles from "./CardDetails.module.css";

type CardDetailsProps = {
  card: number;
};
const cardDetails = ({ card }: CardDetailsProps) => {
  return (
    <div className={styles.container}>
      <p>Details ${card}</p>
    </div>
  );
};

export default cardDetails;
