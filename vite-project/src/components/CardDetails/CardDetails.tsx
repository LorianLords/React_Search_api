import React, { useEffect } from "react";
import styles from "../../views/Home.module.css";
import { useParams } from "react-router-dom";

const cardDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const card = id;
  const [isVisible, setVisible] = React.useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`${styles.sideDetails} ${isVisible && styles.open}`}>
      <p>Details ${card}</p>
    </div>
  );
};

export default cardDetails;
