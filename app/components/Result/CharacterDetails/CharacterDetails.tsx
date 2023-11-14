import { FC, useEffect, useState } from "react";
import styles from "./CharacterDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { fetchChar } from "../../../services/charThunk";
import { useAppDispatch } from "../../../hooks/hooks";
import { ClipLoader } from 'react-spinners';
import { CharacterItem } from '../../../data/users.data';
import { selectIsLoadingItem } from "../../../features/loadingSlice";
import { useSelector } from "react-redux";

interface CharacterDetailsProps {
  pageNumber: string,
  id: string;
}

const CharacterDetails: FC<CharacterDetailsProps> = ( { pageNumber, id}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [dataCharacter, setDataCharacter] = useState<CharacterItem | null>(null);
  const isLoading = useSelector(selectIsLoadingItem);

  const handleClose = () => {
    navigate(`?page=${pageNumber}`);
  };

  const fetchDate = async () => {
    try {
        const resultAction = await dispatch(fetchChar(id));
        const responseBody = resultAction.payload;
        setDataCharacter(responseBody);
    } catch (e) {
        console.log("Error reading columns");
    }
  };
   
  useEffect(() => {
    fetchDate();
  }, [id, dispatch]);

  return (
    <>
    {isLoading ? (
      <div className={styles.clipLoader}>
      <ClipLoader color="#0168ce" loading={true} size={100}/>
    </div> 
    ) : (
      <div className={styles.wrapper}>
        <h2>{dataCharacter?.id}</h2>
        <h2>{dataCharacter?.name}</h2>
        <img src={dataCharacter?.image} className={styles.img_item}></img>
        <p>Status: {dataCharacter?.status}</p>
        <p>Species: {dataCharacter?.species}</p>
        <p>Type: {dataCharacter?.type}</p>
        <div className={styles.button}>
          <button onClick={handleClose}>Close</button>
        </div>
      </div>
    )}
    </>
  );
};

export default CharacterDetails;