import React, { memo, useCallback, useMemo, useState } from "react";
import {
  DIFFICULTY_TAGS,
  DifficultyTagId,
  DSA_SPECIFIC_TAGS,
  type PreparationTask,
  type Tag,
} from "../../model";
import {
  ButtonDanger,
  ButtonPrimary,
  ButtonSecondary,
  FormGroup,
  ModalActions,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Label,
  Input,
} from "../../sharedStyles/shared.styles";
import { useTaskUtility } from "../../context";
import { Editor } from "primereact/editor";
import {
  FooterActionContainer,
  FormContainer,
  StyledTag,
  TagsContainer,
} from "./TaskForm.styles";
import { AddCustomTag } from "./AddCustomTag";
import { FiX } from "react-icons/fi";
import { generateId } from "../../utils";

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
    const [selectedTags, setSelectedTags] = useState<ReadonlyArray<string>>(
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
        const exists = prev.find((t) => t === tag.id);
        if (exists) {
          return prev.filter((t) => t !== tag.id);
        } else {
          return [...prev, tag.id];
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
          setSelectedTags((prev) => prev.filter((t) => t !== tagId));
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
            id: generateId("task"),
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
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <ModalHeader>
            <ModalTitle>
              {isNewTaskBeingAdded ? "Add New Task" : "Edit Task"}
            </ModalTitle>
            <CloseButton onClick={onClose}>
              <FiX />
            </CloseButton>
          </ModalHeader>

          <FormContainer>
            <form>
              <FormGroup>
                <Label htmlFor="task-title">Title *</Label>
                <Input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Binary Search or Max Depth of Binary Tree"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="task-link">Link</Label>
                <Input
                  id="task-link"
                  type="text"
                  value={link ?? ""}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="https://leetcode.com/problems/..."
                />
              </FormGroup>

              <FormGroup>
                <Label>Difficulty Level *</Label>
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
                <Label>Tags</Label>
                <TagsContainer>
                  {tagsByGroup.map((tag) => (
                    <StyledTag
                      key={tag.id}
                      selected={selectedTags.some((t) => t === tag.id)}
                      isCustom={tag.isCustom}
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag.name}
                      {tag.isCustom && (
                        <ButtonSecondary
                          type="button"
                          onClick={() => handleRemoveTag(tag.id)}
                        >
                          <FiX size={14} />
                        </ButtonSecondary>
                      )}
                    </StyledTag>
                  ))}
                </TagsContainer>

                <AddCustomTag />
              </FormGroup>

              <FormGroup>
                <Label>Notes</Label>
                <Editor
                  value={notes}
                  onTextChange={(e) => setNotes(e.htmlValue || "")}
                  style={{ height: "300px" }}
                />
              </FormGroup>
            </form>
          </FormContainer>

          <FooterActionContainer>
            <ModalActions>
              {currentTaskInFormModal ? (
                <ButtonDanger onClick={handleDelete}>Delete</ButtonDanger>
              ) : (
                <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
              )}

              <ButtonPrimary onClick={handleSubmit}>
                {isNewTaskBeingAdded ? "Add Task" : "Update Task"}
              </ButtonPrimary>
            </ModalActions>
          </FooterActionContainer>
        </ModalContent>
      </ModalOverlay>
    );
  }
);
