import React, { memo } from "react";
import {
  ContentActions,
  ContentHeaderContainer,
  ContentSubtitle,
  ContentTitle,
} from "./ContentHeader.styles";
import { ButtonPrimary } from "../../styles";
import { FiPlus } from "react-icons/fi";
import type { Group } from "../../model";

type ContentHeaderProps = {
  readonly currentSelectedGroup: Group;
  readonly openAddTaskModal: () => void;
};

export const ContentHeader = memo<ContentHeaderProps>(
  ({ openAddTaskModal, currentSelectedGroup }) => {
    return (
      <ContentHeaderContainer>
        <ContentTitle>{currentSelectedGroup.name}</ContentTitle>
        <ContentSubtitle>
          Manage your {currentSelectedGroup.name.toLowerCase()} preparation
          tasks
        </ContentSubtitle>
        <ContentActions>
          <ButtonPrimary onClick={openAddTaskModal}>
            <FiPlus size={16} />
            Add Task
          </ButtonPrimary>
        </ContentActions>
      </ContentHeaderContainer>
    );
  }
);
