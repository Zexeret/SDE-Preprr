import React, {
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import {
  type PreparationTask,
  type Tag,
  type Group,
  type ThemeName,
  PredefinedGroupId,
} from "../model";
import {
  TaskUtilityContext,
  type TaskUtilityContextType,
} from "./useTaskUtility";
import { exportData, importData, loadAppState } from "../utils";
import { useDebouncedAutoSave } from "../utils";

export const TaskUtilityProvider: React.FC<{
  readonly children: ReactNode;
  readonly setTheme: (themeName: ThemeName) => void;
  readonly themeName: ThemeName;
}> = ({ children, setTheme, themeName }) => {
  const [tasks, setTasksState] = useState<ReadonlyArray<PreparationTask>>([]);
  const [customTags, setCustomTagsState] = useState<ReadonlyArray<Tag>>([]);
  const [customGroups, setCustomGroupsState] = useState<ReadonlyArray<Group>>(
    []
  );
  const [selectedGroupId, setSelectedGroupIdState] = useState<string | null>(
    PredefinedGroupId.DSA
  );

  // Load app state on mount
  useEffect(() => {
    const appState = loadAppState();
    setTasksState(appState.tasks);
    setCustomTagsState(appState.customTags);
    setCustomGroupsState(appState.customGroups);
    setTheme(appState.selectedTheme);
    document.documentElement.setAttribute("data-theme", appState.selectedTheme);
  }, [setTheme]);

  // Debounced auto-save hook
  useDebouncedAutoSave(
    tasks,
    customTags,
    customGroups,
    themeName
  );

  const setTasks = useCallback((newTasks: ReadonlyArray<PreparationTask>) => {
    setTasksState(newTasks);
  }, []);

  const setCustomTags = useCallback((newTags: ReadonlyArray<Tag>) => {
    setCustomTagsState(newTags);
  }, []);

  const setCustomGroups = useCallback((newGroups: ReadonlyArray<Group>) => {
    setCustomGroupsState(newGroups);
  }, []);

  const setSelectedGroupId = useCallback((groupId: string | null) => {
    setSelectedGroupIdState(groupId);
  }, []);

  const addTask = useCallback((task: PreparationTask) => {
    setTasksState((prev) =>
      [...prev, task].map((t, index) => ({ ...t, order: index }))
    );
  }, []);

  const updateTask = useCallback((updatedTask: PreparationTask) => {
    setTasksState((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasksState((prev) =>
      prev
        .filter((t) => t.id !== taskId)
        .map((t, index) => ({ ...t, order: index }))
    );
  }, []);

  const toggleTaskDone = useCallback((taskId: string) => {
    setTasksState((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isDone: !t.isDone, updatedAt: Date.now() } : t
      )
    );
  }, []);

  const reorderTasks = useCallback(
    (activeTaskId: string, overTaskId: string) => {
      const activeTaskIndex = tasks.findIndex((t) => t.id === activeTaskId);
      const overTaskIndex = tasks.findIndex((t) => t.id === overTaskId);
      if (activeTaskIndex === -1 || overTaskIndex === -1) return;

      const reorderedTasks = Array.from(tasks);
      const [movedTask] = reorderedTasks.splice(activeTaskIndex, 1);
      reorderedTasks.splice(overTaskIndex, 0, movedTask);
      setTasksState(
        reorderedTasks.map((task, index) => ({
          ...task,
          order: index,
        }))
      );
    },
    [tasks]
  );

  const addCustomTag = useCallback((tag: Tag) => {
    setCustomTagsState((prev) => [...prev, tag]);
  }, []);

  const deleteCustomTag = useCallback((tagId: string) => {
    // Remove tag from custom tags
    setCustomTagsState((prev) => prev.filter((t) => t.id !== tagId));

    // Remove tag from all tasks
    setTasksState((prev) =>
      prev.map((task) => ({
        ...task,
        tags: task.tags.filter((t) => t.id !== tagId),
        updatedAt: Date.now(),
      }))
    );
  }, []);

  const addCustomGroup = useCallback((group: Group) => {
    setCustomGroupsState((prev) => [...prev, group]);
  }, []);

  const resetGroupProgress = useCallback(() => {
    if (!selectedGroupId) return;

    setTasksState((prev) =>
      prev.map((t) =>
        t.groupId === selectedGroupId
          ? { ...t, isDone: false, updatedAt: Date.now() }
          : t
      )
    );
  }, [selectedGroupId]);

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
              setTasks(data.tasks);
              setCustomTags(data.customTags);
              setCustomGroups(data.customGroups);
              setTheme(data.selectedTheme);
              document.documentElement.setAttribute(
                "data-theme",
                data.selectedTheme
              );
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
    [setCustomGroups, setCustomTags, setTasks, setTheme]
  );

  const value: TaskUtilityContextType = {
    tasks,
    themeName,
    customTags,
    customGroups,
    selectedGroupId,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskDone,
    reorderTasks,
    addCustomTag,
    deleteCustomTag,
    addCustomGroup,
    setSelectedGroupId,
    resetGroupProgress,
    setTasks,
    setCustomTags,
    setCustomGroups,
    setTheme,
    handleExport,
    handleImport,
  };

  return (
    <TaskUtilityContext.Provider value={value}>
      {children}
    </TaskUtilityContext.Provider>
  );
};
