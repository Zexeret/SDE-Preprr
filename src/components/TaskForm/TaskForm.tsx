import React, { useState } from "react";
import { FiPlus, FiX, FiCheck } from "react-icons/fi";
import styled from "@emotion/styled";
import type { PreparationTask, Tag } from "../../model";
import { DIFFICULTY_TAGS } from "../../constants/index";
import { type Theme } from "../../theme";
import {
  ButtonPrimary,
  ButtonSecondary,
  ButtonIcon,
  FormGroup,
  ModalActions,
} from "../../styles";

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const TagButton = styled.button<{
  theme: Theme;
  color?: string;
  selected?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.375rem 0.625rem;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
  border: 1px solid;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${(props) =>
    props.selected ? props.color || props.theme.colors.primary : "transparent"};
  color: ${(props) =>
    props.selected ? "white" : props.color || props.theme.colors.primary};
  border-color: ${(props) => props.color || props.theme.colors.primary};

  &:hover {
    background: ${(props) => props.color || props.theme.colors.primary};
    color: white;
  }
`;

const CustomTagInput = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: flex-end;
`;

interface TaskFormProps {
  readonly task?: PreparationTask;
  readonly customTags: ReadonlyArray<Tag>;
  readonly groupId: string;
  readonly onSubmit: (task: PreparationTask) => void;
  readonly onCancel: () => void;
  readonly onAddCustomTag: (tag: Tag) => void;
  readonly onDeleteCustomTag: (tagId: string) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  customTags,
  groupId,
  onSubmit,
  onCancel,
  onAddCustomTag,
  onDeleteCustomTag,
}) => {
  const [title, setTitle] = useState(task?.link || "");
  const [description, setDescription] = useState(task?.notes || "");
  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<Tag>>(
    task?.tags || []
  );
  const [newTagName, setNewTagName] = useState("");

  const handleToggleTag = (tag: Tag) => {
    setSelectedTags((prev) => {
      const exists = prev.find((t) => t.id === tag.id);
      if (exists) {
        return prev.filter((t) => t.id !== tag.id);
      } else {
        return [...prev, tag];
      }
    });
  };

  const handleDeleteCustomTag = (tagId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this tag? It will be removed from all tasks in this group."
      )
    ) {
      onDeleteCustomTag(tagId);
      setSelectedTags((prev) => prev.filter((t) => t.id !== tagId));
    }
  };

  const handleAddTag = () => {
    if (!newTagName.trim()) return;

    const tagId = newTagName.toLowerCase().replace(/\s+/g, "-");
    const newTag: Tag = {
      id: `custom-${tagId}-${Date.now()}`,
      name: newTagName.trim(),
      isCustom: true,
      groupId: groupId,
    };

    onAddCustomTag(newTag);
    setSelectedTags((prev) => [...prev, newTag]);
    setNewTagName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a task title");
      return;
    }

    const hasDifficultyTag = selectedTags.some((tag) =>
      DIFFICULTY_TAGS.some((difficultyTag) => difficultyTag.id === tag.id)
    );

    if (!hasDifficultyTag) {
      alert(
        "Please select at least one difficulty level (Easy, Medium, or Hard)"
      );
      return;
    }

    const now = Date.now();
    const taskData: PreparationTask = {
      id: task?.id || `${groupId}-${Date.now()}`,
      groupId: task?.groupId || groupId,
      link: title.trim(),
      tags: selectedTags,
      notes: description,
      isDone: task?.isDone || false,
      createdAt: task?.createdAt || now,
      updatedAt: now,
      order: task?.order || 0,
    };

    onSubmit(taskData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label>Title *</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Implement Binary Search"
          required
        />
      </FormGroup>

      <FormGroup>
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add details about this task..."
        />
      </FormGroup>

      <FormGroup>
        <label>Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add implementation notes, tips, or resources..."
        />
      </FormGroup>

      <FormGroup>
        <label>Resources (Optional)</label>
        <input
          type="text"
          value={newResource}
          onChange={(e) => setNewResource(e.target.value)}
          onKeyPress={handleResourceKeyPress}
          placeholder="Add URL or resource (press Enter)"
        />
        {resources.length > 0 && (
          <div className={resourceListStyles}>
            {resources.map((resource, index) => (
              <div key={index} className={resourceItemStyles}>
                <span>{resource}</span>
                <ButtonIcon
                  type="button"
                  onClick={() => handleRemoveResource(index)}
                  aria-label="Remove resource"
                >
                  <FiX size={14} />
                </ButtonIcon>
              </div>
            ))}
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <label>Tags</label>
        <div className={tagSelectorStyles}>
          <div className={tagListStyles}>
            {availableTags.map((tag) => (
              <button
                key={tag.id}
                type="button"
                onClick={() => handleToggleTag(tag)}
                className={cx(
                  tagOptionStyles,
                  selectedTags.some((t) => t.id === tag.id) &&
                    tagOptionSelectedStyles
                )}
              >
                {tag.name}
              </button>
            ))}
          </div>
          <div className={customTagInputContainerStyles}>
            <input
              type="text"
              value={newCustomTag}
              onChange={(e) => setNewCustomTag(e.target.value)}
              onKeyPress={handleCustomTagKeyPress}
              placeholder="Add custom tag (press Enter)"
              className={customTagInputStyles}
            />
          </div>
        </div>
      </FormGroup>

      <ModalActions>
        <ButtonSecondary type="button" onClick={onCancel}>
          Cancel
        </ButtonSecondary>
        <ButtonPrimary type="submit">
          {task ? "Update Task" : "Add Task"}
        </ButtonPrimary>
      </ModalActions>
    </form>
  );
};
