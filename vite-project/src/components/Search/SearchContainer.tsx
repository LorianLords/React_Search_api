import React, { FC, useState } from "react";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks.ts";
import { setCurrentPage } from "../../state/Pagination/PaginationSlice.ts";
import { setSearch } from "../../state/Search/SearchSlice.ts";

/*interface SearchContainerProps {
  //onSearch: (searchItem: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}*/

const SearchContainer = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputText, setInput] = useState(searchText);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputText.trim() === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", inputText);
    }
    setSearchParams(searchParams);

    dispatch(setCurrentPage(1));
    dispatch(setSearch(inputText.trim()));
    //localStorage.setItem("searchText", inputText.trim());
  };

  return (
    <header className={styles.container}>
      <h1>Search Container</h1>
      <div>
        <input type="text" value={inputText} onChange={handleChange} />
        <button onClick={handleSubmit}>Search</button>
      </div>
    </header>
  );
};

export default SearchContainer;
