import type { Theme } from "./Theme";

export const darkTheme: Theme = {
    background: "#0D0F14",         // Main background (very dark blue-gray)
    surface: "#111319",            // Card/sidebar background (dark blue-gray)
    surfaceElevated: "#232634",    // Modals, dropdowns, hover states (slightly lighter)
    border: "#25272f",             // Subtle border
    text: {
      primary: "#F4F6FB",          // Main text (almost white)
      secondary: "#A3A8B8",        // Secondary text (muted blue-gray)
    },
    primary: "#0061ff",            // Blue (buttons, highlights)
    primaryHover: "#2a7bff",       // Lighter blue for hover
    success: "#22C55E",            // Green (success)
    error: "#EF4444",              // Red (error)
    warning: "#F59E42",            // Orange (warning)
    overlay: "rgba(24, 26, 32, 0.7)", // Overlay for modals
    shadow: "rgba(0, 0, 0, 0.5)",     // Stronger shadow for depth
  };