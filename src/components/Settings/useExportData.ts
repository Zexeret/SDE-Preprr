import { useCallback } from "react";
import { exportData } from "../../utils";
import { useSelector } from "react-redux";
import {
  selectAllTasks,
  selectCustomGroups,
  selectCustomTags,
  selectThemename,
} from "../../store";

export const useExportData = () => {
  const tasks = useSelector(selectAllTasks);
  const customTags = useSelector(selectCustomTags);
  const customGroups = useSelector(selectCustomGroups);
  const themeName = useSelector(selectThemename);

  const handleExport = useCallback(() => {
    try {
      exportData(tasks, customTags, customGroups, themeName, {
        compress: true,
      });
    } catch (error) {
      alert(
        `Export failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  }, [customGroups, customTags, tasks, themeName]);

  return handleExport;
};
