import React, { useCallback, useState } from "react";
import { FiX, FiEye, FiEyeOff, FiEdit2 } from "react-icons/fi";
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
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { PreparationTask } from "../../model";
import { TaskCard } from "../TaskCard";
import { ButtonSecondary } from "../../sharedStyles";
import {
  taskListControlsStyles,
  tasksGridStyles,
  groupHeaderStyles,
  groupCountStyles,
  EmptyListContainer,
} from "./TaskList.styles";
import { useTaskUtility } from "../../context";

interface TaskListProps {
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly onEdit: (task: PreparationTask) => void;
  readonly enableDragDrop?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  enableDragDrop = false,
}) => {
  const { reorderTasks } = useTaskUtility();

  const [showTags, setShowTags] = useState(false);
  const [notesModalTask, setNotesModalTask] = useState<PreparationTask | null>(
    null
  );

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
      <div className={taskListControlsStyles}>
        <ButtonSecondary onClick={() => setShowTags(!showTags)}>
          {showTags ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          {showTags ? "Hide Tags" : "Show Tags"}
        </ButtonSecondary>
      </div>
      <div className={tasksGridStyles}>
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            showTags={showTags}
            enableDragDrop={enableDragDrop}
            onEdit={onEdit}
            onViewNotes={setNotesModalTask}
          />
        ))}
      </div>
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
