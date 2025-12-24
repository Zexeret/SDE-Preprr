import { memo } from "react";
import { FormGroup, Label } from "../../sharedStyles";
import { StyledTag, TagsContainer } from "./TaskForm.styles";
import { DIFFICULTY_TAGS, DifficultyTagId } from "../../model";

type DifficultyTagInputProps = {
  readonly difficulty: DifficultyTagId;
  readonly setDifficulty: (value: DifficultyTagId) => void;
};

export const DifficultyTagInput = memo<DifficultyTagInputProps>(
  ({ difficulty, setDifficulty }) => {
    return (
      <FormGroup>
        <Label>Difficulty Level *</Label>
        <TagsContainer>
          {DIFFICULTY_TAGS.map((tag) => (
            <StyledTag
              key={tag.id}
              selected={difficulty === tag.id}
              isCustom={tag.isCustom}
              onClick={() => setDifficulty(tag.id)}
            >
              {tag.name}
            </StyledTag>
          ))}
        </TagsContainer>
      </FormGroup>
    );
  }
);
