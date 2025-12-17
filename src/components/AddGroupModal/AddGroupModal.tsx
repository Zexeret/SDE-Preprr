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

type AddGroupModalProps = {
  readonly onCloseModal: () => void;
};

export const AddGroupModal = memo<AddGroupModalProps>(({ onCloseModal }) => {
  const [newGroupName, setNewGroupName] = useState<string>("");
  const { addCustomGroup, setSelectedGroupId } = useTaskUtility();

  const handleAddCustomGroup = useCallback(() => {
    if (!newGroupName.trim()) return;

    const groupId = newGroupName.toLowerCase().replace(/\s+/g, "-");
    const newGroup: Group = {
      id: `custom-${groupId}-${Date.now()}`,
      name: newGroupName.trim(),
      isCustom: true,
      createdAt: Date.now(),
    };

    addCustomGroup(newGroup);
    setSelectedGroupId(newGroup.id);
    onCloseModal();
  }, [addCustomGroup, newGroupName, onCloseModal, setSelectedGroupId]);

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
