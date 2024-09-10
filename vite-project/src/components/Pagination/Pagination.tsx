import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import {
  decrementCurPage,
  incrementCurPage,
  setCurrentPage,
} from "../../state/Pagination/PaginationSlice.ts";

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
    <div>
      <button onClick={handlePrevious}>Previous</button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Pagination;
