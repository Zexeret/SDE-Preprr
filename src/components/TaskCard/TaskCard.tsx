import React, { useCallback } from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX, FiMenu, FiExternalLink } from "react-icons/fi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DIFFICULTY_TAGS,
  type DifficultyTagId,
  type PreparationTask,
} from "../../model";
import {
  TaskCardBase,
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
  SeparatingDot,
  DifficultyTag,
} from "./TaskCard.styles";
import { useTaskUtility } from "../../context";

interface TaskCardProps {
  readonly task: PreparationTask;
  readonly showTags: boolean;
  readonly enableDragDrop: boolean;
  readonly showDifficulty: boolean;
  readonly onEdit: (task: PreparationTask) => void;
}

const getDifficultyName = (id: DifficultyTagId) =>
  DIFFICULTY_TAGS.find((tag) => tag.id === id)?.name || id;

const ICON_SIZE = 14; 

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  showTags,
  enableDragDrop,
  showDifficulty,
  onEdit,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: task.id, disabled: !enableDragDrop });
  const { deleteTask, updateTask } = useTaskUtility();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

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
      <TaskCardBase>
        <TaskHeader>
          {enableDragDrop && (
            <DragHandle {...attributes} {...listeners}>
              <FiMenu size={ICON_SIZE} />
            </DragHandle>
          )}
          <TaskContent>
            <TaskLinkContainer>
              <TaskLinkSpan $isDone={task.isDone}>
                {task.title} #{task.order}
              </TaskLinkSpan>
              <TaskLink
                href={task.link ?? undefined}
                target="_blank"
                rel="noopener noreferrer"
                $isDone={task.isDone}
              >
                <FiExternalLink size={ICON_SIZE} />
              </TaskLink>
            </TaskLinkContainer>
            {showTags && task.tags.length > 0 && (
              <TagsContainer>
                {task.tags.map((tag, index) => (
                  <>
                    <Tag key={tag.id} $isCustom={tag.isCustom}>
                      {tag.name}
                    </Tag>
                    {index < task.tags.length - 1 && <SeparatingDot />}
                  </>
                ))}
              </TagsContainer>
            )}
          </TaskContent>
          <TaskActions>
            {showDifficulty && task.difficulty && (
              <DifficultyTag difficulty={task.difficulty}>
                {getDifficultyName(task.difficulty)}
              </DifficultyTag>
            )}
              <IconButtonSuccess
                onClick={handleToggleTaskDone}
                title="Mark as done"
                isDone={task.isDone}
              >
                <FiCheck size={ICON_SIZE} />
              </IconButtonSuccess>
            
            <IconButton onClick={() => onEdit(task)} title="Edit task">
              <FiEdit2 size={ICON_SIZE} />
            </IconButton>
            <IconButtonDanger onClick={handleDeleteTask} title="Delete task">
              <FiTrash2 size={ICON_SIZE} />
            </IconButtonDanger>
          </TaskActions>
        </TaskHeader>
      </TaskCardBase>
    </div>
  );
};
