import { FC } from "react";
import styles from "./ThemeButton.module.scss";
import { useThemeContext } from "../../providers/ThemeProvider";

const ThemeButton: FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <label className={styles.label}>
      <input
        type="checkbox"
        id="toggle-theme"
        className={styles.toggle}
        onChange={toggleTheme}
        checked={theme === "dark"}
      />
      <span className={styles.slider}></span>
    </label>
  );
};

export default ThemeButton;
