import { FC } from "react";
import styles from "./Main.module.scss";
import SearchBar from "../../components/SearchBar";
import DealsList from "../../components/DealsList";
import { Outlet } from "react-router-dom";
import ThemeButton from "../../components/ThemeButton";

type Props = {};

const Main: FC<Props> = () => {
  return (
    <div>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <SearchBar />

          <ThemeButton />
        </header>

        <div className={styles.content}>
          <DealsList />
          <Outlet />
        </div>
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Main;
