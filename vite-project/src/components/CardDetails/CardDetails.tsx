import React, { useEffect, useState } from "react";
import styles from "../../views/Home.module.css";
import stylesInfo from "./CardDetails.module.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Loading from "../Loading.tsx";
import {
  fetchDetails,
  setCardId, toggleIsDetailsOpen,
} from "../../state/DetailsCard/DetailsSlice.tsx";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { decrementCurPage } from "../../state/Pagination/PaginationSlice.ts";

const cardDetails: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { cardId, detInfo, detLoading, error, isVisible, isDetailsOpen } =
    useAppSelector((state) => state.details);
  const { currentPage } = useAppSelector((state) => state.pagination);

  //const { id } = useParams<{ id: string }>();
  //const [details, setDetails] = useState<CardDetailProps>();
  //const [loading, setLoading] = useState(true);
  //const [isVisible, setVisible] = React.useState(false);

  useEffect(() => {
    if (cardId) {
      dispatch(fetchDetails(cardId));
    }
  }, [cardId]);

  const handleSideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleBtnBack = () => {
    const page = currentPage.toString();
    dispatch(setCardId(""));
    dispatch(toggleIsDetailsOpen(false))
    setTimeout(() => {
      navigate("/home");
      searchParams.set("page", page);
      setSearchParams(searchParams);
    }, 800);
  };
  return (
    <div
      className={`${stylesInfo.sideDetails} ${isDetailsOpen && stylesInfo.open}`}
      onClick={handleSideMenu}
    >
      {detLoading ? (
        <Loading />
      ) : (
        <div className={stylesInfo.container}>
          <div className={stylesInfo.imageContainer}>
            <img
              src={`https://www.artic.edu/iiif/2/${detInfo?.image_id}/full/450,/0/default.jpg`}
              alt="Art"
            />
          </div>
          <span>{detInfo?.dimensions}</span>
          <h1>{detInfo?.title}</h1>
          <p>
            {detInfo?.artist_titles[0]}, {detInfo?.date_display}
          </p>
          <p>{detInfo?.place_of_origin}</p>
          <p>{detInfo?.short_description || detInfo?.description}</p>
          <p>
            Categories: {detInfo?.category_titles.map((title) => title + ", ")}
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
