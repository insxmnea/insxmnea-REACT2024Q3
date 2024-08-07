import { Context, createContext, useContext } from "react";

type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

export const ThemeContext: Context<ThemeContextType> = createContext(
  {} as ThemeContextType
);

export const useThemeContext = () => useContext<ThemeContextType>(ThemeContext);
