import { createContext, useContext } from "react";

export type ThemeName = 'light' | 'dark' ;

export type Theme = {
    background: string; 
}

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return theme;
}