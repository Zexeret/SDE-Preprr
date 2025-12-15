import React, { useCallback } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiMenu } from "react-icons/fi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PreparationTask } from "../../model";
import {
  TaskCardBase,
  TaskCardDone,
  TaskCardDragging,
  TaskHeader,
  TaskContent,
  TaskLinkContainer,
  TaskLink,
  TaskLinkSpan,
  TaskActions,
  IconButton,
  IconButtonSuccess,
  IconButtonDanger,
  DragHandle,
  TagsContainer,
  Tag,
} from "./TaskCard.styles";
import { useTaskUtility } from "../../context";

interface TaskCardProps {
  readonly task: PreparationTask;
  readonly showTags: boolean;
  readonly enableDragDrop: boolean;
  readonly onEdit: (task: PreparationTask) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  showTags,
  enableDragDrop,
  onEdit,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: !enableDragDrop });
  const { deleteTask, updateTask } = useTaskUtility();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const CardComponent = isDragging
    ? TaskCardDragging
    : task.isDone
    ? TaskCardDone
    : TaskCardBase;

  const isExternalLink = task.link?.startsWith("http");

  const handleDeleteTask = useCallback(() => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteTask(task.id);
    }
  }, [deleteTask, task]);

  const handleToggleTaskDone = useCallback(() => {
    updateTask({ ...task, isDone: !task.isDone });
  }, [task, updateTask]);

  return (
    <div ref={setNodeRef} style={style}>
      <CardComponent>
        <TaskHeader>
          {enableDragDrop && (
            <DragHandle {...attributes} {...listeners}>
              <FiMenu size={18} />
            </DragHandle>
          )}
          <TaskContent>
            <TaskLinkContainer>
              {isExternalLink ? (
                <TaskLink
                  href={task.link ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  $isDone={task.isDone}
                >
                  {task.title} #{task.order}
                </TaskLink>
              ) : (
                <TaskLinkSpan $isDone={task.isDone}>
                  {task.title} #{task.order}
                </TaskLinkSpan>
              )}
            </TaskLinkContainer>
            {showTags && task.tags.length > 0 && (
              <TagsContainer>
                {task.tags.map((tag) => (
                  <Tag key={tag.id} $isCustom={tag.isCustom}>
                    {tag.name}
                  </Tag>
                ))}
              </TagsContainer>
            )}
          </TaskContent>
          <TaskActions>
            {task.isDone ? (
              <IconButton onClick={handleToggleTaskDone} title="Mark as undone">
                <FiX size={16} />
              </IconButton>
            ) : (
              <IconButtonSuccess
                onClick={handleToggleTaskDone}
                title="Mark as done"
              >
                <FiCheck size={16} />
              </IconButtonSuccess>
            )}
            <IconButton onClick={() => onEdit(task)} title="Edit task">
              <FiEdit2 size={16} />
            </IconButton>
            <IconButtonDanger onClick={handleDeleteTask} title="Delete task">
              <FiTrash2 size={16} />
            </IconButtonDanger>
          </TaskActions>
        </TaskHeader>
      </CardComponent>
    </div>
  );
};
