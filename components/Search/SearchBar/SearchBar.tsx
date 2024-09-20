'use client';
import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setSearch } from '@/redux/SearchSlice/SearchSlice';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.search);
  const [inputText, setInput] = useState(searchText);

  //const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (inputText.trim() === '') {
      //  searchParams.delete('search');
    } else {
      // searchParams.set('search', inputText);
    }
    //   setSearchParams(searchParams);

    // dispatch(setCurrentPage(1));
    dispatch(setSearch(inputText.trim()));
    //localStorage.setItem("searchText", inputText.trim());
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
