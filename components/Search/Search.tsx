import styles from './Search.module.css';
import SearchBar from '@/components/Search/SearchBar/SearchBar';

const Search = () => {
  return (
    <header className={styles.container}>
      <h1>Search Container</h1>
      <SearchBar />
    </header>
  );
};

export default Search;
