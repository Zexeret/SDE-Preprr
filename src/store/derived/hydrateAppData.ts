import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  type AppState,
  DIFFICULTY_TAGS,
  DSA_SPECIFIC_TAGS,
  PREDEFINED_GROUPS,
} from "../../model";
import { normalizeTaskOrder, setAllTasks } from "../tasks";
import { setAllTags } from "../tags";
import { setAllGroups } from "../groups";
import { setThemeName } from "../ui";

export const hydrateAppData = createAsyncThunk(
  "app/hydrateData",
  async (data: AppState, { dispatch }) => {
    dispatch(setAllTasks(data.tasks));
    dispatch(normalizeTaskOrder());
    //Hydrate tags with predefined tags.
    dispatch(
      setAllTags([...DIFFICULTY_TAGS, ...DSA_SPECIFIC_TAGS, ...data.customTags])
    );
    // Hydrate groups with predefined groups.
    dispatch(setAllGroups([...PREDEFINED_GROUPS, ...data.customGroups]));
    dispatch(setThemeName(data.selectedTheme));
  }
);