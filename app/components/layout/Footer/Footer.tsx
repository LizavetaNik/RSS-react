import { FC } from "react";
import styles from "./Footer.module.scss";
import { Link } from "react-router-dom";
import logoRSSchool from "../../../assets/images/logo-rsschool.jpg";

const Footer: FC<{ classes: string }> = ( classes ) => {
  return (
    <footer className={`${styles.footer} ${classes}`}>
      <Link to={"https://app.rs.school/"} target="_blank">
        <img src={logoRSSchool} alt="RSSchool" className={styles.foto} />
      </Link>
    </footer>
  );
};

export default Footer;
