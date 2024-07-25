import { Context, createContext, useContext } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

const ThemeContext: Context<ThemeContextType> = createContext(
  {} as ThemeContextType
);

const useThemeContext = () => useContext<ThemeContextType>(ThemeContext);

export { ThemeContext, useThemeContext };
