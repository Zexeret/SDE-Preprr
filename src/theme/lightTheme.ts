import type { Theme } from "./Theme";

export const lightTheme: Theme = {
    background: "#E2E8F0",         // Main background (very light gray)
    surface: "#F1F5F9",            // Card/sidebar background (white)
    surfaceElevated: "#F8FAFC",    // Modals, dropdowns, hover states (light gray)
    border: "#E5E7EB",             // Subtle border
    text: {
      primary: "#232634",          // Main text (dark blue-gray)
      secondary: "#6B7280",        // Secondary text (muted gray)
    },
    primary: "#2563EB",            // Blue (buttons, highlights)
    primaryHover: "#1D4ED8",       // Darker blue for hover
    success: "#22C55E",            // Green (success)
    error: "#EF4444",              // Red (error)
    warning: "#F59E42",            // Orange (warning)
    overlay: "rgba(24, 26, 32, 0.1)", // Light overlay for modals
    shadow: "rgba(0, 0, 0, 0.08)",    // Soft shadow for depth
  };