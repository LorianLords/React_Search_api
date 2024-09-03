import React, { FC, useEffect, useState } from "react";
import SearchContainer from "../components/Search/SearchContainer";
import CardList from "../components/CardList/CardList";
import ErrorBoundary from "../services/ErrorBoundary";
import Pagination from "../components/Pagination/Pagination.tsx";
import {
  Outlet,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styles from "./Home.module.css";
import { useAppDispatch, useAppSelector } from "../hooks/hooks.ts";
import {
  setCardId,
  toggleIsDetailsOpen,
} from "../state/DetailsCard/DetailsSlice.tsx";

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  //const location = useLocation();
  const dispatch = useAppDispatch();

  const { currentPage } = useAppSelector((state) => state.pagination);
  const { loading } = useAppSelector((state) => state.cards);
  const { isDetailsOpen, cardId } = useAppSelector((state) => state.details);

  useEffect(() => {
    /* if (location.pathname.includes("card")) {
      setDetailsOpen(true);
    } else {
      setDetailsOpen(false);
    }*/
    console.log("USE EFF");
    console.log(cardId);
    /*  if (cardId) {
      dispatch(toggleIsDetailsOpen(true));
    } else {
      dispatch(toggleIsDetailsOpen(false));
    }*/
  }, [cardId]);

  const handleSideMenu = () => {
    if (isDetailsOpen) {
      dispatch(toggleIsDetailsOpen(false));
      setTimeout(() => {
        navigate("/home");
        searchParams.set("page", currentPage.toString());
        setSearchParams(searchParams);
        dispatch(setCardId(""));
      }, 1000);
    }
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
          {!loading && <Pagination />}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
