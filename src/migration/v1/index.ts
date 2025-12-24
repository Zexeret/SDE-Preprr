import type { AppState } from "../../model";
import type { AppStateV1 } from "./types";

export const migrateV1toV2 = (state: AppStateV1): AppState => {
  return {
    ...state,
    tasks: state.tasks.map((task) => {
      return {
        ...task,
        postCompletionNotes: "",
      };
    }),
    version: 2,
  };
};