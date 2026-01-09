import { useCallback } from "react";
import { useSelector } from "react-redux";
import {
  selectAllTasks,
  selectCustomGroups,
  selectCustomTags,
  selectThemename,
} from "../../store";
import { exportData } from "../../importExport";
import { getLogger } from "../../logger";
import { useDialog } from "../Dialog";

const log = getLogger("ui:export");

export const useExportData = () => {
  const tasks = useSelector(selectAllTasks);
  const customTags = useSelector(selectCustomTags);
  const customGroups = useSelector(selectCustomGroups);
  const themeName = useSelector(selectThemename);
  const { alert } = useDialog();

  const handleExport = useCallback(async () => {
    log.info(
      "Starting export - tasks: {}, tags: {}, groups: {}",
      tasks.length,
      customTags.length,
      customGroups.length
    );
    try {
      exportData(tasks, customTags, customGroups, themeName, {
        compress: true,
      });
      log.info("Export initiated successfully");
    } catch (error) {
      log.error("Export failed: {}", error);
      await alert({
        title: "Export Failed",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        type: "error",
      });
    }
  }, [alert, customGroups, customTags, tasks, themeName]);

  return handleExport;
};
