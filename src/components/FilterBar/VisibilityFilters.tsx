import { ButtonPrimary, ButtonSecondary } from "../../sharedStyles";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { VisibilityControls } from "./VisibilityFilters.styles";
import { useSelector } from "react-redux";
import {
  selectShowDifficultyFilter,
  selectShowTagFilter,
  setShowDifficultyFilter,
  setShowTagFilter,
  useAppDispatch,
} from "../../store";
import { memo, useCallback } from "react";

const RenderVisibilityToggle = ({
  visible,
  onClick,
  suffix,
}: {
  readonly visible: boolean;
  readonly suffix: string;
  readonly onClick: () => void;
}) => {
  const Icon = visible ? FiEye : FiEyeOff;
  const label = visible ? "Hide" : "Show";
  const ButtonComponent = visible ? ButtonPrimary : ButtonSecondary;

  return (
    <ButtonComponent onClick={onClick}>
      {label} {suffix}
      <Icon size={16} />
    </ButtonComponent>
  );
};

export const VisibilityFilters = memo(() => {
  const showTags = useSelector(selectShowTagFilter);
  const showDifficulty = useSelector(selectShowDifficultyFilter);
  const dispatch = useAppDispatch();

  const handleToggleTagVisibility = useCallback(() => {
    dispatch(setShowTagFilter(!showTags));
  }, [dispatch, showTags]);

  const handleToggleDifficultyVisibility = useCallback(() => {
    dispatch(setShowDifficultyFilter(!showDifficulty));
  }, [dispatch, showDifficulty]);
  return (
    <>
      <VisibilityControls>
        <RenderVisibilityToggle
          onClick={handleToggleTagVisibility}
          visible={showTags}
          suffix="Tags"
        />
        <RenderVisibilityToggle
          onClick={handleToggleDifficultyVisibility}
          visible={showDifficulty}
          suffix="Difficulty"
        />
      </VisibilityControls>
    </>
  );
});
