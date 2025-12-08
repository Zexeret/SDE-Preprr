import React from "react";
import { FiEdit2, FiTrash2, FiCheck, FiX } from "react-icons/fi";
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
    <ProblemsGrid>
      {problems.map((problem) => (
        <ProblemCard key={problem.id} isDone={problem.isDone}>
          <ProblemHeader>
            <ProblemLink
              href={problem.link}
              target="_blank"
              rel="noopener noreferrer"
              isDone={problem.isDone}
            >
              {problem.link}
            </ProblemLink>
            <ProblemActions>
              <IconButton
                variant={problem.isDone ? "primary" : "success"}
                onClick={() => onToggleDone(problem.id)}
                title={problem.isDone ? "Mark as undone" : "Mark as done"}
              >
                {problem.isDone ? <FiX size={16} /> : <FiCheck size={16} />}
              </IconButton>
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

          {problem.tags.length > 0 && (
            <TagsContainer>
              {problem.tags.map((tag) => (
                <Tag key={tag.id} isCustom={tag.isCustom}>
                  {tag.name}
                </Tag>
              ))}
            </TagsContainer>
          )}

          {problem.notes && (
            <NotesPreview>{stripHtmlTags(problem.notes)}</NotesPreview>
          )}
        </ProblemCard>
      ))}
    </ProblemsGrid>
  );
};
