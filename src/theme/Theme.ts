import { createContext, useContext } from "react";

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};

export interface Theme {
  readonly background: string; // Deepest layer
  readonly surface: string; // Middle layer (cards, containers)
  readonly surfaceElevated: string; // Top layer (modals, dropdowns)
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
