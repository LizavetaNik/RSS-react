import { useState } from 'react';
import styles from './Home.module.scss';
import Result from '../../components/Result/Result';
import Search from '../../components/Search/Search';
import ErrorBoundary from '../../components/Error/ErrorBoundary';

function Home() {
  const [searchInput, setSearchInput] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSearchSubmit = (inputValue: string) => {
    setSearchInput(inputValue);
  };

  const handleError = () => {
    setError( Error("Error boundary") );
  };

  if (error) {
    throw new Error('ErrorBoundary worked!');
  }

  return (
    <ErrorBoundary>
      <button className={styles.button_red} type="button" onClick={handleError}>
        Emit error
      </button>

      <div className={styles.wrapper}>
        <div className={styles.wrapper_result}>
          <Search onSearchSubmit={handleSearchSubmit} />
          <Result searchInput={searchInput} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;