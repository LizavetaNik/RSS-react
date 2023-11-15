import { useEffect, useState } from 'react';

import styles from './Result.module.scss';
import Character from './Character/Character';
import { CharacterItem } from '../../data/users.data';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import CharacterDetails from './CharacterDetails/CharacterDetails';
import { ClipLoader } from 'react-spinners';
import { fetchBooks } from '../../services/bookThunk';

const Result = () => {
  const [charactersArr, setCharactersArr] = useState<CharacterItem[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [newQuantity, setNewQuantity] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState(1);
  const searchInput = '';
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const characterId = searchParams.get("character");
  const quantityOptions = [5, 10, 15, 20];

  const fetchDate = async () => {
    setIsLoading(true);
    try {
      const action = await fetchBooks(searchInput);

      if(action == ""){
        setTotalPages(0);
        setTotalCharacters(0);
        setCharactersArr([]);
        setIsLoading(false);
        setPageNumber(1);
      }
      if (action) {
        setTotalPages(Number(action.info.pages));
        setTotalCharacters(Number(action.info.count));
        setCharactersArr(action.results);
        setIsLoading(false);
        navigate(`/home?page=${pageNumber}`, { replace: true });
      } 
    } catch (e) {
        console.log("Error reading columns");
    }
  };
   
  useEffect(() => {
    fetchDate();
    if(searchInput != ''){
      setCharactersArr(
        charactersArr.filter((character) => character.name.includes(searchInput))
      );
    }
  }, [searchInput, pageNumber]);

  const getDataCharacter = (id: string): CharacterItem | undefined => {
    return charactersArr.find((character) => Number(character.id) === Number(id));
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
          {(characterId != undefined) && (
            <div className={`${styles.rightPanel}`}>
              <Outlet />
              <CharacterDetails pageNumber={pageNumber.toString()} dataCharacter={getDataCharacter(characterId)}/>
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
