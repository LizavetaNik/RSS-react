import React, { FC, useRef } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearchSubmit: (query: string) => void;
  defaultQuery?: string;
}

const Search: FC<SearchProps> = ({ onSearchSubmit, defaultQuery = "" }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSearchSubmit(inputRef.current.value);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultQuery}
          placeholder="Enter text"
        />
        <button className={styles.buttonSearch} type="submit">Search</button>
      </form>
    </div>
  );
}

export default Search;