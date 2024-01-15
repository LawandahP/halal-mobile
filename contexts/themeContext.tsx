import { createContext, useContext } from "react";

export type Theme = {
    mode: any;
    system: boolean;
};

export type ThemeContextValue = {
    theme: Theme;
    updateTheme: (newTheme: Theme | null) => void;
    // updateTheme: () => void;
  };
  
export const ThemeContext = createContext<ThemeContextValue>({
    theme: { mode: "dark", system: false },
    updateTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

  
