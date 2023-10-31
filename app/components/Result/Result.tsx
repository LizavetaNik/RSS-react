import { Component } from 'react';
import { fetchBooks } from '../../services/bookThunk';
import styles from './Result.module.scss';
import Book from './Book/Book';
import { BookItem } from '../../data/users.data';
import { ClipLoader } from 'react-spinners';

interface ResultProps {
    searchInput: string;
}

interface ResultState {
    booksArr: BookItem[];
    isLoading: boolean,
}

class Result extends Component<ResultProps, ResultState> {
  constructor(props: ResultProps) {
    super(props);
    this.state = {
      booksArr: [],
      isLoading: true,
    };
  }

  async fetchData() {
    try {
      const action = await fetchBooks(this.props.searchInput);
      
      if(action == ""){
        this.setState({ booksArr: [], isLoading: false });
      }
      if (action) {
        const booksData = action.results;
        this.setState({ booksArr: booksData, isLoading: false });
      }
    } catch (err) {
      console.log(err);
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    this.fetchData();
  }

  componentDidUpdate(prevProps: ResultProps) {
    if (this.props.searchInput !== prevProps.searchInput) {
      this.setState({ isLoading: true });
      this.fetchData();
    }
  }

  render() {
    return (
      <>
        <div className={styles.wrapper}>
          {this.state.isLoading ? (
            <ClipLoader color="#0168ce" loading={true} size={100} />
          ) : (
            this.state.booksArr.length > 0 ? (
              this.state.booksArr.map((book) => (
                <Book key={book.id} name={book.name} image={book.image} />
              ))
            ) : (
              <div>Search is empty</div>
            )
          )}
        </div>
      </>
    );
  }
}

export default Result;