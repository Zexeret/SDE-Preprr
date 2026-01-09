import { memo, useCallback, useState } from "react";
import {
  ButtonPrimary,
  ButtonSecondary,
  FormGroup,
  ModalActions,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  ModalTitle,
  CloseButton,
  Input,
  Label,
  ButtonDanger,
} from "../../sharedStyles";
import type { Group } from "../../model";
import { FiX } from "react-icons/fi";
import { generateId } from "../../utils";
import {
  addGroup,
  closeGroupModal,
  removeGroup,
  selectActiveGroupInModal,
  selectGroupIdInModal,
  setSelectedGroupId,
  updateGroup,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";
import { getLogger } from "../../logger";
import { useDialog } from "../Dialog";

const log = getLogger("ui:group-modal");

export const AddGroupModal = memo(() => {
  const isAddMode = useSelector(selectGroupIdInModal) === null;
  const editingGroup = useSelector(selectActiveGroupInModal);
  const [newGroupName, setNewGroupName] = useState<string>(
    editingGroup?.name ?? ""
  );
  const [description, setGroupDescription] = useState<string>(
    editingGroup?.description ?? ""
  );

  const dispatch = useAppDispatch();

  const onCloseModal = useCallback(() => {
    dispatch(closeGroupModal());
  }, [dispatch]);

  const handleAddCustomGroup = useCallback(() => {
    if (!newGroupName.trim()) return;

    const newGroup: Group = {
      id: generateId("group"),
      description: description.trim(),
      name: newGroupName.trim(),
      isCustom: true,
      createdAt: Date.now(),
    };

    dispatch(addGroup(newGroup));
    dispatch(setSelectedGroupId(newGroup.id));

    onCloseModal();
  }, [description, dispatch, newGroupName, onCloseModal]);

  const handleUpdateGroup = useCallback(() => {
    if (!newGroupName.trim()) return;
    if (isAddMode || editingGroup === null) return;

    const updatedGroup: Group = {
      ...editingGroup,
      description: description.trim(),
      name: newGroupName.trim(),
    };

    dispatch(
      updateGroup({
        id: editingGroup.id,
        changes: updatedGroup,
      })
    );

    onCloseModal();
  }, [
    description,
    dispatch,
    editingGroup,
    isAddMode,
    newGroupName,
    onCloseModal,
  ]);

  const { confirm } = useDialog();

  const handleGroupDelete = useCallback(async () => {
    if (editingGroup) {
      log.debug("Attempting to delete group: {}", editingGroup.name);
      const confirmed = await confirm({
        title: "Delete Group",
        message: `Are you sure you want to delete "${editingGroup.name}" group? This will delete all your tasks and tags permanently and cannot be recovered.`,
        confirmText: "Delete",
        isDangerous: true,
      });

      if (confirmed) {
        if (!editingGroup.isCustom) {
          log.error("Cannot delete predefined group: {}", editingGroup.name);
          return;
        }
        log.info("Deleting group: {}", editingGroup.name);
        dispatch(removeGroup(editingGroup.id));
      }

      onCloseModal();
    }
  }, [confirm, dispatch, editingGroup, onCloseModal]);

  return (
    <ModalOverlay>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Create New Group</ModalTitle>
          <CloseButton onClick={onCloseModal}>
            <FiX />
          </CloseButton>
        </ModalHeader>

        <FormGroup>
          <Label>Group Name *</Label>
          <Input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="e.g., System Design, OOP Concepts"
          />
        </FormGroup>

        <FormGroup>
          <Label>Group Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="Enter your group description"
          />
        </FormGroup>

        <ModalActions>
          {isAddMode ? (
            <ButtonSecondary onClick={onCloseModal}>Cancel</ButtonSecondary>
          ) : (
            <ButtonDanger onClick={handleGroupDelete}>Delete</ButtonDanger>
          )}
          <ButtonPrimary
            onClick={isAddMode ? handleAddCustomGroup : handleUpdateGroup}
          >
            {isAddMode ? "Create" : "Update"} Group
          </ButtonPrimary>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
});
