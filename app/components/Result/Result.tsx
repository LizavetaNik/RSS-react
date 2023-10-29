import { Component } from 'react';
import { fetchBooks } from '../../services/bookThunk';
import styles from './Result.module.scss';
import Book from './Book/Book';
import { BookItem } from '../../data/users.data';

interface ResultProps {
    searchInput: string;
}

interface ResultState {
    booksArr: BookItem[];
}

class Result extends Component<ResultProps, ResultState> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      booksArr: [],
    };
  }

  async fetchData() {
    try {
      const action = await fetchBooks(this.props.searchInput);
      if (action) {
        const booksData = action.results;
        this.setState({ booksArr: booksData });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps: ResultProps) {
    if (this.props.searchInput !== prevProps.searchInput) {
      this.fetchData();
    }
    if (this.props.searchInput === '') {
        this.fetchData();
    }
  }

  render() {
    return (
      <>
        <div className={styles.wrapper}>
          {this.state.booksArr.map((book: BookItem) => (
            <Book key={book.id} name={book.name} image={book.image} />
          ))}
        </div>
      </>
    );
  }
}

export default Result;