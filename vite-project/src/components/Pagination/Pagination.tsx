import React from "react";

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  setCurrentPage,
}: PaginationProps) => {
  const handlePrevious = () => {
    setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
  };

  const handleNext = () => {
    setCurrentPage(currentPage <= totalPages ? currentPage + 1 : currentPage);
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
