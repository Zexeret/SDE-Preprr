import { useEffect } from "react";
import { useTheme } from "../theme";

export const usePrimeReactEditorStyle = () => {
  const theme = useTheme();

  useEffect(() => {
    // Set CSS custom properties when theme changes for editor
    const root = document.documentElement;
    root.style.setProperty("--theme-bg-primary", theme.primary);
    root.style.setProperty("--theme-bg-secondary", theme.surface);
    root.style.setProperty("--theme-bg-elevated", theme.surfaceElevated);
    root.style.setProperty("--theme-border-primary", theme.border);
    root.style.setProperty("--theme-border-secondary", theme.border + "54");
    root.style.setProperty("--theme-text-primary", theme.text.primary);
    root.style.setProperty("--theme-text-secondary", theme.text.secondary);
    root.style.setProperty("--theme-text-muted", theme.text.secondary);
    root.style.setProperty("--theme-primary-main", theme.primary);
  }, [theme]);
};
