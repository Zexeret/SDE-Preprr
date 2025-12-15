import  { memo, useCallback, useState } from "react";
import { ButtonPrimary, ButtonSecondary, FormGroup, ModalActions, ModalContent, ModalOverlay } from "../../sharedStyles";
import { useTaskUtility } from "../../context";
import type { Group } from "../../model";

type AddGroupModalProps = {
    readonly onCloseModal : () => void;
}

export const AddGroupModal = memo<AddGroupModalProps>(({onCloseModal}) => {
    const [newGroupName, setNewGroupName] = useState<string>("");
    const {addCustomGroup, setSelectedGroupId} = useTaskUtility() ;

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
    } , [addCustomGroup, newGroupName, onCloseModal, setSelectedGroupId]);

  return (
    <ModalOverlay onClick={onCloseModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h2>Create New Group</h2>
        <FormGroup>
          <label>Group Name *</label>
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="e.g., System Design, OOP Concepts"
          />
        </FormGroup>
        <ModalActions>
          <ButtonSecondary
            onClick={onCloseModal}
          >
            Cancel
          </ButtonSecondary>
          <ButtonPrimary onClick={handleAddCustomGroup}>
            Create Group
          </ButtonPrimary>
        </ModalActions>
      </ModalContent>
    </ModalOverlay>
  );
});
