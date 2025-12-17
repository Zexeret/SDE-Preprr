import type { Theme } from "./Theme";

export const darkTheme: Theme = {
  background: "#0B0E14",
  backgroundSidebar: "#0E1118",
  surface: "#121826",
  surfaceHover: "#161D2E",
  surfaceElevated: "#1A2236",
  border: "rgba(255, 255, 255, 0.06)",
  borderStrong: "rgba(255, 255, 255, 0.12)",
  text: {
    primary: "#E6EAF2",
    secondary: "#9AA4BF",
    muted: "#6B7280",
  },
  primary: "#3B82F6",
  primaryHover: "#2563EB",
  success: "#22C55E",
  successBackground: "rgba(34, 197, 94, 0.15)",
  error: "#EF4444",
  errorBackground: "rgba(239, 68, 68, 0.15)",
  warning: "#FACC15",
  warningBackground: "rgba(250, 204, 21, 0.15)",
  overlay: "rgba(0, 0, 0, 0.7)",
  shadow: "0 8px 24px rgba(0, 0, 0, 0.45)",
  shadowHover: "0 10px 32px rgba(0, 0, 0, 0.6)",
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },
};
