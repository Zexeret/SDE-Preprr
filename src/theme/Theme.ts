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
  readonly background: string; // Deepest layer (app background)
  readonly backgroundSidebar: string; // Sidebar background
  readonly surface: string; // Middle layer (cards, containers)
  readonly surfaceHover: string; // Surface hover state
  readonly surfaceElevated: string; // Top layer (modals, dropdowns)
  readonly border: string; // Default border (subtle)
  readonly borderStrong: string; // Stronger border variant
  readonly text: {
    readonly primary: string;
    readonly secondary: string;
    readonly muted: string; // Tertiary/muted text
  };
  readonly primary: string;
  readonly primaryHover: string;
  readonly success: string;
  readonly successBackground: string; // Subtle success background
  readonly error: string;
  readonly errorBackground: string; // Subtle error background
  readonly warning: string;
  readonly warningBackground: string; // Subtle warning background
  readonly overlay: string;
  readonly shadow: string; // Soft shadow
  readonly shadowHover: string; // Elevated hover shadow
  readonly radius: {
    readonly sm: string;
    readonly md: string;
    readonly lg: string;
  };
}
