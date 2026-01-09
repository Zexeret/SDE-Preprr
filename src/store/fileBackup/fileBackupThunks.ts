import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  connectToFile as connectToFileService,
  readFromFileHandle,
  requestFilePermission,
  saveToFile,
  verifyStoredHandle,
} from "../../fileBackup";
import { importData } from "../../importExport";
import type { RootState } from "../store";
import { buildAppStateForExport, hydrateAppData } from "../derived";
import {
  connectFile,
  setHasPermission,
  setIsLoading,
  setIsSaving,
  setLastSavedAt,
} from "./fileBackupSlice";
import { getLogger } from "../../logger";

const log = getLogger("file:thunks");

/**
 * Thunk to open an existing file using the file picker and load its data
 */
export const openFileThunk = createAsyncThunk<
  void,
  void,
  { readonly state: RootState; readonly rejectValue: string }
>("fileBackup/openFile", async (_, { dispatch, rejectWithValue }) => {
  log.info("Opening file picker to select existing file");
  try {
    const result = await connectToFileService("open");
    if (result) {
      log.debug("File selected: {}", result.fileName);
      dispatch(setIsLoading(true));
      try {
        log.debug("Reading file handle...");
        // Read and import the file data
        const file = await readFromFileHandle(result.handle);
        log.debug("File read, importing data...");
        const appState = await importData(file);

        log.debug("Hydrating app state with imported data");
        // Hydrate the app state with the imported data
        await dispatch(hydrateAppData(appState));

        // Update connection state
        dispatch(
          connectFile({
            fileName: result.fileName,
            hasPermission: true,
          })
        );
        log.info("File opened and loaded successfully: {}", result.fileName);
      } finally {
        dispatch(setIsLoading(false));
      }
    } else {
      log.debug("File picker cancelled by user");
    }
  } catch (error) {
    log.error("Failed to open file: {}", error);
    dispatch(setIsLoading(false));
    return rejectWithValue(
      error instanceof Error
        ? error.message
        : "Failed to connect to file. Please try again."
    );
  }
});

/**
 * Thunk to create a new file using the file picker and save initial data
 */
export const createFileThunk = createAsyncThunk<
  void,
  void,
  { readonly state: RootState; readonly rejectValue: string }
>(
  "fileBackup/createFile",
  async (_, { dispatch, getState, rejectWithValue }) => {
    log.info("Opening file picker to create new file");
    try {
      const result = await connectToFileService("create");
      if (result) {
        log.debug("File created: {}", result.fileName);
        dispatch(
          connectFile({
            fileName: result.fileName,
            hasPermission: true,
          })
        );

        // Save initial data to the new file
        log.debug("Verifying stored handle...");
        const { handle } = await verifyStoredHandle();
        if (handle) {
          dispatch(setIsSaving(true));
          try {
            log.debug("Building app state for export...");
            const appState = buildAppStateForExport(getState());
            log.debug("Saving initial data to file...");
            const savedAt = await saveToFile(handle, appState);
            dispatch(setLastSavedAt(savedAt));
            log.info(
              "File created and initial data saved: {}",
              result.fileName
            );
          } finally {
            dispatch(setIsSaving(false));
          }
        }
      } else {
        log.debug("File picker cancelled by user");
      }
    } catch (error) {
      log.error("Failed to create file: {}", error);
      return rejectWithValue("Failed to create file. Please try again.");
    }
  }
);

/**
 * Thunk to request file permission from the user
 */
export const requestPermissionThunk = createAsyncThunk<
  void,
  void,
  { readonly state: RootState; readonly rejectValue: string }
>("fileBackup/requestPermission", async (_, { dispatch, rejectWithValue }) => {
  log.info("Requesting file permission from user");
  try {
    const { handle } = await verifyStoredHandle();
    if (handle) {
      log.debug("Handle found, requesting permission...");
      const granted = await requestFilePermission(handle);
      dispatch(setHasPermission(granted));
      log.info("Permission request result: {}", granted ? "granted" : "denied");
    } else {
      log.warn("No stored handle found for permission request");
    }
  } catch (error) {
    log.error("Failed to request permission: {}", error);
    return rejectWithValue(
      "Failed to request file permission. Please try again."
    );
  }
});
