import { FC } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header/Header";
import Main from "../components/layout/Main/Main";
import Footer from "../components/layout/Footer/Footer";
import styles from "./Layout.module.scss";

const Layout: FC = () => {
  return (
    <>
      <Header classes={styles.container} />
      <Main classes={styles.container} >
        <Outlet />
      </Main>
      <Footer classes={styles.container} />
    </>
  );
};

export default Layout;
