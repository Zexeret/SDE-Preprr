import React, { useCallback } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiMenu,
  FiExternalLink,
} from "react-icons/fi";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DIFFICULTY_TAGS, type DifficultyTagId } from "../../model";
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
import { isValidUrl } from "../../utils";
import {
  openTaskModal,
  removeTask,
  selectAllTags,
  selectTaskById,
  updateTask,
  useAppDispatch,
  type RootState,
} from "../../store";
import { useSelector } from "react-redux";
import { getLogger } from "../../logger";
import { useDialog } from "../Dialog";

const log = getLogger("ui:task-card");

interface TaskCardProps {
  readonly taskId: string;
  readonly showTags: boolean;
  readonly enableDragDrop: boolean;
  readonly showDifficulty: boolean;
}

const getDifficultyName = (id: DifficultyTagId) =>
  DIFFICULTY_TAGS.find((tag) => tag.id === id)?.name || id;

const ICON_SIZE = 14;

export const TaskCard: React.FC<TaskCardProps> = ({
  taskId,
  showTags,
  enableDragDrop,
  showDifficulty,
}) => {
  const dispatch = useAppDispatch();
  const task = useSelector((state: RootState) => selectTaskById(state, taskId));
  const allTags = useSelector(selectAllTags);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: taskId, disabled: !enableDragDrop });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : "auto",
    position: "relative" as const,
  };

  const { confirm } = useDialog();

  const handleDeleteTask = useCallback(async () => {
    const confirmed = await confirm({
      title: "Delete Task",
      message: "Are you sure you want to delete this task?",
      confirmText: "Delete",
      isDangerous: true,
    });
    if (confirmed) {
      log.info("Deleting task: {}", taskId);
      dispatch(removeTask(taskId));
    }
  }, [confirm, dispatch, taskId]);

  const handleToggleTaskDone = useCallback(() => {
    const newStatus = !task.isDone;
    log.debug(
      "Toggling task completion: {} -> {}",
      task.id,
      newStatus ? "done" : "not done"
    );
    dispatch(
      updateTask({
        id: task.id,
        changes: {
          isDone: newStatus,
        },
      })
    );
  }, [dispatch, task.id, task.isDone]);

  const handleEditTask = useCallback(() => {
    log.debug("Opening task for edit: {}", task.id);
    dispatch(
      openTaskModal({
        isOpen: true,
        taskId: task.id,
        mode: "edit",
      })
    );
  }, [task, dispatch]);

  const handleDoubleClick = useCallback(() => {
    log.debug("Opening task for view: {}", task.id);
    dispatch(
      openTaskModal({
        isOpen: true,
        taskId: task.id,
        mode: "view",
      })
    );
  }, [task, dispatch]);

  const renderTags = useCallback(
    (tagIds: ReadonlyArray<string>) => {
      return tagIds.map((tagId, index) => {
        const tag = allTags.find((tag) => tag.id === tagId);
        if (tag) {
          return (
            <>
              <Tag key={tag.id} $isCustom={tag.isCustom}>
                {tag.name}
              </Tag>
              {index < task.tags.length - 1 && <SeparatingDot />}
            </>
          );
        }
        return null;
      });
    },
    [allTags, task.tags.length]
  );

  const taskLink = task.link && isValidUrl(task.link) ? task.link : undefined;

  return (
    <div ref={setNodeRef} style={style}>
      <TaskCardBase
        $isCompleted={task.isDone}
        onDoubleClick={handleDoubleClick}
      >
        <TaskHeader>
          {enableDragDrop && (
            <DragHandle {...attributes} {...listeners}>
              <FiMenu size={ICON_SIZE} />
            </DragHandle>
          )}
          <TaskContent>
            <TaskLinkContainer>
              <TaskLinkSpan $isDone={task.isDone}>{task.title}</TaskLinkSpan>
              <TaskLink
                href={taskLink}
                target="_blank"
                rel="noopener noreferrer"
                $isDone={task.isDone}
                $disabled={!task.link}
              >
                <FiExternalLink size={ICON_SIZE} />
              </TaskLink>
            </TaskLinkContainer>
            {showTags && task.tags.length > 0 && (
              <TagsContainer>{renderTags(task.tags)}</TagsContainer>
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

            <IconButton onClick={handleEditTask} title="Edit task">
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
