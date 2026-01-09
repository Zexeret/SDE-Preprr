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
import { getLogger } from "../../logger";

const log = getLogger("file:save-manager");

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
    log.debug("performFileSaveNow() called");

    // If a save is already in progress, queue this request
    if (this.isSaveInProgress) {
      log.debug("Save already in progress, queuing request");
      this.pendingSave = true;
      return;
    }

    this.isSaveInProgress = true;
    log.debug("Starting file save operation");

    try {
      log.debug("Verifying stored file handle...");
      const { handle } = await verifyStoredHandle();
      if (!handle) {
        log.warn("No file handle found, skipping save");
        return;
      }

      log.debug("File handle verified, building app state for export");
      this.dispatch(setIsSaving(true));
      const state = this.getState();
      const appState = buildAppStateForExport(state);

      log.debug("Saving to file...");
      const savedAt = await saveToFile(handle, appState);
      this.dispatch(setLastSavedAt(savedAt));
      this.dispatch(setHasPermission(true));
      log.info("Saved to file successfully at {}", savedAt);
    } catch (error) {
      log.error("Error saving to file: {}", error);
      // If permission was denied, update state
      if (
        error instanceof Error &&
        error.message.includes("Permission denied")
      ) {
        log.warn("Permission denied, updating state");
        this.dispatch(setHasPermission(false));
      }
    } finally {
      this.dispatch(setIsSaving(false));
      this.isSaveInProgress = false;
      log.debug("File save operation completed");

      // If there was a pending save request, execute it now
      if (this.pendingSave) {
        this.pendingSave = false;
        log.debug("Processing queued save request");
        void this.performFileSaveNow();
      }
    }
  }

  /**
   * Saves to file if enabled with debounce (for everyChange mode)
   * Called by registerSaveDataListener after IndexedDB save
   */
  saveToFileIfEnabled(): void {
    log.debug("saveToFileIfEnabled() called");

    // Clear any existing file save timeout
    if (this.fileSaveTimeout) {
      log.debug("Clearing existing file save timeout");
      clearTimeout(this.fileSaveTimeout);
    }

    const state = this.getState();
    const isConnected = selectIsFileConnected(state);
    const autoSaveEnabled = selectIsAutoSaveEnabled(state);
    const saveFrequency = selectSaveFrequency(state);

    log.debug(
      "File save check - connected: {}, autoSave: {}, frequency: {}",
      isConnected,
      autoSaveEnabled,
      saveFrequency
    );

    // Only save if connected, auto-save enabled, and frequency is "everyChange"
    if (!isConnected || !autoSaveEnabled || saveFrequency !== "everyChange") {
      log.debug("Skipping file save - conditions not met");
      return;
    }

    // Additional debounce for file saves (1 second after IndexedDB save)
    log.debug("Scheduling file save in 1 second");
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
      log.info("Stopped periodic save");
    }
  }

  /**
   * Starts the periodic file save interval
   */
  startPeriodicSave(intervalMinutes: number): void {
    log.debug(
      "startPeriodicSave() called with interval: {} minutes",
      intervalMinutes
    );
    this.stopPeriodicSave();

    const intervalMs = intervalMinutes * 60 * 1000;
    log.debug("Setting up interval of {} ms", intervalMs);

    this.periodicSaveInterval = setInterval(() => {
      log.debug("Periodic save interval triggered");
      const currentState = this.getState();
      const isConnected = selectIsFileConnected(currentState);
      const autoSaveEnabled = selectIsAutoSaveEnabled(currentState);
      const saveFrequency = selectSaveFrequency(currentState);

      log.debug(
        "Periodic check - connected: {}, autoSave: {}, frequency: {}",
        isConnected,
        autoSaveEnabled,
        saveFrequency
      );

      if (!isConnected || !autoSaveEnabled || saveFrequency !== "periodic") {
        log.debug("Conditions no longer met, stopping periodic save");
        this.stopPeriodicSave();
        return;
      }

      void this.performFileSaveNow();
    }, intervalMs);

    log.info("Started periodic save every {} minutes", intervalMinutes);
  }

  /**
   * Updates periodic save based on current state
   * Starts or stops periodic save as needed
   */
  updatePeriodicSave(): void {
    log.debug("updatePeriodicSave() called");
    const currentState = this.getState();
    const isConnected = selectIsFileConnected(currentState);
    const autoSaveEnabled = selectIsAutoSaveEnabled(currentState);
    const saveFrequency = selectSaveFrequency(currentState);
    const periodicInterval = selectPeriodicInterval(currentState);

    log.debug(
      "Update periodic - connected: {}, autoSave: {}, frequency: {}, interval: {}",
      isConnected,
      autoSaveEnabled,
      saveFrequency,
      periodicInterval
    );

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
    log.debug("Creating new FileSaveManager instance");
    instance = new FileSaveManager(dispatch, getState);
  }
  return instance;
};

export const getFileSaveManager = (): FileSaveManager => {
  if (!instance) {
    log.error("FileSaveManager not initialized");
    throw new Error(
      "FileSaveManager not initialized. Call createFileSaveManager first."
    );
  }
  return instance;
};
