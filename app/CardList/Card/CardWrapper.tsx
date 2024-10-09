'use client';
import Card from '@/app/CardList/Card/Card';
import React from 'react';
import { CardProps } from '@/types/types';
import { useAppDispatch } from '@/services/hooks';
import { setCardId, toggleIsDetailsOpen } from '@/redux/DetailsSlice/DetailsSlice';
import styles from '@/app/CardList/Card/Card.module.css';

type CardWrapperProps = {
  item: CardProps;
  key: number;
};

const CardWrapper = ({ item }: CardWrapperProps) => {
  const dispatch = useAppDispatch();

  const handleSidePanel = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(toggleIsDetailsOpen(true));
    dispatch(setCardId(item.id));
    e.stopPropagation();
  };

  return (
    <div onClick={handleSidePanel} className={styles.card}>
      <Card
        key={item.id}
        id={item.id}
        title={item.title}
        date_display={item.date_display}
        artist_display={item.artist_display}
        image={item.image}
        image_id={item.image_id}
      />
    </div>
  );
};

export default CardWrapper;
