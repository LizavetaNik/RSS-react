import { FC } from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";

const Footer: FC<{ classes: string }> = ( classes ) => {
  return (
    <footer className={`${styles.footer} ${classes}`}>
      <Link to={"https://app.rs.school/"} target="_blank">RSSchool</Link>
    </footer>
  );
};

export default Footer;
