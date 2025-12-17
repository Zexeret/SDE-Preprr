import type { Theme } from "./Theme";

export const lightTheme: Theme = {
  background: "#F5F7FB",
  backgroundSidebar: "#FFFFFF",
  surface: "#FFFFFF",
  surfaceHover: "#F1F4FA",
  surfaceElevated: "#FFFFFF",
  border: "rgba(0, 0, 0, 0.06)",
  borderStrong: "rgba(0, 0, 0, 0.12)",
  text: {
    primary: "#0F172A",
    secondary: "#475569",
    muted: "#64748B",
  },
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  success: "#16A34A",
  successBackground: "rgba(22, 163, 74, 0.12)",
  error: "#DC2626",
  errorBackground: "rgba(220, 38, 38, 0.12)",
  warning: "#CA8A04",
  warningBackground: "rgba(202, 138, 4, 0.12)",
  overlay: "rgba(0, 0, 0, 0.4)",
  shadow: "0 6px 20px rgba(0, 0, 0, 0.08)",
  shadowHover: "0 8px 24px rgba(0, 0, 0, 0.12)",
  radius: {
    sm: "6px",
    md: "10px",
    lg: "14px",
  },
};
