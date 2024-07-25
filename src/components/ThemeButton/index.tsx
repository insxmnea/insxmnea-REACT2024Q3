import { FC } from "react";
import styles from "./ThemeButton.module.scss";
import { useThemeContext } from "../../providers/ThemeProvider";

const ThemeButton: FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        id="toggle-theme"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
    </div>
  );
};

export default ThemeButton;
