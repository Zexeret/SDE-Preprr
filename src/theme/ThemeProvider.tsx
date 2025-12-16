import type { ThemeName } from "../model";
import { darkTheme } from "./darkTheme";
import { lightTheme } from "./lightTheme";
import { ThemeContext, type Theme, } from "./Theme";
import { ThemeProvider as EmotionThemeProvider } from "@emotion/react";

const getByThemeName: Record<ThemeName, Theme> = {
  dark: darkTheme,
  light: lightTheme,
};

export const ThemeProvider = ({
  themeName,
  children,
}: {
  readonly themeName: ThemeName;
  readonly children: React.ReactNode;
}) => {
  const theme = getByThemeName[themeName];

  return (
    <EmotionThemeProvider theme={theme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </EmotionThemeProvider>
  );
};
