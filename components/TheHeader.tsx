import styles from './TheHeader.module.css';
import { Navigation } from '@/components/Navigation';
import React from 'react';

export const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const TheHeader = () => {
  const theme = 'light';
  return (
    <header
      className={`${styles.navBar} ${theme === 'light' ? styles.light : styles.dark}`}
    >
      <ul>
        <Navigation navLinks={links} />
      </ul>
    </header>
  );
};

export { TheHeader };
