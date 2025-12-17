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
} from "../../sharedStyles/shared.styles";
import { useTaskUtility } from "../../context";
import type { Group } from "../../model";
import { FiX } from "react-icons/fi";
import { generateId } from "../../utils";

type AddGroupModalProps = {
  readonly onCloseModal: () => void;
};

export const AddGroupModal = memo<AddGroupModalProps>(({ onCloseModal }) => {
  const [newGroupName, setNewGroupName] = useState<string>("");
  const [description, setGroupDescription] = useState<string>("");
  const { addCustomGroup, setSelectedGroupId } = useTaskUtility();

  const handleAddCustomGroup = useCallback(() => {
    if (!newGroupName.trim()) return;

    const newGroup: Group = {
      id: generateId('group'),
      description: description.trim(),
      name: newGroupName.trim(),
      isCustom: true,
      createdAt: Date.now(),
    };

    addCustomGroup(newGroup);
    setSelectedGroupId(newGroup.id);
    onCloseModal();
  }, [
    addCustomGroup,
    description,
    newGroupName,
    onCloseModal,
    setSelectedGroupId,
  ]);

  return (
    <ModalOverlay onClick={onCloseModal}>
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
          <Label>Group Description *</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setGroupDescription(e.target.value)}
            placeholder="Enter your group description"
          />
        </FormGroup>

        <ModalActions>
          <ButtonSecondary onClick={onCloseModal}>Cancel</ButtonSecondary>
          <ButtonPrimary onClick={handleAddCustomGroup}>
            Create Group
          </ButtonPrimary>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
});
