import React, { memo, useCallback, useMemo, useState } from "react";
import {
  DIFFICULTY_TAGS,
  DifficultyTagId,
  type PreparationTask,
  type Tag,
} from "../../model";
import { DSA_SPECIFIC_TAGS } from "../../constants";
import {
  Button,
  FormGroup,
  ModalActions,
  ModalContent,
  ModalOverlay,
} from "../../sharedStyles";
import { useTaskUtility } from "../../context";
import { Editor } from "primereact/editor";
import {
  FooterActionContainer,
  FormContainer,
  StyledCloseButton,
  StyledTag,
  TagsContainer,
  TaskFormHeading,
} from "./TaskForm.styles";
import { AddCustomTag } from "./AddCustomTag";
import { FiX } from "react-icons/fi";
import { css } from "@emotion/css";

interface TaskFormProps {
  readonly selectedGroupId: string;
  readonly currentTaskInFormModal: PreparationTask | null;
  readonly onClose: () => void;
}

export const TaskForm = memo<TaskFormProps>(
  ({ currentTaskInFormModal, onClose, selectedGroupId }) => {
    const [title, setTitle] = useState<string>(
      currentTaskInFormModal?.title || ""
    );
    const [link, setLink] = useState<string | null>(
      currentTaskInFormModal?.link || null
    );
    const [notes, setNotes] = useState<string>(
      currentTaskInFormModal?.notes || ""
    );
    const [difficulty, setDifficulty] = useState<DifficultyTagId>(
      currentTaskInFormModal?.difficulty || DifficultyTagId.EASY
    );
    const [selectedTags, setSelectedTags] = useState<ReadonlyArray<Tag>>(
      currentTaskInFormModal?.tags || []
    );

    const {
      tasks,
      customTags,
      deleteCustomTag,
      updateTask,
      addTask,
      deleteTask,
    } = useTaskUtility();

    const isNewTaskBeingAdded = !currentTaskInFormModal;

    const tagsByGroup: ReadonlyArray<Tag> = useMemo(() => {
      return [
        ...DSA_SPECIFIC_TAGS.filter((tag) => tag.groupId === selectedGroupId),
        ...customTags.filter((tag) => tag.groupId === selectedGroupId),
      ];
    }, [customTags, selectedGroupId]);

    const handleDelete = useCallback(() => {
      if (currentTaskInFormModal) {
        if (
          window.confirm(
            "Are you sure you want to delete this task? This action cannot be undone."
          )
        ) {
          deleteTask(currentTaskInFormModal.id);
          onClose();
        }
      }
    }, [currentTaskInFormModal, deleteTask, onClose]);

    const handleTagToggle = (tag: Tag) => {
      setSelectedTags((prev) => {
        const exists = prev.find((t) => t.id === tag.id);
        if (exists) {
          return prev.filter((t) => t.id !== tag.id);
        } else {
          return [...prev, tag];
        }
      });
    };

    const handleDifficultyTagToggle = (tag: Tag<DifficultyTagId>) => {
      setDifficulty(tag.id);
    };

    const handleRemoveTag = useCallback(
      (tagId: string) => {
        if (
          window.confirm(
            "Are you sure you want to delete this tag? It will be removed from all tasks in this group."
          )
        ) {
          deleteCustomTag(tagId);
          setSelectedTags((prev) => prev.filter((t) => t.id !== tagId));
        }
      },
      [deleteCustomTag]
    );

    const submitNewTask = useCallback(
      (task: PreparationTask) => {
        if (currentTaskInFormModal) {
          updateTask(task);
        } else {
          addTask(task);
        }
        onClose();
      },
      [addTask, currentTaskInFormModal, onClose, updateTask]
    );

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
          alert("Please enter a task title");
          return;
        }

        const now = Date.now();
        let taskData: PreparationTask;
        if (isNewTaskBeingAdded) {
          taskData = {
            id: `${selectedGroupId}-${Date.now()}`,
            groupId: selectedGroupId,
            title: title.trim(),
            link: link,
            difficulty,
            tags: selectedTags,
            notes: notes,
            isDone: false,
            createdAt: now,
            updatedAt: now,
            order: tasks.length,
          };
        } else {
          taskData = {
            id: currentTaskInFormModal.id,
            groupId: selectedGroupId,
            title: title.trim(),
            difficulty,
            link: link,
            tags: selectedTags,
            notes: notes,
            isDone: currentTaskInFormModal.isDone || false,
            createdAt: currentTaskInFormModal.createdAt,
            updatedAt: now,
            order: currentTaskInFormModal.order,
          };
        }

        submitNewTask(taskData);
      },
      [
        currentTaskInFormModal,
        isNewTaskBeingAdded,
        notes,
        submitNewTask,
        selectedGroupId,
        selectedTags,
        tasks.length,
        title,
        link,
        difficulty,
      ]
    );

    return (
      <ModalOverlay onClick={onClose}>
        <ModalContent
          onClick={(e) => e.stopPropagation()}
          className={css`
            height: 100%;
          `}
        >
          <TaskFormHeading>
            {isNewTaskBeingAdded ? "Add New Task" : "Edit Task"}
            <StyledCloseButton
              type="button"
              variant="secondary"
              onClick={onClose}
              className={css`
                background: none;
              `}
            >
              <FiX size={16} />
            </StyledCloseButton>
          </TaskFormHeading>
          <FormContainer>
            <form>
              <FormGroup>
                <label htmlFor="task-title">Title *</label>
                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Binary Search or Max Depth of Binary Tree"
                  required
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="task-link">Link</label>
                <input
                  id="task-link"
                  type="text"
                  value={link ?? ""}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://leetcode.com/problems/..."
                />
              </FormGroup>

              <FormGroup>
                <label>Difficulty Level *</label>
                <TagsContainer>
                  {DIFFICULTY_TAGS.map((tag) => (
                    <StyledTag
                      key={tag.id}
                      selected={difficulty === tag.id}
                      isCustom={tag.isCustom}
                      onClick={() => handleDifficultyTagToggle(tag)}
                    >
                      {tag.name}
                    </StyledTag>
                  ))}
                </TagsContainer>
              </FormGroup>

              <FormGroup>
                <label>Tags</label>
                <TagsContainer>
                  {tagsByGroup.map((tag) => (
                    <StyledTag
                      key={tag.id}
                      selected={selectedTags.some((t) => t.id === tag.id)}
                      isCustom={tag.isCustom}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag.name}
                      {tag.isCustom && (
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag.id)}
                        >
                          <FiX size={14} />
                        </button>
                      )}
                    </StyledTag>
                  ))}
                </TagsContainer>

                <AddCustomTag />
              </FormGroup>

              <FormGroup>
                <label>Notes</label>
                <Editor
                  value={notes}
                  onTextChange={(e) => setNotes(e.htmlValue || "")}
                  style={{ height: "300px" }}
                />
              </FormGroup>
            </form>
          </FormContainer>
          <FooterActionContainer>
            <ModalActions
              className={css`
                margin: 0;
              `}
            >
              <Button type="button" variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button type="submit" variant="primary" onClick={handleSubmit}>
                {isNewTaskBeingAdded ? "Add Task" : "Update Task"}
              </Button>
            </ModalActions>
          </FooterActionContainer>
        </ModalContent>
      </ModalOverlay>
    );
  }
);
