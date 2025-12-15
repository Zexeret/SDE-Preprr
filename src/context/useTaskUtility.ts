import { createContext, useContext } from "react";
import type { Group, PreparationTask, Tag } from "../model";
import type { ThemeName } from "../theme";

export interface TaskUtilityContextType {
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly themeName : ThemeName;
  readonly customTags: ReadonlyArray<Tag>;
  readonly customGroups: ReadonlyArray<Group>;
  readonly selectedGroupId: string | null;
  readonly addTask: (task: PreparationTask) => void;
  readonly updateTask: (task: PreparationTask) => void;
  readonly deleteTask: (taskId: string) => void;
  readonly toggleTaskDone: (taskId: string) => void;
  readonly reorderTasks: (activeTaskId : string , overTaskId : string) => void;
  readonly addCustomTag: (tag: Tag) => void;
  readonly deleteCustomTag: (tagId: string) => void;
  readonly addCustomGroup: (group: Group) => void;
  readonly setSelectedGroupId: (groupId: string | null) => void;
  readonly resetGroupProgress: () => void;
  readonly setTasks: (tasks: ReadonlyArray<PreparationTask>) => void;
  readonly setCustomTags: (tags: ReadonlyArray<Tag>) => void;
  readonly setCustomGroups: (groups: ReadonlyArray<Group>) => void;
  readonly setTheme: (themeName: ThemeName) => void;
}

export const TaskUtilityContext = createContext<TaskUtilityContextType | undefined>(undefined);

export const useTaskUtility = (): TaskUtilityContextType => {
  const context = useContext(TaskUtilityContext);
  if (!context) {
    throw new Error("useTaskUtility must be used within TaskUtilityProvider");
  }
  return context;
};