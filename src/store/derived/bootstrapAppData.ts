import { createAsyncThunk } from "@reduxjs/toolkit";
import { hydrateAppData } from "./hydrateAppData";
import { loadFromIndexedDB } from "../../importExport";

export const bootstrapAppData = createAsyncThunk(
  "app/bootstrap",
  async (_, { dispatch }) => {
    const localAppData = await loadFromIndexedDB();
    if (!localAppData) return;

    // Add migration function here for converting old versioned data to new one.
    await dispatch(hydrateAppData(localAppData));
  }
);
