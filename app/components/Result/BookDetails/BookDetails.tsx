import { FC } from "react";
import styles from "./BookDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { BookItem } from '../../../data/users.data';

interface BookDetailsProps {
    pageNumber: string,
    dataBook: BookItem | undefined;
}

const BookDetails: FC<BookDetailsProps> = ( { pageNumber, dataBook}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`?page=${pageNumber}`);
  };

  return (
    <div className={styles.wrapper}>
        <h2>{dataBook?.name}</h2>
        <img src={dataBook?.image} className={styles.img_item}></img>
        <p>Status: {dataBook?.status}</p>
        <p>Species: {dataBook?.species}</p>
        <p>Type: {dataBook?.type}</p>
        <div className={styles.button}>
          <button onClick={handleClose}>Close</button>
        </div>
    </div>
  );
};

export default BookDetails;