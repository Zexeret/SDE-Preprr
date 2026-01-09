import { CURRENT_MODEL_VERSION, MigrationError, type AppState } from "../model";
import { migrateV1toV2 } from "./v1";
import type { AppStateV1 } from "./v1/types";
import { validateLatestAppState } from "./validateLatestAppState";
import { validateRawAppState } from "./validateRawAppState";
import { getLogger } from "../logger";

const log = getLogger("migration");

type AnyLegacyState = AppStateV1 | AppState;

const migrations: Record<number, (s: any) => any> = {
  1: migrateV1toV2,
};

export const migrate = (input: unknown): AppState => {
  log.debug("migrate() called, validating raw state...");
  validateRawAppState(input);

  let state = input as AnyLegacyState;
  log.debug(
    "Current state version: {}, target version: {}",
    state.version,
    CURRENT_MODEL_VERSION
  );

  while (state.version < CURRENT_MODEL_VERSION) {
    log.info(
      "Migrating data from version {} to {}",
      state.version,
      state.version + 1
    );

    const migrator = migrations[state.version];
    if (!migrator) {
      log.error("No migration found for version {}", state.version);
      throw new MigrationError(
        `No migration found for version ${state.version}`
      );
    }
    state = migrator(state);
    log.debug("Migration to version {} complete", state.version);
  }

  log.debug("Validating final app state...");
  validateLatestAppState(state);
  log.info("Migration complete, now at version {}", state.version);
  return state;
};
