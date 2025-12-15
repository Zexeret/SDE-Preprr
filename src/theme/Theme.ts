import { createContext, useContext } from "react";

export type ThemeName = "light" | "dark";

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export interface Theme {
  readonly background: string;
  readonly surface: string;
  readonly border: string;
  readonly text: {
    readonly primary: string;
    readonly secondary: string;
  };
  readonly primary: string;
  readonly primaryHover: string;
  readonly success: string;
  readonly error: string;
  readonly warning: string;
  readonly overlay: string;
  readonly shadow: string;
}
