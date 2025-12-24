import React, { memo, useCallback } from "react";
import { ButtonSecondary, FormGroup, Label } from "../../sharedStyles";
import { StyledTag, TagsContainer } from "./TaskForm.styles";
import { useSelector } from "react-redux";
import {
  removeTag,
  selectTagsBySelectedGroup,
  useAppDispatch,
} from "../../store";
import { FiX } from "react-icons/fi";
import { AddCustomTag } from "./AddCustomTag";
import { DIFFICULTY_TAGS, type Tag } from "../../model";

type TagInputProps = {
  readonly selectedTags: ReadonlySet<string>;
  readonly setSelectedTags: (
    value: React.SetStateAction<ReadonlySet<string>>
  ) => void;
};

export const TagInput = memo<TagInputProps>(
  ({ selectedTags, setSelectedTags }) => {
    const tagsByGroup = useSelector(selectTagsBySelectedGroup);
    const dispatch = useAppDispatch();

    const handleTagToggle = useCallback(
      (tag: Tag) => {
        const tagId = tag.id;

        setSelectedTags((prev) => {
          const next = new Set(prev);
          if (next.has(tagId)) {
            next.delete(tagId);
          } else {
            next.add(tagId);
          }
          return next;
        });
      },
      [setSelectedTags]
    );

    const handleRemoveTag = useCallback(
      (tag: Tag) => {
        if (
          window.confirm(
            `Are you sure you want to delete ${tag.name} tag? It will be removed from all tasks in this group.`
          )
        ) {
          dispatch(removeTag(tag.id));
        }
      },
      [dispatch]
    );

    return (
      <FormGroup>
        <Label>Tags</Label>
        <TagsContainer>
          {tagsByGroup.map((tag) => {
            if (
              DIFFICULTY_TAGS.some(
                (difficultyTag) => difficultyTag.id === tag.id
              )
            )
              return null;

            return (
              <StyledTag
                key={tag.id}
                selected={selectedTags.has(tag.id)}
                isCustom={tag.isCustom}
                onClick={() => handleTagToggle(tag)}
              >
                {tag.name}
                {tag.isCustom && (
                  <ButtonSecondary
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <FiX size={14} />
                  </ButtonSecondary>
                )}
              </StyledTag>
            );
          })}
        </TagsContainer>

        <AddCustomTag />
      </FormGroup>
    );
  }
);
