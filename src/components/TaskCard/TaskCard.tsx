import React from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiFileText,
  FiMenu,
} from "react-icons/fi";
import { cx } from "@emotion/css";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PreparationTask } from "../../model";
import {
  taskCardStyles,
  taskCardDoneStyles,
  taskCardDraggingStyles,
  taskHeaderStyles,
  taskContentStyles,
  taskLinkContainerStyles,
  taskLinkStyles,
  taskLinkDoneStyles,
  taskActionsStyles,
  iconButtonStyles,
  iconButtonSuccessStyles,
  iconButtonDangerStyles,
  dragHandleStyles,
  tagsContainerStyles,
  tagStyles,
  tagCustomStyles,
} from "./TaskCard.styles";

interface TaskCardProps {
  readonly task: PreparationTask;
  readonly showTags: boolean;
  readonly enableDragDrop: boolean;
  readonly onEdit: (task: PreparationTask) => void;
  readonly onDelete: (taskId: string) => void;
  readonly onToggleDone: (taskId: string) => void;
  readonly onViewNotes: (task: PreparationTask) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  showTags,
  enableDragDrop,
  onEdit,
  onDelete,
  onToggleDone,
  onViewNotes,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: !enableDragDrop });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cardClassName = cx(
    isDragging
      ? taskCardDraggingStyles
      : task.isDone
      ? taskCardDoneStyles
      : taskCardStyles
  );

  const linkClassName = task.isDone ? taskLinkDoneStyles : taskLinkStyles;

  const isExternalLink = task.link.startsWith("http");

  return (
    <div ref={setNodeRef} style={style}>
      <div className={cardClassName}>
        <div className={taskHeaderStyles}>
          {enableDragDrop && (
            <div className={dragHandleStyles} {...attributes} {...listeners}>
              <FiMenu size={18} />
            </div>
          )}
          <div className={taskContentStyles}>
            <div className={taskLinkContainerStyles}>
              {isExternalLink ? (
                <a
                  href={task.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClassName}
                >
                  {task.link}
                </a>
              ) : (
                <span className={linkClassName}>{task.link}</span>
              )}
            </div>
            {showTags && task.tags.length > 0 && (
              <div className={tagsContainerStyles}>
                {task.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className={tag.isCustom ? tagCustomStyles : tagStyles}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className={taskActionsStyles}>
            <button
              className={
                task.isDone ? iconButtonStyles : iconButtonSuccessStyles
              }
              onClick={() => onToggleDone(task.id)}
              title={task.isDone ? "Mark as undone" : "Mark as done"}
            >
              {task.isDone ? <FiX size={16} /> : <FiCheck size={16} />}
            </button>
            {task.notes && (
              <button
                className={iconButtonStyles}
                onClick={() => onViewNotes(task)}
                title="View notes"
              >
                <FiFileText size={16} />
              </button>
            )}
            <button
              className={iconButtonStyles}
              onClick={() => onEdit(task)}
              title="Edit task"
            >
              <FiEdit2 size={16} />
            </button>
            <button
              className={iconButtonDangerStyles}
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this task?")
                ) {
                  onDelete(task.id);
                }
              }}
              title="Delete task"
            >
              <FiTrash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
