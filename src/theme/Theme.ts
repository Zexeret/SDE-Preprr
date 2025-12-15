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
  readonly primaryBorder: string;
  readonly secondaryBorder: string;
  readonly text: {
    readonly primary: string;
    readonly secondary: string;
    readonly muted: string;
  };
  readonly actions: {
    readonly success: string;
    readonly error: string;
    readonly warning: string;
    readonly info: string;
  };
  readonly colors: {
    readonly primary: string;
    readonly primaryHover: string;
    readonly secondary: string;
    readonly surface: string;
    readonly surfaceHover: string;
  };
  readonly rgba: {
    readonly white003: string;
    readonly white005: string;
    readonly white008: string;
    readonly white01: string;
    readonly white02: string;
    readonly black02: string;
    readonly black05: string;
    readonly black07: string;
    readonly primary03: string;
    readonly primary04: string;
    readonly danger03: string;
    readonly danger04: string;
    readonly success02: string;
  };
  readonly shadows: {
    readonly card: string;
    readonly modal: string;
    readonly buttonPrimary: string;
    readonly buttonPrimaryHover: string;
    readonly buttonDanger: string;
    readonly buttonDangerHover: string;
  };
}
