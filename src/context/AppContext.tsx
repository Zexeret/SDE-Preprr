import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { PreparationTask, Tag, Group } from "../model";
import {
  loadTasks,
  saveTasks,
  loadCustomTags,
  saveCustomTags,
  loadCustomGroups,
  saveCustomGroups,
  loadSelectedGroup,
  saveSelectedGroup,
} from "../utils";
import { DEFAULT_GROUP_ID } from "../constants";

interface AppContextType {
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly customTags: ReadonlyArray<Tag>;
  readonly customGroups: ReadonlyArray<Group>;
  readonly selectedGroupId: string;
  readonly addTask: (task: PreparationTask) => void;
  readonly updateTask: (task: PreparationTask) => void;
  readonly deleteTask: (taskId: string) => void;
  readonly toggleTaskDone: (taskId: string) => void;
  readonly reorderTasks: (tasks: ReadonlyArray<PreparationTask>) => void;
  readonly addCustomTag: (tag: Tag) => void;
  readonly deleteCustomTag: (tagId: string) => void;
  readonly addCustomGroup: (group: Group) => void;
  readonly setSelectedGroupId: (groupId: string) => void;
  readonly resetGroupProgress: () => void;
  readonly setTasks: (tasks: ReadonlyArray<PreparationTask>) => void;
  readonly setCustomTags: (tags: ReadonlyArray<Tag>) => void;
  readonly setCustomGroups: (groups: ReadonlyArray<Group>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ readonly children: ReactNode }> = ({
  children,
}) => {
  const [tasks, setTasksState] = useState<ReadonlyArray<PreparationTask>>([]);
  const [customTags, setCustomTagsState] = useState<ReadonlyArray<Tag>>([]);
  const [customGroups, setCustomGroupsState] = useState<ReadonlyArray<Group>>(
    []
  );
  const [selectedGroupId, setSelectedGroupIdState] =
    useState<string>(DEFAULT_GROUP_ID);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const loadedTasks = loadTasks();
    const loadedTags = loadCustomTags();
    const loadedGroups = loadCustomGroups();
    const loadedSelectedGroup = loadSelectedGroup();

    const tasksWithOrder = loadedTasks.map((task, index) => ({
      ...task,
      order: task.order !== undefined ? task.order : index,
    }));

    setTasksState(tasksWithOrder);
    setCustomTagsState(loadedTags);
    setCustomGroupsState(loadedGroups);
    setSelectedGroupIdState(loadedSelectedGroup);

    setTimeout(() => {
      isInitialMount.current = false;
    }, 0);
  }, []);

  useEffect(() => {
    if (!isInitialMount.current) {
      saveTasks(tasks);
    }
  }, [tasks]);

  useEffect(() => {
    if (!isInitialMount.current) {
      saveCustomTags(customTags);
    }
  }, [customTags]);

  useEffect(() => {
    if (!isInitialMount.current) {
      saveCustomGroups(customGroups);
    }
  }, [customGroups]);

  useEffect(() => {
    if (!isInitialMount.current) {
      saveSelectedGroup(selectedGroupId);
    }
  }, [selectedGroupId]);

  const setTasks = useCallback((newTasks: ReadonlyArray<PreparationTask>) => {
    setTasksState(newTasks);
  }, []);

  const setCustomTags = useCallback((newTags: ReadonlyArray<Tag>) => {
    setCustomTagsState(newTags);
  }, []);

  const setCustomGroups = useCallback((newGroups: ReadonlyArray<Group>) => {
    setCustomGroupsState(newGroups);
  }, []);

  const setSelectedGroupId = useCallback((groupId: string) => {
    setSelectedGroupIdState(groupId);
  }, []);

  const addTask = useCallback((task: PreparationTask) => {
    setTasksState((prev) => [...prev, task]);
  }, []);

  const updateTask = useCallback((updatedTask: PreparationTask) => {
    setTasksState((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  }, []);

  const deleteTask = useCallback((taskId: string) => {
    setTasksState((prev) => prev.filter((t) => t.id !== taskId));
  }, []);

  const toggleTaskDone = useCallback((taskId: string) => {
    setTasksState((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, isDone: !t.isDone, updatedAt: Date.now() } : t
      )
    );
  }, []);

  const reorderTasks = useCallback(
    (reorderedTasks: ReadonlyArray<PreparationTask>) => {
      setTasksState((prev) => {
        const groupId = reorderedTasks[0]?.groupId;
        if (!groupId) return prev;

        const otherGroupTasks = prev.filter((t) => t.groupId !== groupId);
        return [...otherGroupTasks, ...reorderedTasks];
      });
    },
    []
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
    setTasksState((prev) =>
      prev.map((t) =>
        t.groupId === selectedGroupId
          ? { ...t, isDone: false, updatedAt: Date.now() }
          : t
      )
    );
  }, [selectedGroupId]);

  const value: AppContextType = {
    tasks,
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
