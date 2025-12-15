import React from "react";
import { ButtonPrimary, ButtonSecondary } from "../../sharedStyles";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { VisibilityControls } from "./VisibilityFilters.styles";
import { useFilterContext } from "./useFilterContext";

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

export const VisibilityFilters = () => {
  const { setShowTags, showTags, setShowDifficulty, showDifficulty } =
    useFilterContext();
  return (
    <>
      <VisibilityControls>
        <RenderVisibilityToggle
          onClick={() => setShowTags(!showTags)}
          visible={showTags}
          suffix="Tags"
        />
        <RenderVisibilityToggle
          onClick={() => setShowDifficulty(!showDifficulty)}
          visible={showDifficulty}
          suffix="Difficulty"
        />
      </VisibilityControls>
    </>
  );
};
