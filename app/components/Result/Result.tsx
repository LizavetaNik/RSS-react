import { useEffect, useState } from 'react';
import styles from './Result.module.scss';
import Character from './Character/Character';
import { CharacterItem } from '../../data/users.data';
import { Outlet, useNavigate } from 'react-router-dom';
import CharacterDetails from './CharacterDetails/CharacterDetails';
import { ClipLoader } from 'react-spinners';
import { useSelector } from 'react-redux';
import { selectSearchResults } from '../../features/valueSearchSlice';
import { selectViewModeResults } from '../../features/viewMode';
import { useFetchCharactersQuery } from '../../features/charactersApi';

const Result = () => {
  const [charactersArr, setCharactersArr] = useState<CharacterItem[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [newQuantity, setNewQuantity] = useState(20);
  
  const [totalPages, setTotalPages] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(1);

  const searchInput = useSelector(selectSearchResults);
  
  const navigate = useNavigate();
  const characterId = useSelector(selectViewModeResults);
  const quantityOptions = [5, 10, 15, 20];

  const { data, isLoading, isError, error } = useFetchCharactersQuery({ name: searchInput, pageNumber });

  useEffect(() => {
    if (data) {
      setTotalPages(Number(data.info.pages));
      setTotalCharacters(Number(data.info.count));
      setCharactersArr(data.results);
      navigate(`/home?page=${pageNumber}`, { replace: true });
    }
    if (isError) {
      setTotalPages(0);
      setTotalCharacters(0);
      setCharactersArr([]);
      setPageNumber(1);
      console.log("Error reading columns " + error);
    }
  }, [data, pageNumber]);

  useEffect(() => {
    navigate(`/home?page=${pageNumber}`, { replace: true });
  }, [pageNumber, navigate]);

  useEffect(() => {
    setPageNumber(1);
  }, [searchInput]); 

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
        <div className={styles.quantityCharacters}>
          <label>Change quantity</label>
          <select
            id="characterQuantity"
            value={newQuantity}
            onChange={(e) => { setPageNumber(1); setNewQuantity( Number(e.target.value)) }}
          >
            {quantityOptions.map( (option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles.totalBlock}>
        <p>Total elements : {totalCharacters} / Total pages : {totalPages} / Search : {searchInput}</p>
      </div>
      {charactersArr.length > 0 && (
      <div className={`page-container ${characterId ? '' : 'characterDetailsNotVisible'}`}>
        <div className={styles.wrapperResult}>
          <div className={styles.wrapper}>
            {charactersArr.slice(0, newQuantity).map((character: CharacterItem) => (
              <Character key={character.id} name={character.name} image={character.image} characterId={character.id} pageNumber={pageNumber.toString()} />
            ))}
          </div>
          {(characterId != '') && (
            <div className={`${styles.rightPanel}`}>
              <Outlet />
              <CharacterDetails pageNumber={pageNumber.toString()} id={characterId}/>
            </div>
          )}
        </div>
      </div> 
      )}   
      </>
    )}  
    </>
  );
};

export default Result;
