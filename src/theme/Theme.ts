import { createContext, useContext } from "react";

export type ThemeName = 'light' | 'dark' ;

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return theme;
}

export type Theme = {
    readonly background: string; 
    readonly primaryBorder: string;
    readonly secondaryBorder: string;
    readonly text :  {
        readonly primary: string;
        readonly secondary: string;
    }
    readonly actions: {
        readonly success: string;
        readonly error: string;
        readonly warning: string;
        readonly info: string;
    }
}