import { memo, useCallback } from "react";
import {
  ContentActions,
  ContentHeaderContainer,
  ContentSubtitle,
  ContentTitle,
} from "./ContentHeader.styles";
import { FiPlus } from "react-icons/fi";
import { type Group } from "../../model";
import { ButtonDanger, ButtonPrimary } from "../../sharedStyles";
import {
  openTaskModal,
  removeGroup,
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
        mode: "edit",
        taskId: null,
      })
    );
  }, [dispatch]);

  const handleGroupDelete = useCallback(() => {
    if (selectedGroup) {
      if (
        window.confirm(
          `Are you sure you want to delete ${selectedGroup.name} group? This will delete all your tasks and tags permanently and cant be recovered. `
        )
      ) {
        if (!selectedGroup.isCustom) {
          console.error(
            "Current group is not a custom group. Cannot be deleted."
          );
          return;
        }
        dispatch(removeGroup(selectedGroup.id));
      }
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
        <ButtonDanger
          onClick={handleGroupDelete}
          disabled={!selectedGroup.isCustom}
        >
          Delete Group
        </ButtonDanger>
        <ButtonPrimary onClick={handleAddTask}>
          <FiPlus size={16} />
          Add Task
        </ButtonPrimary>
      </ContentActions>
    </ContentHeaderContainer>
  );
});
