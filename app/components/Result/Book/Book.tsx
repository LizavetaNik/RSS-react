import { FC } from "react";
import styles from "./Book.module.scss";
import { useNavigate } from "react-router-dom";

interface Props {
    key: string,
    name: string,
    image: string,
    bookId: string, 
    pageNumber: string,
  }

const Book: FC<Props> = ({ name, image, bookId, pageNumber }) => {
    const navigate = useNavigate();

    const handleBookClick = () => {
      navigate(`/home/page/${pageNumber}/book/${bookId}`);
    };
    
    return (
        <div className={styles.wrapper}>
            <h2>{name}</h2>
            <img src={image} className={styles.img_item}></img>
            <button onClick={handleBookClick}>Подробнее</button>
        </div>
    );
}

export default Book;