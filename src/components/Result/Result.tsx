import React, { FC, useContext, useEffect, useRef } from 'react';
import styles from './Result.module.css';
import { CharacterItem } from '@/src/data/users.data';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = context.query.id || '';
  const response = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data = await response.json();
  return {
    props: { dataCharacter: data },
  };
}

interface ResultProps {
  searchQuery: string;
  pageNumber: number;
  quantity: number;
  characterId: string;
  totalPages: string;
  totalCharacters: string;
  charactersArr: CharacterItem[];
  onPageChange: (newPageNumber: number) => void;
  onQuantityChange: (newQuantity: number) => void;
  onCharacterSelect: (characterId: string) => void;
}

const Result: FC<ResultProps> = ({ 
  searchQuery,
  pageNumber, 
  quantity,
  characterId,
  totalPages,
  totalCharacters,
  charactersArr,
  onPageChange, 
  onQuantityChange,
  onCharacterSelect
}) => {

  const quantityOptions = [5, 10, 15, 20];
  const isLoading = true;

  const handleCharacterClick = (selectedId: string) => {
    onCharacterSelect(selectedId);
  };

  return (
      <> 
      <div className={styles.pagination}>
        <button
          onClick={() => {
            if (pageNumber > 1) {
              onPageChange(Number(pageNumber)-1);
            }
          }}
        >
          Previous
        </button>
        <div className={styles.numberPage}>{pageNumber}</div>
        <button
          onClick={() => {
            onPageChange(Number(pageNumber)+1);
          }}
        >
          Next
        </button>
        <div className={styles.quantityCharacters}>
          <label htmlFor="characterQuantity">Change quantity</label>
          <select
            id="characterQuantity"
            value={quantity}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
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
        <p>Total elements : {totalCharacters} / Total pages : {totalPages} / Search : {searchQuery}</p>
      </div>
      {charactersArr.length > 0 && (
      <div className={`page-container ${characterId ? '' : 'characterDetailsNotVisible'}`}>
        <div className={styles.wrapperResult}>
          <div className={styles.wrapper}>
            {charactersArr.slice(0, quantity).map((character: CharacterItem) => (
              <div className={styles.wrapper_item} key={character.id}>
                <h2>{character.name}</h2>
                <img src={character.image} className={styles.img_item}></img>
                <button onClick={() => handleCharacterClick(character.id)}>More...</button>
              </div>
            ))}
          </div>
        </div>
      </div> 
      )}   
      </>
  );
};

export default Result;