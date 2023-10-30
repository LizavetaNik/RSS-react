import { Component } from 'react';
import styles from './Home.module.scss';
import Result from '../../components/Result/Result';
import Search from '../../components/Search/Search';
import ErrorBoundary from '../../components/Error/ErrorBoundary';

interface HomeState {
  searchInput: string;
  error: Error | null;
}

interface HomeProps {}

class Home extends Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      searchInput: '',
      error: null,
    };
    this.handleError = this.handleError.bind(this);
  }

  handleSearchSubmit = (inputValue: string) => {
    this.setState({ searchInput: inputValue });
  };

  handleError: () => void = () => {
    this.setState({ error: new Error("Error boundary") });
    ErrorBoundary.getDerivedStateFromError(new Error("Error boundary"));
  };

  render() {
    if (this.state.error) {
      throw new Error('ErrorBoundary worked!');
    }
    return (
      <ErrorBoundary>
        <button className={styles.button_red} type="button" onClick={this.handleError}>
          Emit error
        </button>

        <div className={styles.wrapper}>
          <div className={styles.wrapper_result}>
            <Search onSearchSubmit={this.handleSearchSubmit} />
            <Result searchInput={this.state.searchInput} />
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default Home;
