import React, { FC, useState } from "react";
import styles from "./Search.module.css";
import { useSearchParams } from "react-router-dom";

interface SearchContainerProps {
  //onSearch: (searchItem: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const SearchContainer: FC<SearchContainerProps> = ({
  search,
  setSearch,
  setCurrentPage,
}: SearchContainerProps) => {

  const [inputText, setInputText] = useState<string>(search);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = (inputText: string) => {
    setSearch(inputText);
    localStorage.setItem("searchText", inputText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setCurrentPage(1);
    if (inputText.trim() === "") {
      searchParams.delete("search");
    } else {
      searchParams.set("search", inputText);
    }
    setSearchParams(searchParams);

    handleSearch(inputText.trim());
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
