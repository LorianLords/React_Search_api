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

const Home: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDetailsOpen, setDetailsOpen] = useState(false);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const [isLoading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState(
    searchParams.get("search") || localStorage.getItem("searchText") || "",
  );

  useEffect(() => {
    //setCurrentPage(initialPage);
    if (location.pathname.includes("card")) {
      setDetailsOpen(true);
    } else {
      setDetailsOpen(false);
    }
  }, [initialPage, location ]);

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
        setCurrentPage={setCurrentPage}
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
            setTotalPages={setTotalPages}
            setIsLoading={setLoading}
            isLoading={isLoading}
          />
          <Outlet />
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
