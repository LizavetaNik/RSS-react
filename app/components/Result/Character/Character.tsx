import { FC } from "react";
import styles from "./Character.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setViewModeResults } from "../../../features/viewMode";

interface Props {
    key: string,
    name: string,
    image: string,
    characterId: string, 
    pageNumber: string,
  }

const Character: FC<Props> = ({ name, image, characterId, pageNumber }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCharacterClick = () => {
      dispatch(setViewModeResults(characterId));
      navigate(`?page=${pageNumber}&character=${characterId}`);
    };
    
    return (
        <div className={styles.wrapper}>
            <h2>{name}</h2>
            <img src={image} className={styles.img_item}></img>
            <button onClick={handleCharacterClick}>More...</button>
        </div>
    );
}

export default Character;