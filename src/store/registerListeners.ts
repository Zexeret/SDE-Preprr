import {
  registerNormalizeTaskListener,
  registerSaveDataListener,
} from "./derived";
import { registerFileBackupListener } from "./fileBackup";
import { registerUIListeners } from "./ui";

export const registerListeners = () => {
  registerUIListeners();
  registerSaveDataListener();
  registerNormalizeTaskListener();
  registerFileBackupListener();
};
