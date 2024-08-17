import React, { FC, useEffect, useState } from "react";
import SearchContainer from "../components/Search/SearchContainer";
import CardList from "../components/CardList/CardList";
import ErrorBoundary from "../services/ErrorBoundary";
import Pagination from "../components/Pagination/Pagination.tsx";
import { useSearchParams } from "react-router-dom";

const Home: FC = () => {
  const [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState(
    searchParams.get("search") || localStorage.getItem("searchText") || "",
  );


  useEffect(() => {
    setCurrentPage(initialPage);
  }, [initialPage]);

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
          style={{
            display: "flex ",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <CardList
            search={search}
            setSearch={setSearch}
            currentPage={currentPage}
            setTotalPages={setTotalPages}
          />
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
          />
        </div>
      </ErrorBoundary>
    </div>
  );
};

export default Home;
