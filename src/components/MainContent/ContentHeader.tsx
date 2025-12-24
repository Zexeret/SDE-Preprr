import { memo, useCallback } from "react";
import {
  ContentActions,
  ContentHeaderContainer,
  ContentSubtitle,
  ContentTitle,
} from "./ContentHeader.styles";
import { FiPlus } from "react-icons/fi";
import { type Group } from "../../model";
import { ButtonPrimary, ButtonSecondary } from "../../sharedStyles";
import {
  openGroupModal,
  openTaskModal,
  selectActiveGroup,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";

const getGroupDescription = (group: Group) => {
  return (
    group.description ??
    `Manage your ${group.name.toLocaleUpperCase()} preparation
            tasks`
  );
};

export const ContentHeader = memo(() => {
  const selectedGroup = useSelector(selectActiveGroup);
  const dispatch = useAppDispatch();

  const handleAddTask = useCallback(() => {
    dispatch(
      openTaskModal({
        isOpen: true,
        mode: "add",
        taskId: null,
      })
    );
  }, [dispatch]);

  const handleOpenGroupModal = useCallback(() => {
    if (selectedGroup) {
      dispatch(
        openGroupModal({
          isOpen: true,
          mode: "edit",
          groupId: selectedGroup.id,
        })
      );
    }
  }, [dispatch, selectedGroup]);

  if (!selectedGroup) {
    return null;
  }

  return (
    <ContentHeaderContainer>
      <div>
        <ContentTitle>{selectedGroup.name}</ContentTitle>
        <ContentSubtitle>{getGroupDescription(selectedGroup)}</ContentSubtitle>
      </div>
      <ContentActions>
        <ButtonSecondary
          onClick={handleOpenGroupModal}
          disabled={!selectedGroup.isCustom}
        >
          Edit Group
        </ButtonSecondary>
        <ButtonPrimary onClick={handleAddTask}>
          <FiPlus size={16} />
          Add Task
        </ButtonPrimary>
      </ContentActions>
    </ContentHeaderContainer>
  );
});
