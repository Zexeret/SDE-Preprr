import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { FiX, FiPlus } from "react-icons/fi";
import type { Problem, Tag } from "../types";
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

interface ProblemFormProps {
  problem?: Problem;
  customTags: Tag[];
  onSubmit: (problem: Problem) => void;
  onCancel: () => void;
  onAddCustomTag: (tag: Tag) => void;
}

export const ProblemForm: React.FC<ProblemFormProps> = ({
  problem,
  customTags,
  onSubmit,
  onCancel,
  onAddCustomTag,
}) => {
  const [link, setLink] = useState(problem?.link || "");
  const [selectedTags, setSelectedTags] = useState<Tag[]>(problem?.tags || []);
  const [notes, setNotes] = useState(problem?.notes || "");
  const [newTagName, setNewTagName] = useState("");
  const [showCustomTagInput, setShowCustomTagInput] = useState(false);

  const allTags = [...PREDEFINED_TAGS, ...customTags];

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
      alert("Please enter a problem link or title");
      return;
    }

    const now = Date.now();
    const problemData: Problem = {
      id: problem?.id || generateId(),
      link: link.trim(),
      tags: selectedTags,
      notes,
      isDone: problem?.isDone || false,
      createdAt: problem?.createdAt || now,
      updatedAt: now,
    };

    onSubmit(problemData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <label htmlFor="problem-link">Problem Link / Title *</label>
        <input
          id="problem-link"
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
          placeholder="https://leetcode.com/problems/... or Theory: Binary Search"
          required
        />
      </FormGroup>

      <FormGroup>
        <label>Tags</label>
        <TagsContainer>
          {allTags.map((tag) => (
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
          {problem ? "Update Problem" : "Add Problem"}
        </Button>
      </ModalActions>
    </form>
  );
};
