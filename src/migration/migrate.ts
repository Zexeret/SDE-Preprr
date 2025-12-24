import { CURRENT_MODEL_VERSION, MigrationError, type AppState } from "../model";
import { migrateV1toV2 } from "./v1";
import type { AppStateV1 } from "./v1/types";
import { validateLatestAppState } from "./validateLatestAppState";
import { validateRawAppState } from "./validateRawAppState";

type AnyLegacyState = AppStateV1 | AppState;

const migrations: Record<number, (s: any) => any> = {
  1: migrateV1toV2,
};

export const migrate = (input: unknown): AppState => {
  validateRawAppState(input);

  let state = input as AnyLegacyState;

  while (state.version < CURRENT_MODEL_VERSION) {
    console.log(`Migrating the data from ${state.version}`);

    const migrator = migrations[state.version];
    if (!migrator) {
      throw new MigrationError(
        `No migration found for version ${state.version}`
      );
    }
    state = migrator(state);
  }

  validateLatestAppState(state);
  return state;
};
