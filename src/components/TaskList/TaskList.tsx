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
import { TaskCard } from "../TaskCard";
import {
  EmptyListContainer,
  TasksGrid,
} from "./TaskList.styles";
import { useSelector } from "react-redux";
import { reorderTasks, selectOrderedFilteredTaskIds, selectShowDifficultyFilter, selectShowTagFilter, useAppDispatch } from "../../store";

interface TaskListProps {
  readonly enableDragDrop?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  enableDragDrop = false,
}) => {
  const orderedTaskIds = useSelector(selectOrderedFilteredTaskIds);
  const showDifficulty = useSelector(selectShowDifficultyFilter);
  const showTags = useSelector(selectShowTagFilter);
  const dispatch = useAppDispatch() ;

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        dispatch(reorderTasks({
          activeId: String(active.id),
          overId: String(over.id)
        }));
      }
    },
    [dispatch]
  );

  if (orderedTaskIds.length === 0) {
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
        {orderedTaskIds.map((taskId) => (
          <TaskCard
            key={taskId}
            taskId={taskId}
            showTags={showTags}
            showDifficulty={showDifficulty}
            enableDragDrop={enableDragDrop}
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
            items={orderedTaskIds}
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
