import type { Theme } from "./Theme";

export const darkTheme: Theme = {
  background: "#0f172a",
  primaryBorder: "#1f2937",
  secondaryBorder: "#334155",
  text: {
    primary: "#F8FAFC",
    secondary: "#94A3B8",
    muted: "#64748b",
  },
  actions: {
    success: "#10B981",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#3B82F6",
  },
  colors: {
    primary: "#6366f1",
    primaryHover: "#4f46e5",
    secondary: "#8b5cf6",
    surface: "#1e293b",
    surfaceHover: "#334155",
  },
  rgba: {
    white003: "rgba(255, 255, 255, 0.03)",
    white005: "rgba(255, 255, 255, 0.05)",
    white008: "rgba(255, 255, 255, 0.08)",
    white01: "rgba(255, 255, 255, 0.1)",
    white02: "rgba(255, 255, 255, 0.2)",
    black02: "rgba(0, 0, 0, 0.2)",
    black05: "rgba(0, 0, 0, 0.5)",
    black07: "rgba(0, 0, 0, 0.7)",
    primary03: "rgba(99, 102, 241, 0.3)",
    primary04: "rgba(99, 102, 241, 0.4)",
    danger03: "rgba(239, 68, 68, 0.3)",
    danger04: "rgba(239, 68, 68, 0.4)",
    success02: "rgba(16, 185, 129, 0.2)",
  },
  shadows: {
    card: "0 8px 32px rgba(0, 0, 0, 0.2)",
    modal: "0 20px 60px rgba(0, 0, 0, 0.5)",
    buttonPrimary: "0 4px 12px rgba(99, 102, 241, 0.3)",
    buttonPrimaryHover: "0 6px 20px rgba(99, 102, 241, 0.4)",
    buttonDanger: "0 4px 12px rgba(239, 68, 68, 0.3)",
    buttonDangerHover: "0 6px 20px rgba(239, 68, 68, 0.4)",
  },
};
