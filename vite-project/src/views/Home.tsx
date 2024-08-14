import React, { FC, useState } from "react";
import SearchContainer from "../components/Search/SearchContainer";
import CardList from "../components/CardList/CardList";
import ErrorBoundary from "../services/ErrorBoundary";
import Pagination from "../components/Pagination/Pagination.tsx";

const Home: FC = () => {
  const [search, setSearch] = useState(
    localStorage.getItem("searchText") || "",
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  return (
    <div>
      <SearchContainer search={search} setSearch={setSearch} />
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
