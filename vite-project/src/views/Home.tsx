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

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [isDetailsOpen, setDetailsOpen] = useState(false);

  const { currentPage } = useAppSelector((state) => state.pagination);
  const { loading } = useAppSelector((state) => state.cards);

  const [search, setSearch] = useState(
    searchParams.get("search") || localStorage.getItem("searchText") || "",
  );

  useEffect(() => {
    if (location.pathname.includes("card")) {
      setDetailsOpen(true);
    } else {
      setDetailsOpen(false);
    }
  }, [ location ]);

  const handleSideMenu = () => {
    if (isDetailsOpen) {
      navigate("/home");
    }
    searchParams.set("page", currentPage.toString());
    setSearchParams(searchParams);
  };

  return (
    <div>
      <SearchContainer
        search={search}
        setSearch={setSearch}
      //  setCurrentPage={setCurrentPage}
      />
      <hr />
      <ErrorBoundary>
        <div
          id={"content-container"}
          className={`${styles.content} ${isDetailsOpen && styles.contentOpen}`}
          onClick={handleSideMenu}
        >
          <CardList
            search={search}
            setSearch={setSearch}
            currentPage={currentPage}
          />
          <Outlet />
          {!loading && (
            <Pagination/>
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
