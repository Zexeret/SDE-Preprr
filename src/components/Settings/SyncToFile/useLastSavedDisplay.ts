import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLastSavedAt } from "../../../store";
import { formatLastSaved } from "./helpers";

/**
 * Hook that provides a formatted "last saved" display string
 * Updates periodically to show relative time (e.g., "2 minutes ago")
 */
export const useLastSavedDisplay = (): string => {
  const lastSavedAt = useSelector(selectLastSavedAt);
  const [lastSavedDisplay, setLastSavedDisplay] = useState(() =>
    formatLastSaved(lastSavedAt)
  );

  // Update immediately when lastSavedAt changes
  useEffect(() => {
    setLastSavedDisplay(formatLastSaved(lastSavedAt));
  }, [lastSavedAt]);

  // Periodic update for relative time display
  useEffect(() => {
    const interval = setInterval(() => {
      setLastSavedDisplay(formatLastSaved(lastSavedAt));
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [lastSavedAt]);

  return lastSavedDisplay;
};
