import React, { useState } from "react";
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
  emptyStateStyles,
  taskListControlsStyles,
  tasksGridStyles,
  groupHeaderStyles,
  groupCountStyles,
} from "./TaskList.styles";

interface TaskListProps {
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly onEdit: (task: PreparationTask) => void;
  readonly onDelete: (taskId: string) => void;
  readonly onToggleDone: (taskId: string) => void;
  readonly onReorder?: (tasks: ReadonlyArray<PreparationTask>) => void;
  readonly enableDragDrop?: boolean;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onEdit,
  onDelete,
  onToggleDone,
  onReorder,
  enableDragDrop = false,
}) => {
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id && onReorder) {
      const oldIndex = tasks.findIndex((t) => t.id === active.id);
      const newIndex = tasks.findIndex((t) => t.id === over.id);

      const reorderedTasks = arrayMove([...tasks], oldIndex, newIndex).map(
        (task, index) => ({
          ...task,
          order: index,
        })
      );

      onReorder(reorderedTasks);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className={emptyStateStyles}>
        <FiX />
        <h3>No tasks found</h3>
        <p>Add your first preparation task to get started!</p>
      </div>
    );
  }

  const tasksList = (
    <>
      <div className={taskListControlsStyles}>
        <ButtonSecondary
          onClick={() => setShowTags(!showTags)}
        >
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
            onDelete={onDelete}
            onToggleDone={onToggleDone}
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
