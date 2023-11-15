import { FC, useState, useEffect } from 'react';
import styles from './Search.module.scss';

const Search: FC = () => {
  const [inputValue, setInputValue] = useState("");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    localStorage.setItem('searchQuery', inputValue);
  };

  useEffect( () => {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      setInputValue(savedSearchQuery);
    }
  }, []);

  return (
    <>
        <div className={styles.wrapper}>
          <form>
            <input
              type="text"
              placeholder="Enter text"
              value={inputValue}
              onChange={handleInputChange}
            />
            <button type="button" onClick={handleSubmit}>
              Search
            </button>  
          </form>
        </div>
    </>
  );
}

export default Search;
