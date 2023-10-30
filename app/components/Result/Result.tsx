import { useEffect, useState } from 'react';
import { fetchBooks } from '../../services/bookThunk';
import styles from './Result.module.scss';
import Book from './Book/Book';
import { BookItem } from '../../data/users.data';
import { useNavigate } from 'react-router-dom';

interface ResultProps {
  searchInput: string;
}

const Result = ({ searchInput }: ResultProps) => {
  const [booksArr, setBooksArr] = useState<BookItem[]>([]);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);

  const fetchData = async () => {
    console.log("Num page = " + pageNumber);
    try {
      const action = await fetchBooks(searchInput, pageNumber);
      if (action) {
        const booksData = action.results;
        setBooksArr(booksData);
        navigate(`/home?page=${pageNumber}`, { replace: true });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchInput, pageNumber]);

  return (
    <>
      <div className={styles.pagination}>
        <button
          onClick={() => {
            if (pageNumber > 1) {
              setPageNumber(pageNumber - 1);
            }
          }}
        >
          Previous
        </button>
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </button>
      </div>

      <div className={styles.wrapper}>
        {booksArr.map((book: BookItem) => (
          <Book key={book.id} name={book.name} image={book.image} />
        ))}
      </div>
    </>
  );
};

export default Result;
