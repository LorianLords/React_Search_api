import React from 'react';
import styles from './Home.module.css';
import Pagination from '@/components/Pagination/Pagination';
import CardList from '@/app/CardList/CardList';
import CardDetails from '@/components/CardDetails/CardDetails';

export default function Home() {
  return (
    <div>
      <div id={'content-container'} className={`${styles.content} `}>
        <CardList />
        <Pagination />
        <CardDetails />
      </div>
    </div>
  );
}
