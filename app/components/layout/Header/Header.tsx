import { FC } from "react";
import styles from "./Header.module.scss";

const Header: FC<{ classes: string }> = ({ classes }) => {
  

  return (
    <header className={`${styles.header} ${classes}`}>
      <h1>Project react</h1>
    </header>
  );
};

export default Header;
