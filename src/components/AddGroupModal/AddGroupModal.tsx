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
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";

export const AddGroupModal = memo(() => {
  const isAddMode = useSelector(selectGroupIdInModal) === null;
  const editingGroup = useSelector(selectActiveGroupInModal) ;
  const [newGroupName, setNewGroupName] = useState<string>(editingGroup?.name ?? "");
  const [description, setGroupDescription] = useState<string>(editingGroup?.description ?? "");

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

    const handleGroupDelete = useCallback(() => {
      if (editingGroup) {
        if (
          window.confirm(
            `Are you sure you want to delete ${editingGroup.name} group? This will delete all your tasks and tags permanently and cant be recovered. `
          )
        ) {
          if (!editingGroup.isCustom) {
            console.error(
              "Current group is not a custom group. Cannot be deleted."
            );
            return;
          }
          dispatch(removeGroup(editingGroup.id));
        }

        onCloseModal();
      }
    }, [dispatch, editingGroup, onCloseModal]);

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
          <ButtonPrimary onClick={handleAddCustomGroup}>
            {isAddMode ? 'Create' : 'Update'} Group
          </ButtonPrimary>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
});
