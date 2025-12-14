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
import type { Problem } from "../types";
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

interface ProblemListProps {
  problems: Problem[];
  onEdit: (problem: Problem) => void;
  onDelete: (problemId: string) => void;
  onToggleDone: (problemId: string) => void;
  onReorder?: (problems: Problem[]) => void;
  enableDragDrop?: boolean;
}

interface SortableProblemCardProps {
  problem: Problem;
  showTags: boolean;
  enableDragDrop: boolean;
  onEdit: (problem: Problem) => void;
  onDelete: (problemId: string) => void;
  onToggleDone: (problemId: string) => void;
  onViewNotes: (problem: Problem) => void;
}

const SortableProblemCard: React.FC<SortableProblemCardProps> = ({
  problem,
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
  } = useSortable({ id: problem.id, disabled: !enableDragDrop });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ProblemCard isDone={problem.isDone} isDragging={isDragging}>
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
                marginBottom:
                  showTags && problem.tags.length > 0 ? "0.75rem" : 0,
              }}
            >
              <ProblemLink
                href={
                  problem.link.startsWith("http") ? problem.link : undefined
                }
                target={problem.link.startsWith("http") ? "_blank" : undefined}
                rel={
                  problem.link.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                isDone={problem.isDone}
                as={problem.link.startsWith("http") ? "a" : "span"}
                style={{
                  cursor: problem.link.startsWith("http")
                    ? "pointer"
                    : "default",
                }}
              >
                {problem.link}
              </ProblemLink>
            </div>
            {showTags && problem.tags.length > 0 && (
              <TagsContainer style={{ marginTop: 0 }}>
                {problem.tags.map((tag) => (
                  <Tag key={tag.id} isCustom={tag.isCustom}>
                    {tag.name}
                  </Tag>
                ))}
              </TagsContainer>
            )}
          </div>
          <ProblemActions>
            <IconButton
              variant={problem.isDone ? "primary" : "success"}
              onClick={() => onToggleDone(problem.id)}
              title={problem.isDone ? "Mark as undone" : "Mark as done"}
            >
              {problem.isDone ? <FiX size={16} /> : <FiCheck size={16} />}
            </IconButton>
            {problem.notes && (
              <IconButton
                onClick={() => onViewNotes(problem)}
                title="View notes"
              >
                <FiFileText size={16} />
              </IconButton>
            )}
            <IconButton onClick={() => onEdit(problem)} title="Edit problem">
              <FiEdit2 size={16} />
            </IconButton>
            <IconButton
              variant="danger"
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this problem?"
                  )
                ) {
                  onDelete(problem.id);
                }
              }}
              title="Delete problem"
            >
              <FiTrash2 size={16} />
            </IconButton>
          </ProblemActions>
        </ProblemHeader>
      </ProblemCard>
    </div>
  );
};

export const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  onEdit,
  onDelete,
  onToggleDone,
  onReorder,
  enableDragDrop = false,
}) => {
  const [showTags, setShowTags] = useState(false);
  const [notesModalProblem, setNotesModalProblem] = useState<Problem | null>(
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
      const oldIndex = problems.findIndex((p) => p.id === active.id);
      const newIndex = problems.findIndex((p) => p.id === over.id);

      const reorderedProblems = arrayMove(problems, oldIndex, newIndex).map(
        (problem, index) => ({
          ...problem,
          order: index,
        })
      );

      onReorder(reorderedProblems);
    }
  };

  if (problems.length === 0) {
    return (
      <EmptyState>
        <FiX />
        <h3>No problems found</h3>
        <p>Add your first DSA problem to get started!</p>
      </EmptyState>
    );
  }

  const problemsList = (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Button variant="secondary" onClick={() => setShowTags(!showTags)}>
          {showTags ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          {showTags ? "Hide Tags" : "Show Tags"}
        </Button>
      </div>
      <ProblemsGrid>
        {problems.map((problem) => (
          <SortableProblemCard
            key={problem.id}
            problem={problem}
            showTags={showTags}
            enableDragDrop={enableDragDrop}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleDone={onToggleDone}
            onViewNotes={setNotesModalProblem}
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
            items={problems.map((p) => p.id)}
            strategy={verticalListSortingStrategy}
          >
            {problemsList}
          </SortableContext>
        </DndContext>
      ) : (
        problemsList
      )}

      {notesModalProblem && (
        <Modal onClick={() => setNotesModalProblem(null)}>
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
              dangerouslySetInnerHTML={{ __html: notesModalProblem.notes }}
            />
            <ModalActions>
              <Button
                variant="secondary"
                onClick={() => setNotesModalProblem(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  onEdit(notesModalProblem);
                  setNotesModalProblem(null);
                }}
              >
                <FiEdit2 size={16} />
                Edit Problem
              </Button>
            </ModalActions>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};
