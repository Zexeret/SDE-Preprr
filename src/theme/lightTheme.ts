import type { Theme } from "./Theme";

export const lightTheme: Theme = {
  background: "#F1F5F9",
  primaryBorder: "#E2E8F0",
  secondaryBorder: "#CBD5E1",
  text: {
    primary: "#0F172A",
    secondary: "#64748B",
    muted: "#94A3B8",
  },
  actions: {
    success: "#16A34A",
    error: "#DC2626",
    warning: "#D97706",
    info: "#2563EB",
  },
  colors: {
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    secondary: "#8b5cf6",
    surface: "#ffffff",
    surfaceHover: "#f8fafc",
  },
  rgba: {
    white003: "rgba(0, 0, 0, 0.03)",
    white005: "rgba(0, 0, 0, 0.05)",
    white008: "rgba(0, 0, 0, 0.08)",
    white01: "rgba(0, 0, 0, 0.1)",
    white02: "rgba(0, 0, 0, 0.2)",
    black02: "rgba(0, 0, 0, 0.2)",
    black05: "rgba(0, 0, 0, 0.5)",
    black07: "rgba(0, 0, 0, 0.7)",
    primary03: "rgba(99, 102, 241, 0.3)",
    primary04: "rgba(99, 102, 241, 0.4)",
    danger03: "rgba(220, 38, 38, 0.3)",
    danger04: "rgba(220, 38, 38, 0.4)",
    success02: "rgba(22, 163, 74, 0.2)",
  },
  shadows: {
    card: "0 8px 32px rgba(0, 0, 0, 0.1)",
    modal: "0 20px 60px rgba(0, 0, 0, 0.3)",
    buttonPrimary: "0 4px 12px rgba(99, 102, 241, 0.3)",
    buttonPrimaryHover: "0 6px 20px rgba(99, 102, 241, 0.4)",
    buttonDanger: "0 4px 12px rgba(220, 38, 38, 0.3)",
    buttonDangerHover: "0 6px 20px rgba(220, 38, 38, 0.4)",
  },
};
