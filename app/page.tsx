import React from 'react';
import styles from './Home.module.css';
import CardList from '@/app/CardList/CardList';
import Pagination from '@/components/Pagination/Pagination';

export default function Home() {
  return (
    <div>
      <div id={'content-container'} className={`${styles.content} `}>
        <CardList />
        <Pagination />
      </div>
    </div>
  );
}
