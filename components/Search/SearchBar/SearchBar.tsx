'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { setSearch } from '@/redux/SearchSlice/SearchSlice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { setCurrentPage } from '@/redux/PaginationSlice/PaginationSlice';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const { searchText } = useAppSelector((state) => state.search);
  const [inputText, setInput] = useState('');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    setInput(searchText || '');
  }, [searchText]);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      console.log(value);
      const params = new URLSearchParams(searchParams.toString());
      if (value === '') {
        params.delete(name);
      } else params.set(name, value);
      return params.toString();
    },
    [searchParams],
  );

  //const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push(
      pathname + '?' + createQueryString('search', inputText.trim().replace(/\s+/g, '_')),
    );
    dispatch(setSearch(inputText.trim()));
    dispatch(setCurrentPage(1));

    //if (inputText.trim() == '') localStorage.removeItem('searchText');
  };

  return (
    <div>
      <input type="text" value={inputText} onChange={handleChange} />
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
};

export default SearchBar;
