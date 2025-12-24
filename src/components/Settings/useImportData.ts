import { useCallback } from "react";
import { useAppDispatch } from "../../store";
import { hydrateAppData } from "../../store";
import { importData } from "../../importExport";

export const useImportData = () => {
  const dispatch = useAppDispatch();

  const handleImport = useCallback(
    async (file: File): Promise<boolean> => {
      return new Promise<boolean>((resolve, reject) => {
        importData(file)
          .then((data) => {
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
              dispatch(hydrateAppData(data));
            }

            alert(
              `Successfully imported ${data.tasks.length} tasks, ${data.customTags.length} custom tags, ${data.customGroups.length} custom groups, and theme preference!`
            );
            resolve(true);
          })
          .catch((error) => {
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
