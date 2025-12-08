import React, { useState } from "react";
import {
  FiEdit2,
  FiTrash2,
  FiCheck,
  FiX,
  FiFileText,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
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
} from "../styled";

interface ProblemListProps {
  problems: Problem[];
  onEdit: (problem: Problem) => void;
  onDelete: (problemId: string) => void;
  onToggleDone: (problemId: string) => void;
}

export const ProblemList: React.FC<ProblemListProps> = ({
  problems,
  onEdit,
  onDelete,
  onToggleDone,
}) => {
  const [showTags, setShowTags] = useState(false);
  const [notesModalProblem, setNotesModalProblem] = useState<Problem | null>(null);

  if (problems.length === 0) {
    return (
      <EmptyState>
        <FiX />
        <h3>No problems found</h3>
        <p>Add your first DSA problem to get started!</p>
      </EmptyState>
    );
  }

  return (
    <>
      <div style={{ marginBottom: "1rem" }}>
        <Button variant="secondary" onClick={() => setShowTags(!showTags)}>
          {showTags ? <FiEyeOff size={16} /> : <FiEye size={16} />}
          {showTags ? "Hide Tags" : "Show Tags"}
        </Button>
      </div>
      <ProblemsGrid>
        {problems.map((problem) => (
          <ProblemCard key={problem.id} isDone={problem.isDone}>
            <ProblemHeader>
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
                    target={
                      problem.link.startsWith("http") ? "_blank" : undefined
                    }
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
                    onClick={() => setNotesModalProblem(problem)}
                    title="View notes"
                  >
                    <FiFileText size={16} />
                  </IconButton>
                )}
                <IconButton
                  onClick={() => onEdit(problem)}
                  title="Edit problem"
                >
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
        ))}
      </ProblemsGrid>

      {notesModalProblem && (
        <Modal onClick={() => setNotesModalProblem(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Notes</h2>
            <div
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
