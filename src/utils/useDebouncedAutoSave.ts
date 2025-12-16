import { useEffect, useRef } from "react";
import type { PreparationTask, Tag, Group, AppState, ThemeName } from "../model";
import { CURRENT_MODEL_VERSION } from "../model";
import { saveAppState } from "./storage";

/**
 * Custom hook for debounced auto-save to localStorage
 * Saves the app state after 1 second of inactivity
 */
export const useDebouncedAutoSave = (
  tasks: ReadonlyArray<PreparationTask>,
  customTags: ReadonlyArray<Tag>,
  customGroups: ReadonlyArray<Group>,
  themeName: ThemeName,
  debounceMs: number = 1000
) => {
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear previous timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    // Set new timeout to save after debounce period
    saveTimeoutRef.current = setTimeout(() => {
      const appState: AppState = {
        version: CURRENT_MODEL_VERSION,
        tasks,
        customTags,
        customGroups,
        selectedTheme: themeName,
        exportedAt: Date.now(),
      };
      saveAppState(appState);
      console.log("Auto-saved app state");
    }, debounceMs);

    // Cleanup on unmount or when dependencies change
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [tasks, customTags, customGroups, themeName, debounceMs]);
};
