import React, { FC } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  onSearchSubmit: (query: string) => void;
  defaultQuery?: string;
}

const Search: FC<SearchProps> = ({ onSearchSubmit, defaultQuery = "" }) => {
  const [inputValue, setInputValue] = React.useState(defaultQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit(inputValue);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter text"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={styles.buttonSearch} type="submit">Search</button>  
      </form>
    </div>
  );
}

export default Search;
