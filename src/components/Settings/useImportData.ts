import { useCallback } from "react";
import { useAppDispatch } from "../../store";
import { hydrateAppData } from "../../store";
import { importData } from "../../importExport";
import { getLogger } from "../../logger";

const log = getLogger("ui:import");

export const useImportData = () => {
  const dispatch = useAppDispatch();

  const handleImport = useCallback(
    async (file: File): Promise<boolean> => {
      log.info("Starting import from file: {}", file.name);
      return new Promise<boolean>((resolve, reject) => {
        importData(file)
          .then((data) => {
            log.debug(
              "Import parsed - tasks: {}, tags: {}, groups: {}",
              data.tasks.length,
              data.customTags?.length || 0,
              data.customGroups?.length || 0
            );

            // Update all state from imported data
            if (
              window.confirm(
                `This will import ${data.tasks.length} tasks, ${
                  data.customTags?.length || 0
                } custom tags, and ${
                  data.customGroups?.length || 0
                } custom groups. Continue?`
              )
            ) {
              log.info("User confirmed import, hydrating app data");
              dispatch(hydrateAppData(data));
            } else {
              log.debug("User cancelled import");
            }

            alert(
              `Successfully imported ${data.tasks.length} tasks, ${data.customTags.length} custom tags, ${data.customGroups.length} custom groups, and theme preference!`
            );
            log.info("Import completed successfully");
            resolve(true);
          })
          .catch((error) => {
            log.error("Import failed: {}", error);
            alert(
              `Import failed: ${
                error instanceof Error ? error.message : "Unknown error"
              }`
            );
            reject(false);
          });
      });
    },
    [dispatch]
  );

  return handleImport;
};
