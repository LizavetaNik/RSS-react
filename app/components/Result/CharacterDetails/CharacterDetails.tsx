import { FC, useEffect, useState } from "react";
import styles from "./CharacterDetails.module.scss";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { CharacterItem } from '../../../data/users.data';
import { useFetchCharactersQuery } from '../../../features/charApi';

interface CharacterDetailsProps {
  pageNumber: string,
  id: string;
}

const CharacterDetails: FC<CharacterDetailsProps> = ( { pageNumber, id}) => {
  const navigate = useNavigate();
  const [dataCharacter, setDataCharacter] = useState<CharacterItem | null>(null);

  const handleClose = () => {
    navigate(`?page=${pageNumber}`);
  };

  const { data, isLoading, isError, error } = useFetchCharactersQuery({ id });
  useEffect(() => {
    if (data) {
      setDataCharacter(data);
    }
    if (isError) {
      const itemEmpty = {
        id: '',
        name: '',
        image: '',
        status: '',
        species: '',
        type: '',
      }
      setDataCharacter(itemEmpty);
      console.log("Error reading columns " + error);
    }
  }, [data]);

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