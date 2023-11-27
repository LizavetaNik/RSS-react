import { useState } from 'react';
import styles from './Home.module.scss';
import Result from '../../components/Result/Result';
import Search from '../../components/Search/Search';
import ErrorBoundary from '../../components/Error/ErrorBoundary';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';

function Home() {
  const [error, setError] = useState<Error | null>(null);
  const formData = useSelector((state: RootState) => state.formData.data);
  
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
      <div className="dataForm">
        <h2>Form Data</h2>
        <div>
          <p><strong>Name:</strong> {formData.name}
            <strong> Country:</strong> {formData.country}
            <strong> Age:</strong> {formData.age}
            <strong> Email:</strong> {formData.email}</p>
        </div>
        {formData.image && (
          <div>
            <img src={formData.image} alt="Uploaded" width={140} />
          </div>
        )}
      </div>
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