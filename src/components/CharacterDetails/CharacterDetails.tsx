import { FC, useEffect, useRef, useState } from "react";
import styles from "./CharacterDetails.module.css";
import { CharacterItem } from "@/src/data/users.data";
import router from "next/router";

interface CharacterDetailsProps {
  dataCharacter?: CharacterItem;
  characterId: string;
  onClose: () => void;
}

const CharacterDetails: FC<CharacterDetailsProps> = ({ dataCharacter, characterId, onClose }) => {

  return (
    <>
      <div className={styles.wrapper}>
        <h2>{dataCharacter?.id}</h2>
        <h2>{dataCharacter?.name}</h2>
        <img src={dataCharacter?.image} className={styles.img_item} alt={dataCharacter?.name}></img>
        <p>Status: {dataCharacter?.status}</p>
        <p>Species: {dataCharacter?.species}</p>
        <p>Type: {dataCharacter?.type}</p>
        <div className={styles.button}>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

export default CharacterDetails;