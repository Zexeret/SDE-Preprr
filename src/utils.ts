import type { Problem, Tag, ExportData } from "./types";
import { STORAGE_KEYS, APP_VERSION } from "./constants";

export const loadProblems = (): Problem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading problems:", error);
    return [];
  }
};

export const saveProblems = (problems: Problem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(problems));
  } catch (error) {
    console.error("Error saving problems:", error);
  }
};

export const loadCustomTags = (): Tag[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CUSTOM_TAGS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error loading custom tags:", error);
    return [];
  }
};

export const saveCustomTags = (tags: Tag[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TAGS, JSON.stringify(tags));
  } catch (error) {
    console.error("Error saving custom tags:", error);
  }
};

export const exportData = (problems: Problem[], customTags: Tag[]): void => {
  const data: ExportData = {
    version: APP_VERSION,
    problems,
    customTags,
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

        if (!data.problems || !Array.isArray(data.problems)) {
          throw new Error("Invalid file format");
        }

        resolve(data);
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
