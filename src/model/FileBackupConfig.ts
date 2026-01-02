export type SaveFrequency = "everyChange" | "periodic";

export interface FileBackupConfig {
  readonly autoSaveEnabled: boolean;
  readonly saveFrequency: SaveFrequency;
  readonly periodicIntervalMinutes: number;
  readonly lastSavedAt: number | null;
  readonly fileName: string | null;
}

export const DEFAULT_FILE_BACKUP_CONFIG: FileBackupConfig = {
  autoSaveEnabled: false,
  saveFrequency: "everyChange",
  periodicIntervalMinutes: 5,
  lastSavedAt: null,
  fileName: null,
};
