import {
  registerNormalizeTaskListener,
  registerSaveDataListener,
} from "./derived";
import { registerUIListeners } from "./ui";

export const registerListeners = () => {
  registerUIListeners();
  registerSaveDataListener();
  registerNormalizeTaskListener();
};
