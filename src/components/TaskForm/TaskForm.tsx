import React, { useState, useMemo } from "react";
import { Editor } from "primereact/editor";
import { FiX, FiPlus, FiTrash2 } from "react-icons/fi";
import { cx } from "@emotion/css";
import type { PreparationTask, Tag } from "../../model";
import { generateId } from "../../utils";
import {
  DIFFICULTY_TAGS,
  DSA_SPECIFIC_TAGS,
  DIFFICULTY_TAG_IDS,
} from "../../constants/index";
import {
  buttonPrimaryStyles,
  buttonSecondaryStyles,
  buttonDangerStyles,
} from "../../styles";
import {
  formGroupStyles,
  tagsContainerStyles,
  tagButtonStyles,
  tagButtonSelectedStyles,
  tagButtonCustomStyles,
  tagWithDeleteStyles,
  tagWithDeleteCustomStyles,
  customTagInputContainerStyles,
  selectedTagsSectionStyles,
  selectedTagsLabelStyles,
  modalActionsStyles,
  customTagsHeaderStyles,
  customTagsLabelContainerStyles,
  customTagsInfoStyles,
} from "./TaskForm.styles";

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
  const [link, setLink] = useState(task?.link || "");
  const [selectedTags, setSelectedTags] = useState<ReadonlyArray<Tag>>(
    task?.tags || []
  );
  const [notes, setNotes] = useState(task?.notes || "");
  const [newTagName, setNewTagName] = useState("");
  const [showCustomTagInput, setShowCustomTagInput] = useState(false);

  // Get topic tags based on current group
  const topicTags = useMemo(() => {
    const groupCustomTags = customTags.filter((tag) => tag.groupId === groupId);

    if (groupId === "dsa") {
      return [...DSA_SPECIFIC_TAGS, ...groupCustomTags];
    }

    return groupCustomTags;
  }, [customTags, groupId]);

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

  const handleDeleteCustomTag = (tagId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this tag? It will be removed from all tasks in this group."
      )
    ) {
      onDeleteCustomTag(tagId);
      handleRemoveTag(tagId);
    }
  };

  const handleAddCustomTag = () => {
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
    setShowCustomTagInput(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!link.trim()) {
      alert("Please enter a task link or title");
      return;
    }

    const hasDifficultyTag = selectedTags.some((tag) =>
      DIFFICULTY_TAG_IDS.includes(tag.id as any)
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

  const groupCustomTags = topicTags.filter((tag) => tag.isCustom);

  return (
    <form onSubmit={handleSubmit}>
      <div className={formGroupStyles}>
        <label htmlFor="task-link">Task Link / Title *</label>
        <input
          id="task-link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://leetcode.com/problems/... or Theory: Binary Search"
          required
        />
      </div>

      <div className={formGroupStyles}>
        <label>Difficulty Level *</label>
        <div className={tagsContainerStyles}>
          {DIFFICULTY_TAGS.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={cx(
                selectedTags.some((t) => t.id === tag.id)
                  ? tagButtonSelectedStyles
                  : tagButtonStyles
              )}
              onClick={() => handleTagToggle(tag)}
            >
              {tag.name}
            </button>
          ))}
        </div>
      </div>

      <div className={formGroupStyles}>
        <div className={customTagsHeaderStyles}>
          <div className={customTagsLabelContainerStyles}>
            <label>Tags</label>
            {groupId !== "dsa" && topicTags.length === 0 && (
              <span className={customTagsInfoStyles}>
                (Add custom tags for this group)
              </span>
            )}
          </div>
        </div>
        <div className={tagsContainerStyles}>
          {topicTags
            .filter((tag) => !tag.isCustom)
            .map((tag) => (
              <button
                key={tag.id}
                type="button"
                className={cx(
                  selectedTags.some((t) => t.id === tag.id)
                    ? tagButtonSelectedStyles
                    : tagButtonStyles
                )}
                onClick={() => handleTagToggle(tag)}
              >
                {tag.name}
              </button>
            ))}
          {groupCustomTags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              className={cx(
                selectedTags.some((t) => t.id === tag.id)
                  ? tagButtonSelectedStyles
                  : tagButtonCustomStyles
              )}
              onClick={() => handleTagToggle(tag)}
            >
              {tag.name}
            </button>
          ))}
          {!showCustomTagInput && (
            <button
              type="button"
              className={tagButtonStyles}
              onClick={() => setShowCustomTagInput(true)}
            >
              <FiPlus size={12} />
              Add Custom
            </button>
          )}
        </div>

        {showCustomTagInput && (
          <div className={customTagInputContainerStyles}>
            <input
              type="text"
              value={newTagName}
              onChange={(e) => setNewTagName(e.target.value)}
              placeholder="Enter custom tag name"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddCustomTag();
                }
              }}
            />
            <button
              type="button"
              className={buttonPrimaryStyles}
              onClick={handleAddCustomTag}
            >
              Add
            </button>
            <button
              type="button"
              className={buttonSecondaryStyles}
              onClick={() => {
                setShowCustomTagInput(false);
                setNewTagName("");
              }}
            >
              Cancel
            </button>
          </div>
        )}

        {selectedTags.length > 0 && (
          <div className={selectedTagsSectionStyles}>
            <div className={selectedTagsLabelStyles}>Selected Tags:</div>
            <div className={tagsContainerStyles}>
              {selectedTags.map((tag) => (
                <div
                  key={tag.id}
                  className={
                    tag.isCustom
                      ? tagWithDeleteCustomStyles
                      : tagWithDeleteStyles
                  }
                >
                  {tag.name}
                  <button type="button" onClick={() => handleRemoveTag(tag.id)}>
                    <FiX size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {groupCustomTags.length > 0 && (
          <div className={selectedTagsSectionStyles}>
            <div className={selectedTagsLabelStyles}>
              Manage Custom Tags for this Group:
            </div>
            <div className={tagsContainerStyles}>
              {groupCustomTags.map((tag) => (
                <div key={tag.id} className={tagWithDeleteCustomStyles}>
                  {tag.name}
                  <button
                    type="button"
                    onClick={() => handleDeleteCustomTag(tag.id)}
                    title="Delete this tag permanently"
                  >
                    <FiTrash2 size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={formGroupStyles}>
        <label>Notes</label>
        <Editor
          value={notes}
          onTextChange={(e) => setNotes(e.htmlValue || "")}
          style={{ height: "300px" }}
        />
      </div>

      <div className={modalActionsStyles}>
        <button
          type="button"
          className={buttonSecondaryStyles}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button type="submit" className={buttonPrimaryStyles}>
          {task ? "Update Task" : "Add Task"}
        </button>
      </div>
    </form>
  );
};
