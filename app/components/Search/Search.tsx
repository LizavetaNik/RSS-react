import { Component } from 'react';
import styles from './Search.module.scss';

interface SearchProps {
    onSearchSubmit: (inputValue: string) => void;
}

class Search extends Component<SearchProps, { inputValue: string }> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      inputValue: '',
    };
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  handleSubmit = () => {
    localStorage.setItem('searchQuery', this.state.inputValue);
    this.props.onSearchSubmit(this.state.inputValue);
  };

  componentDidMount() {
    const savedSearchQuery = localStorage.getItem('searchQuery');
    if (savedSearchQuery) {
      this.setState({ inputValue: savedSearchQuery });
      this.props.onSearchSubmit(savedSearchQuery);
    }
  }

  render() {
    return (
      <>
        <div className={styles.wrapper}>
          <form>
            <input
              type="text"
              placeholder="Enter text"
              value={this.state.inputValue}
              onChange={this.handleInputChange}
            />
            <button type="button" onClick={this.handleSubmit}>
              Search
            </button>  
          </form>
        </div>
      </>
    );
  }
}

export default Search;
