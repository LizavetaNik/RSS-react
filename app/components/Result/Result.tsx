import { useEffect, useState } from 'react';
import { fetchBooks } from '../../services/bookThunk';
import styles from './Result.module.scss';
import Book from './Book/Book';
import { BookItem } from '../../data/users.data';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import BookDetails from './BookDetails/BookDetails';
import { ClipLoader } from 'react-spinners';

interface ResultProps {
  searchInput: string;
}

const Result = ({ searchInput }: ResultProps) => {
  const [booksArr, setBooksArr] = useState<BookItem[]>([]);
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const [newQuantity, setNewQuantity] = useState('20');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const bookId = searchParams.get("book");
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const action = await fetchBooks(searchInput, pageNumber);
      if (action) {
        const booksData = action.results;
        setBooksArr(booksData);
        setIsLoading(false);
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

  const getDataBook = (id: string): BookItem | undefined => {
    return booksArr.find((book) => Number(book.id) === Number(id));
  };

  return (
    <>
    {isLoading ? (
      <div className={styles.clipLoader}>
      <ClipLoader color="#0168ce" loading={true} size={100}/>
    </div> 
    ) : (
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
        <div className={styles.numberPage}>{pageNumber}</div>
        <button
          onClick={() => {
            setPageNumber(pageNumber + 1);
          }}
        >
          Next
        </button>
        <div className={styles.quantityBooks}>
          <label>Change quantity</label>
          <input
            type="number"
            id="bookQuantity"
            placeholder="Введите количество книг"
            value={newQuantity}
            onChange={(e) => { setPageNumber(1); setNewQuantity(e.target.value) }}
            />
        </div>
      </div>
      <div className={`page-container ${bookId ? '' : 'bookDetailsNotVisible'}`}>
        <div className={styles.wrapperResult}>
          <div className={styles.wrapper}>
            {booksArr.slice(0, Number(newQuantity)).map((book: BookItem) => (
              <Book key={book.id} name={book.name} image={book.image} bookId={book.id} pageNumber={pageNumber.toString()} />
            ))}
          </div>
          {(bookId != undefined) && (
            <div className={`${styles.rightPanel}`}>
              <Outlet />
              <BookDetails pageNumber={pageNumber.toString()} dataBook={getDataBook(bookId)}/>
            </div>
          )}
        </div>
      </div>
      </>
      )}
    </>
  );
};

export default Result;
