import { FC } from "react";
import styles from "./Character.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setViewModeResults } from "../../../features/viewMode";
import { setLoading } from "../../../features/loadingSlice";
import { RootState } from "../../../store/store";

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
    const isLoading = useSelector((state: RootState) => state.loading[characterId] || false);

    const handleCharacterClick = () => {
      dispatch(setViewModeResults(characterId));
      navigate(`?page=${pageNumber}&character=${characterId}`);
      dispatch(setLoading( {characterId, isLoading: true} ));
    };
    
    return (
        <div className={styles.wrapper}>
            <h2>{name}</h2>
            <img src={image} className={styles.img_item}></img>
            <button onClick={handleCharacterClick}>More...</button>
            <div className={`${styles.loadingIndicator} ${isLoading ? styles.loading : styles.notLoading}`}></div>
        </div>
    );
}

export default Character;