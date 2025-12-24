import { memo } from "react";
import { FormGroup, Label } from "../../sharedStyles";
import { StyledTag, TagsContainer } from "./TaskForm.styles";
import { DIFFICULTY_TAGS, DifficultyTagId } from "../../model";
import { useSelector } from "react-redux";
import { selectModeInTaskModal } from "../../store";

type DifficultyTagInputProps = {
  readonly difficulty: DifficultyTagId;
  readonly setDifficulty: (value: DifficultyTagId) => void;
};

export const DifficultyTagInput = memo<DifficultyTagInputProps>(
  ({ difficulty, setDifficulty }) => {
    const isViewMode = useSelector(selectModeInTaskModal) === 'view';
    return (
      <FormGroup>
        <Label>Difficulty Level {isViewMode ? '' : '*'}</Label>
        <TagsContainer>
          {DIFFICULTY_TAGS.map((tag) => (
            <StyledTag
              key={tag.id}
              selected={difficulty === tag.id}
              isCustom={tag.isCustom}
              onClick={() => setDifficulty(tag.id)}
              $readonly={isViewMode}
            >
              {tag.name}
            </StyledTag>
          ))}
        </TagsContainer>
      </FormGroup>
    );
  }
);
