import { useEffect, useState } from 'react';
import { fetchBooks } from '../../services/bookThunk';
import styles from './Result.module.scss';
import Book from './Book/Book';
import { BookItem } from '../../data/users.data';

interface ResultProps {
    searchInput: string;
}

const Result = ({ searchInput }: ResultProps) => {
  const [booksArr, setBooksArr] = useState<BookItem[]>([]);

  const fetchData = async () => {
      try {
        const action = await fetchBooks(searchInput);
        if (action) {
          const booksData = action.results;
          setBooksArr(booksData);
        }
      } catch (err: unknown) { 
          if (err instanceof Error) {
             console.log(err);
          }
        }
    };

    useEffect(() => {
      fetchData();
    }, [searchInput]);

    return (
      <>
        <div className={styles.wrapper}>
          {booksArr.map((book: BookItem) => (
            <Book
              key={book.id}
              name={book.name} 
              image={book.image}
            />
          ))}
        </div>
      </>
    );
}

export default Result;