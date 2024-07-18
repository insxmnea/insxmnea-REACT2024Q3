import { FC } from "react";
import styles from "./Main.module.scss";
import SearchBar from "../../components/SearchBar";
import CardList from "../../components/CardList";
import { Outlet } from "react-router-dom";

type Props = {};

const Main: FC<Props> = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <SearchBar />
      </header>

      <div className={styles.content}>
        <CardList />
        <Outlet />
      </div>
    </div>
  );
};

export default Main;
