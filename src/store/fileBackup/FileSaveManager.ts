/* eslint-disable functional/prefer-readonly-type */
import { saveToFile, verifyStoredHandle } from "../../importExport";
import { buildAppStateForExport } from "../derived/selectAppStateForExport";
import {
  selectIsAutoSaveEnabled,
  selectSaveFrequency,
  selectPeriodicInterval,
  selectIsFileConnected,
} from "./fileBackupSelectors";
import {
  setHasPermission,
  setIsSaving,
  setLastSavedAt,
} from "./fileBackupSlice";
import type { RootState, AppDispatch } from "../store";

/**
 * Singleton class to manage file save operations
 * Encapsulates periodic save interval and file save logic
 * Handles concurrent save requests by queuing them
 */
class FileSaveManager {
  private dispatch: AppDispatch;
  private getState: () => RootState;
  private periodicSaveInterval: ReturnType<typeof setInterval> | null = null;
  private fileSaveTimeout: ReturnType<typeof setTimeout> | null = null;
  private isSaveInProgress: boolean = false;
  private pendingSave: boolean = false;

  constructor(dispatch: AppDispatch, getState: () => RootState) {
    this.dispatch = dispatch;
    this.getState = getState;
  }

  /**
   * Performs the actual file save operation
   * Handles concurrent requests by queuing - if a save is in progress,
   * the request is queued and executed after the current save completes
   */
  async performFileSaveNow(): Promise<void> {
    // If a save is already in progress, queue this request
    if (this.isSaveInProgress) {
      console.log("File backup: Save in progress, queuing request");
      this.pendingSave = true;
      return;
    }

    this.isSaveInProgress = true;

    try {
      const { handle } = await verifyStoredHandle();
      if (!handle) {
        console.log("File backup: No handle found, skipping save");
        return;
      }

      this.dispatch(setIsSaving(true));
      const state = this.getState();
      const appState = buildAppStateForExport(state);
      const savedAt = await saveToFile(handle, appState);
      this.dispatch(setLastSavedAt(savedAt));
      this.dispatch(setHasPermission(true));
      console.log("File backup: Saved to file successfully");
    } catch (error) {
      console.error("File backup: Error saving to file:", error);
      // If permission was denied, update state
      if (
        error instanceof Error &&
        error.message.includes("Permission denied")
      ) {
        this.dispatch(setHasPermission(false));
      }
    } finally {
      this.dispatch(setIsSaving(false));
      this.isSaveInProgress = false;

      // If there was a pending save request, execute it now
      if (this.pendingSave) {
        this.pendingSave = false;
        console.log("File backup: Processing queued save request");
        void this.performFileSaveNow();
      }
    }
  }

  /**
   * Saves to file if enabled with debounce (for everyChange mode)
   * Called by registerSaveDataListener after IndexedDB save
   */
  saveToFileIfEnabled(): void {
    // Clear any existing file save timeout
    if (this.fileSaveTimeout) {
      clearTimeout(this.fileSaveTimeout);
    }

    const state = this.getState();
    const isConnected = selectIsFileConnected(state);
    const autoSaveEnabled = selectIsAutoSaveEnabled(state);
    const saveFrequency = selectSaveFrequency(state);

    // Only save if connected, auto-save enabled, and frequency is "everyChange"
    if (!isConnected || !autoSaveEnabled || saveFrequency !== "everyChange") {
      return;
    }

    // Additional debounce for file saves (1 second after IndexedDB save)
    this.fileSaveTimeout = setTimeout(() => {
      void this.performFileSaveNow();
    }, 1000);
  }

  /**
   * Stops the periodic file save interval
   */
  stopPeriodicSave(): void {
    if (this.periodicSaveInterval) {
      clearInterval(this.periodicSaveInterval);
      this.periodicSaveInterval = null;
      console.log("File backup: Stopped periodic save");
    }
  }

  /**
   * Starts the periodic file save interval
   */
  startPeriodicSave(intervalMinutes: number): void {
    this.stopPeriodicSave();

    const intervalMs = intervalMinutes * 60 * 1000;
    this.periodicSaveInterval = setInterval(() => {
      const currentState = this.getState();
      const isConnected = selectIsFileConnected(currentState);
      const autoSaveEnabled = selectIsAutoSaveEnabled(currentState);
      const saveFrequency = selectSaveFrequency(currentState);

      if (!isConnected || !autoSaveEnabled || saveFrequency !== "periodic") {
        this.stopPeriodicSave();
        return;
      }

      void this.performFileSaveNow();
    }, intervalMs);

    console.log(
      `File backup: Started periodic save every ${intervalMinutes} minutes`
    );
  }

  /**
   * Updates periodic save based on current state
   * Starts or stops periodic save as needed
   */
  updatePeriodicSave(): void {
    const currentState = this.getState();
    const isConnected = selectIsFileConnected(currentState);
    const autoSaveEnabled = selectIsAutoSaveEnabled(currentState);
    const saveFrequency = selectSaveFrequency(currentState);
    const periodicInterval = selectPeriodicInterval(currentState);

    if (isConnected && autoSaveEnabled && saveFrequency === "periodic") {
      this.startPeriodicSave(periodicInterval);
    } else {
      this.stopPeriodicSave();
    }
  }
}

// Singleton instance
let instance: FileSaveManager | null = null;

export const createFileSaveManager = (
  dispatch: AppDispatch,
  getState: () => RootState
): FileSaveManager => {
  if (!instance) {
    instance = new FileSaveManager(dispatch, getState);
  }
  return instance;
};

export const getFileSaveManager = (): FileSaveManager => {
  if (!instance) {
    throw new Error(
      "FileSaveManager not initialized. Call createFileSaveManager first."
    );
  }
  return instance;
};
