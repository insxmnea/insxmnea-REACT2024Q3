import { FC } from "react";
import styles from "./HomePage.module.scss";
import { Outlet } from "react-router-dom";
import { DealsList } from "src/widgets/deals-list";
import { ThemeButton } from "src/features/theme";
import { SearchBar } from "src/widgets/search-bar";

type Props = {
  children?: React.ReactNode;
};

export const HomePage: FC<Props> = ({ children }) => {
  return (
    <div>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <SearchBar />

          <ThemeButton />
        </header>

        <div className={styles.content}>
          <DealsList />
          {/* <Outlet /> */}
          {children}
        </div>
      </div>

      <footer className={styles.footer}></footer>
    </div>
  );
};
