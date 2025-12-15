import type { PreparationTask, Tag, Group } from "../model";

const TASKS_STORAGE_KEY = "dsa-manager-tasks";
const CUSTOM_TAGS_STORAGE_KEY = "dsa-manager-custom-tags";
const CUSTOM_GROUPS_STORAGE_KEY = "dsa-manager-custom-groups";
const SELECTED_GROUP_STORAGE_KEY = "dsa-manager-selected-group";

export const loadTasks = (): ReadonlyArray<PreparationTask> => {
  try {
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks: ReadonlyArray<PreparationTask>): void => {
  try {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error("Failed to save tasks:", error);
  }
};

export const loadCustomTags = (): ReadonlyArray<Tag> => {
  try {
    const stored = localStorage.getItem(CUSTOM_TAGS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCustomTags = (tags: ReadonlyArray<Tag>): void => {
  try {
    localStorage.setItem(CUSTOM_TAGS_STORAGE_KEY, JSON.stringify(tags));
  } catch (error) {
    console.error("Failed to save custom tags:", error);
  }
};

export const loadCustomGroups = (): ReadonlyArray<Group> => {
  try {
    const stored = localStorage.getItem(CUSTOM_GROUPS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveCustomGroups = (groups: ReadonlyArray<Group>): void => {
  try {
    localStorage.setItem(CUSTOM_GROUPS_STORAGE_KEY, JSON.stringify(groups));
  } catch (error) {
    console.error("Failed to save custom groups:", error);
  }
};

export const loadSelectedGroup = (): string | null => {
  try {
    const stored = localStorage.getItem(SELECTED_GROUP_STORAGE_KEY);
    return stored || "dsa";
  } catch {
    return "dsa";
  }
};

export const saveSelectedGroup = (groupId: string | null): void => {
  try {
    if (groupId === null) {
      localStorage.removeItem(SELECTED_GROUP_STORAGE_KEY);
    } else {
      localStorage.setItem(SELECTED_GROUP_STORAGE_KEY, groupId);
    }
  } catch (error) {
    console.error("Failed to save selected group:", error);
  }
};
