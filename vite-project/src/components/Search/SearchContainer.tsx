import React, { FC, useState } from "react";
import styles from "./Search.module.css";

interface SearchContainerProps {
  //onSearch: (searchItem: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchContainer: FC<SearchContainerProps> = ({
  search,
  setSearch,
}: SearchContainerProps) => {
  const [inputText, setInputText] = useState<string>(search);

  const handleSearch = (inputText: string) => {
    console.log(search);
    setSearch(inputText);
    console.log(search + " 2");
    localStorage.setItem("searchText", inputText);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(inputText);
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
