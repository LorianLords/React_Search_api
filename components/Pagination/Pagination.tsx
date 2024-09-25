'use client';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  decrementCurPage,
  incrementCurPage,
} from '@/redux/PaginationSlice/PaginationSlice';
import styles from './Pagination.module.css';
import { usePathname } from 'next/navigation';
const Pagination = () => {
  //const [searchParams, setSearchParams] = useSearchParams();
  /*
  const router = useRouter();
  const searchParams = new URLSearchParams(window.location.search);
  const pathname = usePathname();
*/

  const { totalPages, currentPage } = useAppSelector((state) => state.pagination);
  const dispatch = useAppDispatch();
  /*
  searchParams.set('page', currentPage.toString());
  router.push(pathname + '?' + searchParams.toString());
*/

  /*  useEffect(() => {
    searchParams.set('page', currentPage.toString());
    replace(`${pathname}?${searchParams.toString()}`);
    //router.push(`?${searchParams.toString()}`);
    console.log('useEff pagination');
  }, [currentPage, searchParams]);*/

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
      <button className={styles.pagBtn} onClick={handlePrevious}>
        Previous
      </button>
      <span className={styles.pagText}>
        Page {currentPage} of {totalPages}
      </span>
      <button className={styles.pagBtn} onClick={handleNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
