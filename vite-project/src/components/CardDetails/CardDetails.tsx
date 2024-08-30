import React, { useEffect, useState } from "react";
import styles from "../../views/Home.module.css";
import stylesInfo from "./CardDetails.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "../Loading.tsx";
import { fetchCardDetails } from "../../services/apiService.ts";
import { CardDetailProps } from "../../types/types.ts";

const cardDetails: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const [details, setDetails] = useState<CardDetailProps>();
  const [loading, setLoading] = useState(true);
  const [isVisible, setVisible] = React.useState(false);

  useEffect(() => {
    setVisible(true);
    fetchCardDetails(id)
      .then((response) => {
        setDetails(response);
        setLoading(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error.errorMessage);
        setLoading(false);
        setDetails(undefined);
      });
  }, [location.pathname]);

  const handleSideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleBtnBack = () => {
    const page = searchParams.get("page") || "1";
    navigate("/home");
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };
  return (
    <div
      className={`${styles.sideDetails} ${isVisible && styles.open}`}
      onClick={handleSideMenu}
    >
      {loading ? (
        <Loading />
      ) : (
        <div className={stylesInfo.container}>
          <div className={stylesInfo.imageContainer}>
            <img
              src={`https://www.artic.edu/iiif/2/${details?.image_id}/full/450,/0/default.jpg`}
              alt="Art"
            />
          </div>
          <span>{details?.dimensions}</span>
          <h1>{details?.title}</h1>
          <p>
            {details?.artist_titles[0]}, {details?.date_display}
          </p>
          <p>{details?.place_of_origin}</p>
          <p>{details?.short_description || details?.description}</p>
          <p>
            Categories: {details?.category_titles.map((title) => title + ", ")}
          </p>

          <button className={stylesInfo.backBtn} onClick={handleBtnBack}>
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default cardDetails;
