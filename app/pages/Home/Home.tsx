import { useState } from 'react';
import styles from './Home.module.scss';
import Result from '../../components/Result/Result';
import Search from '../../components/Search/Search';
import ErrorBoundary from '../../components/Error/ErrorBoundary';
import { Link } from 'react-router-dom';

function Home() {
  const [error, setError] = useState<Error | null>(null);

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
      <nav className={styles.link}>
        <Link to="/formPage">FORMS</Link>
      </nav>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_result}>
          <Search />
          <Result />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;