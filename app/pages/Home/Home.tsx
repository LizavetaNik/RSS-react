import { Component } from 'react';
import styles from './Home.module.scss';
import Result from '../../components/Result/Result';
import Search from '../../components/Search/Search';

interface HomeState {
  searchInput: string;
  error: Error | null;
}

class Home extends Component<{}, HomeState> {
  constructor(props: {}) {
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

  handleError = () => {
    try {
      throw new Error('Caught an error');
    } catch (error) {
      console.log("Caught an error");
      this.setState({ error: error as Error });
    } 
  };

  removeError = () => {
    this.setState({ error: null });
  }

  render() {
    if (this.state.error) {
      
      return (
        <>
        <h1>Caught an error</h1>
        <button className={styles.button_red} type="button" onClick={this.removeError}>
          Remove error
        </button>
        </>
      )
    }
    return (
     <>
        <button className={styles.button_red} type="button" onClick={this.handleError}>
          Emit error
        </button>
       
        <div className={styles.wrapper}>
          <div className={styles.wrapper_result}>
            <Search onSearchSubmit={this.handleSearchSubmit} />
            <Result searchInput={this.state.searchInput} />
          </div>
        </div>
      </>
    );
  }
}

export default Home;
