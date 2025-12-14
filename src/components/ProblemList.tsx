import React, { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiFileText,
  FiEye,
  FiEyeOff,
  FiMenu,
} from "react-icons/fi";
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { PreparationTask } from "../types";
import { stripHtmlTags } from "../utils";
import {
  ProblemCard,
  ProblemHeader,
  ProblemLink,
  ProblemActions,
  IconButton,
  TagsContainer,
  Tag,
  NotesPreview,
  EmptyState,
  ProblemsGrid,
  Button,
  Modal,
  ModalContent,
  ModalActions,
  DragHandle,
} from "../styled";

interface TaskListProps {
  readonly tasks: ReadonlyArray<PreparationTask>;
  readonly onEdit: (task: PreparationTask) => void;
  readonly onDelete: (taskId: string) => void;
  readonly onToggleDone: (taskId: string) => void;
  readonly onReorder?: (tasks: ReadonlyArray<PreparationTask>) => void;
  readonly enableDragDrop?: boolean;
}

interface SortableTaskCardProps {
  readonly task: PreparationTask;
  readonly showTags: boolean;
  readonly enableDragDrop: boolean;
  readonly onEdit: (task: PreparationTask) => void;
  readonly onDelete: (taskId: string) => void;
  readonly onToggleDone: (taskId: string) => void;
  readonly onViewNotes: (task: PreparationTask) => void;
}

const SortableTaskCard: React.FC<SortableTaskCardProps> = ({
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

  return (
    <div ref={setNodeRef} style={style}>
      <ProblemCard isDone={task.isDone} isDragging={isDragging}>
        <ProblemHeader>
          {enableDragDrop && (
            <DragHandle {...attributes} {...listeners}>
              <FiMenu size={18} />
            </DragHandle>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginBottom: showTags && task.tags.length > 0 ? "0.75rem" : 0,
              }}
            >
              <ProblemLink
                href={task.link.startsWith("http") ? task.link : undefined}
                target={task.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  task.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                isDone={task.isDone}
                as={task.link.startsWith("http") ? "a" : "span"}
                style={{
                  cursor: task.link.startsWith("http") ? "pointer" : "default",
                }}
              >
                {task.link}
              </ProblemLink>
            </div>
            {showTags && task.tags.length > 0 && (
              <TagsContainer style={{ marginTop: 0 }}>
                {task.tags.map((tag) => (
                  <Tag key={tag.id} isCustom={tag.isCustom}>
                    {tag.name}
                  </Tag>
                ))}
              </TagsContainer>
            )}
          </div>
          <ProblemActions>
            <IconButton
              variant={task.isDone ? "primary" : "success"}
              onClick={() => onToggleDone(task.id)}
              title={task.isDone ? "Mark as undone" : "Mark as done"}
            >
              {task.isDone ? <FiX size={16} /> : <FiCheck size={16} />}
            </IconButton>
            {task.notes && (
              <IconButton onClick={() => onViewNotes(task)} title="View notes">
                <FiFileText size={16} />
              </IconButton>
            )}
            <IconButton onClick={() => onEdit(task)} title="Edit task">
              <FiEdit2 size={16} />
            </IconButton>
            <IconButton
              variant="danger"
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
            </IconButton>
          </ProblemActions>
        </ProblemHeader>
      </ProblemCard>
    </div>
  );
};

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
      <EmptyState>
        <FiX />
        <h3>No tasks found</h3>
        <p>Add your first preparation task to get started!</p>
      </EmptyState>
    );
  }

  const tasksList = (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Button variant="secondary" onClick={() => setShowTags(!showTags)}>
          {showTags ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          {showTags ? "Hide Tags" : "Show Tags"}
        </Button>
      </div>
      <ProblemsGrid>
        {tasks.map((task) => (
          <SortableTaskCard
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
      </ProblemsGrid>
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

      {notesModalTask && (
        <Modal onClick={() => setNotesModalTask(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Notes</h2>
            <div
              className="notes-content"
              style={{
                marginBottom: "1.5rem",
                padding: "1rem",
                background: "#0f172a",
                borderRadius: "0.5rem",
                border: "1px solid #334155",
                maxHeight: "400px",
                overflowY: "auto",
              }}
              dangerouslySetInnerHTML={{ __html: notesModalTask.notes }}
            />
            <ModalActions>
              <Button
                variant="secondary"
                onClick={() => setNotesModalTask(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  onEdit(notesModalTask);
                  setNotesModalTask(null);
                }}
              >
                <FiEdit2 size={16} />
                Edit Task
              </Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

// Keep old export name for backward compatibility
export const ProblemList = TaskList;
