import { memo, useCallback, useMemo } from "react";
import {
  ContentActions,
  ContentHeaderContainer,
  ContentSubtitle,
  ContentTitle,
} from "./ContentHeader.styles";
import { FiPlus } from "react-icons/fi";
import { useTaskUtility } from "../../context";
import { PREDEFINED_GROUPS, type PreparationTask } from "../../model";
import { ButtonDanger, ButtonPrimary } from "../../sharedStyles";

type ContentHeaderProps = {
  readonly openAddTaskModal: (task: PreparationTask | null) => void;
};

export const ContentHeader = memo<ContentHeaderProps>(
  ({ openAddTaskModal }) => {
    const { customGroups, selectedGroupId, deleteCustomGroup } =
      useTaskUtility();

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

    const handleGroupDelete = useCallback(() => {
      if (selectedGroupId && currentSelectedGroup) {
        if (
          window.confirm(
            `Are you sure you want to delete ${currentSelectedGroup.name} group? This will delete all your tasks and tags permanently and cant be recovered. `
          )
        ) {
          deleteCustomGroup(selectedGroupId);
        }
      }
    }, [currentSelectedGroup, deleteCustomGroup, selectedGroupId]);

    if (!currentSelectedGroup) {
      return null;
    }

    return (
      <ContentHeaderContainer>
        <div>
          <ContentTitle>{currentSelectedGroup.name}</ContentTitle>
          <ContentSubtitle>
            Manage your {currentSelectedGroup.name.toLowerCase()} preparation
            tasks
          </ContentSubtitle>
        </div>
        <ContentActions>
          <ButtonDanger onClick={handleGroupDelete} disabled={!currentSelectedGroup.isCustom}>Delete Group</ButtonDanger>
          <ButtonPrimary onClick={handleAddTask}>
            <FiPlus size={16} />
            Add Task
          </ButtonPrimary>
        </ContentActions>
      </ContentHeaderContainer>
    );
  }
);
