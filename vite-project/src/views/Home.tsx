import React, { FC, useEffect, useState } from "react";
import SearchContainer from "../components/Search/SearchContainer";
import CardList from "../components/CardList/CardList";
import ErrorBoundary from "../services/ErrorBoundary";
import Pagination from "../components/Pagination/Pagination.tsx";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Home.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";
import {
  setCardId,
  setIsBlocked,
  toggleIsDetailsOpen,
} from "../state/DetailsCard/DetailsSlice.tsx";
import { useGetCardListQuery } from "../state/Api/ApiSlice.ts";
import FooterPopup from "../components/FooterPopup/FooterPopup.tsx";
import SuccessDownloading from "../components/SuccessDownloading/SuccessDownloading.tsx";
import { setIsSuccess } from "../state/CardList/CardsSlice.ts";

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isSuccess } = useAppSelector((state) => state.cardList);
  const { searchText } = useAppSelector((state) => state.search);
  const { currentPage } = useAppSelector((state) => state.pagination);
  const { isDetailsOpen, isBlocked, cardId } = useAppSelector(
    (state) => state.details,
  );
  const { isLoading, isFetching } = useGetCardListQuery({
    searchText,
    currentPage,
  });

  useEffect(() => {
    console.log("useEff", isDetailsOpen);
    if (!isDetailsOpen) {
      dispatch(setIsBlocked(true));
      setTimeout(() => {
        navigate("/home");
        searchParams.set("page", currentPage.toString());
        setSearchParams(searchParams);
        dispatch(setCardId(""));
        dispatch(setIsBlocked(false));
      }, 800);
    }
  }, [isDetailsOpen]);

  useEffect(() => {     // for isSuccess panel for automatic closing
    if (isSuccess) {
      setTimeout(() => {
        dispatch(setIsSuccess(false));
      }, 3200);
    }
  }, [isSuccess]);

  const handleSideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isBlocked) {
      e.preventDefault();
    }
    dispatch(toggleIsDetailsOpen(false));
  };

  return (
    <div>
      <SearchContainer />

      <ErrorBoundary>
        <div
          id={"content-container"}
          className={`${styles.content} ${isDetailsOpen && styles.contentOpen}`}
          onClick={handleSideMenu}
        >
          <CardList />
          <Outlet />
          {!(isLoading || isFetching) && <Pagination />}
        </div>
        <FooterPopup />
        {isSuccess && <SuccessDownloading />}
      </ErrorBoundary>
    </div>
  );
};

export default Home;
