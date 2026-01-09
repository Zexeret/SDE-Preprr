import { useCallback } from "react";
import { useAppDispatch } from "../../store";
import { hydrateAppData } from "../../store";
import { importData } from "../../importExport";
import { getLogger } from "../../logger";
import { useDialog } from "../Dialog";
import type { AppState } from "../../model";

const log = getLogger("ui:import");

export interface ImportResult {
  readonly success: boolean;
  readonly data?: AppState;
  readonly error?: string;
}

/**
 * Parse and validate import file without applying changes
 */
const parseImportFile = async (file: File): Promise<ImportResult> => {
  try {
    const data = await importData(file);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};

/**
 * Build confirmation message for import
 */
const buildConfirmMessage = (data: AppState): string => {
  return `This will import:
• ${data.tasks.length} tasks
• ${data.customTags?.length || 0} custom tags
• ${data.customGroups?.length || 0} custom groups

This will replace your current data. Continue?`;
};

/**
 * Build success message for import
 */
const buildSuccessMessage = (data: AppState): string => {
  return `Successfully imported ${data.tasks.length} tasks, ${data.customTags.length} custom tags, ${data.customGroups.length} custom groups, and theme preference!`;
};

/**
 * Hook for importing data from file
 * Separates concerns: parsing, confirmation, hydration
 */
export const useImportData = () => {
  const dispatch = useAppDispatch();
  const { alert, confirm } = useDialog();

  const handleImport = useCallback(
    async (file: File): Promise<boolean> => {
      log.info("Starting import from file: {}", file.name);

      // Step 1: Parse and validate
      const result = await parseImportFile(file);

      if (!result.success || !result.data) {
        log.error("Import failed: {}", result.error);
        await alert({
          title: "Import Failed",
          message: result.error ?? "Unknown error occurred",
          type: "error",
        });
        return false;
      }

      const data = result.data;
      log.debug(
        "Import parsed - tasks: {}, tags: {}, groups: {}",
        data.tasks.length,
        data.customTags?.length || 0,
        data.customGroups?.length || 0
      );

      // Step 2: User confirmation
      const confirmed = await confirm({
        title: "Import Data",
        message: buildConfirmMessage(data),
        confirmText: "Import",
        cancelText: "Cancel",
        type: "warning",
      });

      if (!confirmed) {
        log.debug("User cancelled import");
        return false;
      }

      // Step 3: Apply changes
      log.info("User confirmed import, hydrating app data");
      await dispatch(hydrateAppData(data));

      // Step 4: Success feedback
      await alert({
        title: "Import Successful",
        message: buildSuccessMessage(data),
        type: "success",
      });
      log.info("Import completed successfully");

      return true;
    },
    [alert, confirm, dispatch]
  );

  return handleImport;
};
