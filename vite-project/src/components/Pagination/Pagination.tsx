import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import {
  decrementCurPage,
  incrementCurPage,
  setCurrentPage,
} from "../../state/Pagination/PaginationSlice.ts";
import styles from "./Pagination.module.css"
const Pagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { totalPages, currentPage } = useAppSelector(
    (state) => state.pagination,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    searchParams.set("page", currentPage.toString());
    setSearchParams(searchParams);
    console.log("useEff pagination");
  }, [currentPage, searchParams, setSearchParams]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(decrementCurPage());
    }
  };

  const handleNext = () => {
    if (currentPage <= totalPages) {
      dispatch(incrementCurPage());
    }
  };

  return (
    <div className={styles.pagination}>
      <button className={styles.pagBtn} onClick={handlePrevious}>Previous</button>
      <span className={styles.pagText}>
        Page {currentPage} of {totalPages}
      </span>
      <button className={styles.pagBtn} onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
