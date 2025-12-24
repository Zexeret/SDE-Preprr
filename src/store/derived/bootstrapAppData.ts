import { createAsyncThunk } from "@reduxjs/toolkit";
import { loadAppState } from "../../utils";
import { hydrateAppData } from "./hydrateAppData";

export const bootstrapAppData = createAsyncThunk(
  "app/bootstrap",
  async (_, { dispatch }) => {
    const localAppData = loadAppState();
    if (!localAppData) return;

    // Add migration function here for converting old versioned data to new one.
    await dispatch(hydrateAppData(localAppData));
  }
);
