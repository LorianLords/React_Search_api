import React from 'react';
import styles from './Home.module.css';
import CardList from '@/app/CardList/CardList';

export default function Home() {
  return (
    <div>
      <div id={'content-container'} className={`${styles.content} `}>
        <CardList />
      </div>
    </div>
  );
}
