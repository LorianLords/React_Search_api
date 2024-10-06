'use client';
import styles from '@/app/CardList/Card/Card.module.css';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/services/hooks';
import { toggleCard } from '@/redux/CardListSlice/CardListSlice';

interface checkboxProps {
  id: number;
}

const Checkbox = ({ id }: checkboxProps) => {
  const { selectedCards } = useAppSelector((state) => state.cardList);
  const dispatch = useAppDispatch();
  const handleCheckboxChange = (id: number) => {
    dispatch(toggleCard(id.toString()));
  };

  return (
    <div
      className={styles.checkboxContainer}
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className={`${styles.checkboxWrapper}`}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={selectedCards.includes(id.toString())}
          onChange={() => handleCheckboxChange(id)}
        />
      </div>
    </div>
  );
};

export default Checkbox;
