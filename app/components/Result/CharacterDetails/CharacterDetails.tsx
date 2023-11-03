import { FC } from "react";
import styles from "./CharacterDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { CharacterItem } from '../../../data/users.data';

interface CharacterDetailsProps {
    pageNumber: string,
    dataCharacter: CharacterItem | undefined;
}

const CharacterDetails: FC<CharacterDetailsProps> = ( { pageNumber, dataCharacter}) => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`?page=${pageNumber}`);
  };

  return (
    <div className={styles.wrapper}>
        <h2>{dataCharacter?.name}</h2>
        <img src={dataCharacter?.image} className={styles.img_item}></img>
        <p>Status: {dataCharacter?.status}</p>
        <p>Species: {dataCharacter?.species}</p>
        <p>Type: {dataCharacter?.type}</p>
        <div className={styles.button}>
          <button onClick={handleClose}>Close</button>
        </div>
    </div>
  );
};

export default CharacterDetails;