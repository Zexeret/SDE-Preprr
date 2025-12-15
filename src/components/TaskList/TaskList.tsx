import React, { useCallback } from "react";
import { FiX  } from "react-icons/fi";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { PreparationTask } from "../../model";
import { TaskCard } from "../TaskCard";
import {
  EmptyListContainer,
  TasksGrid,
} from "./TaskList.styles";
import { useTaskUtility } from "../../context";
import { useFilterContext } from "../FilterBar";

interface TaskListProps {
  readonly onEdit: (task: PreparationTask) => void;
  readonly enableDragDrop?: boolean;
}


export const TaskList: React.FC<TaskListProps> = ({
  onEdit,
  enableDragDrop = false,
}) => {
  const { reorderTasks } = useTaskUtility();
  const {
    filteredAndSortedTasks: tasks,
    setShowTags,
    setShowDifficulty,
    showDifficulty,
    showTags,
  } = useFilterContext();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id && reorderTasks) {
        reorderTasks(active.id as string, over.id as string);
      }
    },
    [reorderTasks]
  );

  if (tasks.length === 0) {
    return (
      <EmptyListContainer>
        <FiX />
        <h3>No tasks found</h3>
        <p>Add your first preparation task to get started!</p>
      </EmptyListContainer>
    );
  }

  const tasksList = (
    <>
      <TasksGrid>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            showTags={showTags}
            showDifficulty={showDifficulty}
            enableDragDrop={enableDragDrop}
            onEdit={onEdit}
          />
        ))}
      </TasksGrid>
    </>
  );

  return (
    <>
      {enableDragDrop ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            {tasksList}
          </SortableContext>
        </DndContext>
      ) : (
        tasksList
      )}
    </>
  );
};
