import type { PreparationTask, Tag, Group, ExportData } from "./types";
import { STORAGE_KEYS, APP_VERSION, DEFAULT_GROUP_ID } from "./constants";

export const loadTasks = (): ReadonlyArray<PreparationTask> => {
  try {
    // Try loading from new key first
    let data = localStorage.getItem(STORAGE_KEYS.TASKS);

    // If not found, try migrating from old problems key
    if (!data) {
      data = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
      if (data) {
        const oldProblems = JSON.parse(data);
        // Migrate old problems to new format with default groupId
        const migratedTasks = oldProblems.map((problem: any) => ({
          ...problem,
          groupId: problem.groupId || DEFAULT_GROUP_ID,
        }));
        // Save migrated data
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

export const exportData = (
  tasks: ReadonlyArray<PreparationTask>,
  customTags: ReadonlyArray<Tag>,
  customGroups: ReadonlyArray<Group>
): void => {
  const data: ExportData = {
    version: APP_VERSION,
    tasks,
    customTags,
    customGroups,
    exportedAt: Date.now(),
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `dsa-manager-backup-${
    new Date().toISOString().split("T")[0]
  }.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importData = (file: File): Promise<ExportData> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string) as ExportData;

        // Support both old (problems) and new (tasks) format
        const tasks = data.tasks || data.problems || [];

        if (!Array.isArray(tasks)) {
          throw new Error("Invalid file format");
        }

        // Ensure all tasks have groupId
        const tasksWithGroup = tasks.map((task: any) => ({
          ...task,
          groupId: task.groupId || DEFAULT_GROUP_ID,
        }));

        resolve({
          ...data,
          tasks: tasksWithGroup,
          customGroups: data.customGroups || [],
        });
      } catch (error) {
        reject(
          new Error(
            "Failed to parse file. Please ensure it's a valid DSA Manager backup file."
          )
        );
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read file"));
    };

    reader.readAsText(file);
  });
};

export const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

export const stripHtmlTags = (html: string): string => {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};
