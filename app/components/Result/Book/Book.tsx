import { FC } from "react";
import styles from "./Book.module.scss";

interface Props {
    name: string,
    image: string,
  }

const Book: FC<Props> = ({ name, image }) => {
    
    return (
        <div className={styles.wrapper}>
            <h2>{name}</h2>
            <img src={image} className={styles.img_item}></img>
        </div>
    );
}

export default Book;