import { memo, useCallback, useMemo } from "react";
import {
  ContentActions,
  ContentHeaderContainer,
  ContentSubtitle,
  ContentTitle,
} from "./ContentHeader.styles";
import { ButtonPrimary } from "../../styles";
import { FiPlus } from "react-icons/fi";
import { PREDEFINED_GROUPS } from "../../constants";
import { useTaskUtility } from "../../context";
import type { PreparationTask } from "../../model";

type ContentHeaderProps = {
  readonly openAddTaskModal: (task: PreparationTask | null) => void;
};

export const ContentHeader = memo<ContentHeaderProps>(
  ({ openAddTaskModal }) => {
    const { customGroups, selectedGroupId } = useTaskUtility();

    const allGroups = useMemo(
      () => [...PREDEFINED_GROUPS, ...customGroups],
      [customGroups]
    );

    const currentSelectedGroup = useMemo(
      () =>
        selectedGroupId
          ? allGroups.find((g) => g.id === selectedGroupId)
          : null,
      [allGroups, selectedGroupId]
    );

    const handleAddTask = useCallback(() => {
      openAddTaskModal(null);
    }, [openAddTaskModal]);

    if (!currentSelectedGroup) {
      return null;
    }

    return (
      <ContentHeaderContainer>
        <ContentTitle>{currentSelectedGroup.name}</ContentTitle>
        <ContentSubtitle>
          Manage your {currentSelectedGroup.name.toLowerCase()} preparation
          tasks
        </ContentSubtitle>
        <ContentActions>
          <ButtonPrimary onClick={handleAddTask}>
            <FiPlus size={16} />
            Add Task
          </ButtonPrimary>
        </ContentActions>
      </ContentHeaderContainer>
    );
  }
);
