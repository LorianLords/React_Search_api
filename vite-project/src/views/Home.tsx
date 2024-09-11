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

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const page = searchParams.get("page");
  const { currentPage } = useAppSelector((state) => state.pagination);
  const { isDetailsOpen, isBlocked, cardId } = useAppSelector(
    (state) => state.details,
  );
  const { searchText } = useAppSelector((state) => state.search);
  const { isLoading, isFetching } = useGetCardListQuery({
    searchText,
    currentPage,
  });

  useEffect(() => {
    console.log("useEff", isDetailsOpen)
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

  const handleSideMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isBlocked) {
      e.preventDefault();
    }
    dispatch(toggleIsDetailsOpen(false));
   /* if (isDetailsOpen) {
      console.log("Home yes")
      dispatch(toggleIsDetailsOpen(false));
      console.log(isDetailsOpen);*/
      /*      setTimeout(() => {
        navigate("/home");
        searchParams.set("page", currentPage.toString());
        setSearchParams(searchParams);
        dispatch(setCardId(""));
      }, 800);*/
 //   }
  };

  return (
    <div>
      <SearchContainer />
      <hr />
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
      </ErrorBoundary>
    </div>
  );
};

export default Home;
