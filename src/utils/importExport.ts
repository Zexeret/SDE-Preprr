import type { PreparationTask, Tag, Group, ExportData } from "../model";

const APP_VERSION = "1.0.0";
const DEFAULT_GROUP_ID = "dsa";

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
        const tasks = data.tasks || data.problems || [];

        if (!Array.isArray(tasks)) {
          throw new Error("Invalid file format");
        }

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
