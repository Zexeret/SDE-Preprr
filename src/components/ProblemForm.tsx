import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { FiX, FiPlus } from "react-icons/fi";
import type { PreparationTask, Tag } from "../types";
import { generateId } from "../utils";
import { PREDEFINED_TAGS } from "../constants";
import {
  FormGroup,
  TagsContainer,
  Tag as StyledTag,
  TagWithDelete,
  Button,
  ModalActions,
} from "../styled";

interface TaskFormProps {
  readonly task?: PreparationTask;
  readonly customTags: ReadonlyArray<Tag>;
  readonly groupId: string;
  readonly onSubmit: (task: PreparationTask) => void;
  readonly onCancel: () => void;
  readonly onAddCustomTag: (tag: Tag) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  task,
  customTags,
  groupId,
  onSubmit,
  onCancel,
  onAddCustomTag,
}) => {
  const [link, setLink] = useState(task?.link || "");
  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<Tag>>(
    task?.tags || []
  );
  const [notes, setNotes] = useState(task?.notes || "");
  const [newTagName, setNewTagName] = useState("");
  const [showCustomTagInput, setShowCustomTagInput] = useState(false);

  const difficultyTags = PREDEFINED_TAGS.filter((tag) =>
    ["easy", "medium", "hard"].includes(tag.id)
  );
  const topicTags = PREDEFINED_TAGS.filter(
    (tag) => !["easy", "medium", "hard"].includes(tag.id)
  );

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

  const handleRemoveTag = (tagId: string) => {
    setSelectedTags((prev) => prev.filter((t) => t.id !== tagId));
  };

  const handleAddCustomTag = () => {
    if (!newTagName.trim()) return;

    const tagId = newTagName.toLowerCase().replace(/\s+/g, "-");
    const newTag: Tag = {
      id: `custom-${tagId}-${Date.now()}`,
      name: newTagName.trim(),
      isCustom: true,
    };

    onAddCustomTag(newTag);
    setSelectedTags((prev) => [...prev, newTag]);
    setNewTagName("");
    setShowCustomTagInput(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!link.trim()) {
      alert("Please enter a task link or title");
      return;
    }

    // Check if at least one difficulty tag is selected
    const hasDifficultyTag = selectedTags.some((tag) =>
      ["easy", "medium", "hard"].includes(tag.id)
    );

    if (!hasDifficultyTag) {
      alert(
        "Please select at least one difficulty level (Easy, Medium, or Hard)"
      );
      return;
    }

    const now = Date.now();
    const taskData: PreparationTask = {
      id: task?.id || generateId(),
      groupId: task?.groupId || groupId,
      link: link.trim(),
      tags: selectedTags,
      notes,
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
        <label htmlFor="task-link">Task Link / Title *</label>
        <input
          id="task-link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://leetcode.com/problems/... or Theory: Binary Search"
          required
        />
      </FormGroup>

      <FormGroup>
        <label>Difficulty Level *</label>
        <TagsContainer>
          {difficultyTags.map((tag) => (
            <StyledTag
              key={tag.id}
              selected={selectedTags.some((t) => t.id === tag.id)}
              isCustom={tag.isCustom}
              onClick={() => handleTagToggle(tag)}
            >
              {tag.name}
            </StyledTag>
          ))}
        </TagsContainer>
      </FormGroup>

      <FormGroup>
        <label>Tags</label>
        <TagsContainer>
          {topicTags.map((tag) => (
            <StyledTag
              key={tag.id}
              selected={selectedTags.some((t) => t.id === tag.id)}
              isCustom={tag.isCustom}
              onClick={() => handleTagToggle(tag)}
            >
              {tag.name}
            </StyledTag>
          ))}
          {customTags.map((tag) => (
            <StyledTag
              key={tag.id}
              selected={selectedTags.some((t) => t.id === tag.id)}
              isCustom={tag.isCustom}
              onClick={() => handleTagToggle(tag)}
            >
              {tag.name}
            </StyledTag>
          ))}
          {!showCustomTagInput && (
            <StyledTag onClick={() => setShowCustomTagInput(true)}>
              <FiPlus size={12} style={{ marginRight: "4px" }} />
              Add Custom
            </StyledTag>
          )}
        </TagsContainer>

        {showCustomTagInput && (
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Enter custom tag name"
              style={{ flex: 1 }}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustomTag();
                }
              }}
            />
            <Button
              type="button"
              variant="primary"
              onClick={handleAddCustomTag}
            >
              Add
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setShowCustomTagInput(false);
                setNewTagName("");
              }}
            >
              Cancel
            </Button>
          </div>
        )}

        {selectedTags.length > 0 && (
          <div style={{ marginTop: "1rem" }}>
            <div
              style={{
                fontSize: "0.875rem",
                marginBottom: "0.5rem",
                color: "#94a3b8",
              }}
            >
              Selected Tags:
            </div>
            <TagsContainer>
              {selectedTags.map((tag) => (
                <TagWithDelete key={tag.id}>
                  {tag.name}
                  <button type="button" onClick={() => handleRemoveTag(tag.id)}>
                    <FiX size={14} />
                  </button>
                </TagWithDelete>
              ))}
            </TagsContainer>
          </div>
        )}
      </FormGroup>

      <FormGroup>
        <label>Notes</label>
        <Editor
          value={notes}
          onTextChange={(e) => setNotes(e.htmlValue || "")}
          style={{ height: "300px" }}
        />
      </FormGroup>

      <ModalActions>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary">
          {task ? "Update Task" : "Add Task"}
        </Button>
      </ModalActions>
    </form>
  );
};

// Keep old export name for backward compatibility
export const ProblemForm = TaskForm;
