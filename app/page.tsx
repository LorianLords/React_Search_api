import React from 'react';
import styles from './Home.module.css';
import Pagination from '@/components/Pagination/Pagination';
import CardList from '@/app/CardListWrapper/CardList/CardList';

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
