import type { PreparationTask, Tag, Group, ExportData } from "../model";

export const STORAGE_KEYS = {
  PROBLEMS: "dsa-manager-problems",
  TASKS: "dsa-manager-tasks",
  CUSTOM_TAGS: "dsa-manager-custom-tags",
  CUSTOM_GROUPS: "dsa-manager-custom-groups",
  SELECTED_GROUP: "dsa-manager-selected-group",
} as const;

const DEFAULT_GROUP_ID = "dsa";

export const loadTasks = (): ReadonlyArray<PreparationTask> => {
  try {
    let data = localStorage.getItem(STORAGE_KEYS.TASKS);

    if (!data) {
      data = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
      if (data) {
        const oldProblems = JSON.parse(data);
        const migratedTasks = oldProblems.map((problem: any) => ({
          ...problem,
          groupId: problem.groupId || DEFAULT_GROUP_ID,
        }));
        saveTasks(migratedTasks);
        return migratedTasks;
      }
    }

    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading tasks:", error);
    return [];
  }
};

export const saveTasks = (tasks: ReadonlyArray<PreparationTask>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (error) {
    console.error("Error saving tasks:", error);
  }
};

export const loadCustomTags = (): ReadonlyArray<Tag> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_TAGS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading custom tags:", error);
    return [];
  }
};

export const saveCustomTags = (tags: ReadonlyArray<Tag>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TAGS, JSON.stringify(tags));
  } catch (error) {
    console.error("Error saving custom tags:", error);
  }
};

export const loadCustomGroups = (): ReadonlyArray<Group> => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_GROUPS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading custom groups:", error);
    return [];
  }
};

export const saveCustomGroups = (groups: ReadonlyArray<Group>): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_GROUPS, JSON.stringify(groups));
  } catch (error) {
    console.error("Error saving custom groups:", error);
  }
};

export const loadSelectedGroup = (): string => {
  try {
    return (
      localStorage.getItem(STORAGE_KEYS.SELECTED_GROUP) || DEFAULT_GROUP_ID
    );
  } catch (error) {
    console.error("Error loading selected group:", error);
    return DEFAULT_GROUP_ID;
  }
};

export const saveSelectedGroup = (groupId: string): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SELECTED_GROUP, groupId);
  } catch (error) {
    console.error("Error saving selected group:", error);
  }
};
