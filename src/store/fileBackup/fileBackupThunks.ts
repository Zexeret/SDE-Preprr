import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  connectToFile as connectToFileService,
  importData,
  readFromFileHandle,
  requestFilePermission,
  saveToFile,
  verifyStoredHandle,
} from "../../importExport";
import type { RootState } from "../store";
import { buildAppStateForExport, hydrateAppData } from "../derived";
import {
  connectFile,
  setHasPermission,
  setIsLoading,
  setIsSaving,
  setLastSavedAt,
} from "./fileBackupSlice";

/**
 * Thunk to open an existing file using the file picker and load its data
 */
export const openFileThunk = createAsyncThunk<
  void,
  void,
  { readonly state: RootState; readonly rejectValue: string }
>("fileBackup/openFile", async (_, { dispatch, rejectWithValue }) => {
  try {
    const result = await connectToFileService("open");
    if (result) {
      dispatch(setIsLoading(true));
      try {
        // Read and import the file data
        const file = await readFromFileHandle(result.handle);
        const appState = await importData(file);

        // Hydrate the app state with the imported data
        await dispatch(hydrateAppData(appState));

        // Update connection state
        dispatch(
          connectFile({
            fileName: result.fileName,
            hasPermission: true,
          })
        );
      } finally {
        dispatch(setIsLoading(false));
      }
    }
  } catch (error) {
    console.error("Failed to open file:", error);
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
    try {
      const result = await connectToFileService("create");
      if (result) {
        dispatch(
          connectFile({
            fileName: result.fileName,
            hasPermission: true,
          })
        );

        // Save initial data to the new file
        const { handle } = await verifyStoredHandle();
        if (handle) {
          dispatch(setIsSaving(true));
          try {
            const appState = buildAppStateForExport(getState());
            const savedAt = await saveToFile(handle, appState);
            dispatch(setLastSavedAt(savedAt));
          } finally {
            dispatch(setIsSaving(false));
          }
        }
      }
    } catch (error) {
      console.error("Failed to create file:", error);
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
  try {
    const { handle } = await verifyStoredHandle();
    if (handle) {
      const granted = await requestFilePermission(handle);
      dispatch(setHasPermission(granted));
    }
  } catch (error) {
    console.error("Failed to request permission:", error);
    return rejectWithValue(
      "Failed to request file permission. Please try again."
    );
  }
});
