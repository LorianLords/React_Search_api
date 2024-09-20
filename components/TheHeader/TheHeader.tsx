import styles from './TheHeader.module.css';
import { Navigation } from '@/components/TheHeader/Navigation/Navigation';
import React from 'react';
import ThemeToggle from '@/components/TheHeader/ThemeToggle';

export const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

const TheHeader = () => {
  return (
    <header className={styles.navBar}>
      <ul>
        <Navigation navLinks={links} />
        <ThemeToggle />
      </ul>
    </header>
  );
};

export { TheHeader };
