import React, { memo, useCallback } from "react";
import { FooterActionContainer } from "./TaskForm.styles";
import {
  ButtonDanger,
  ButtonPrimary,
  ButtonSecondary,
  ModalActions,
} from "../../sharedStyles";
import {
  removeTask,
  selectTaskIdInModal,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";

type ActionButtonsProps = {
  readonly onClose: () => void;
  readonly handleSubmit :  (e: React.FormEvent<Element>) => void;
};

export const ActionButtons = memo<ActionButtonsProps>(({ onClose, handleSubmit }) => {
  const isAddMode = useSelector(selectTaskIdInModal) === null;
  const selectedTaskId = useSelector(selectTaskIdInModal);
  const dispatch = useAppDispatch();

  const handleDelete = useCallback(() => {
    if (!selectedTaskId) return;
    if (
      window.confirm(
        "Are you sure you want to delete this task? This action cannot be undone."
      )
    ) {
      dispatch(removeTask(selectedTaskId));
      onClose();
    }
  }, [dispatch, onClose, selectedTaskId]);

  return (
    <FooterActionContainer>
      <ModalActions>
        {isAddMode ? (
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
        ) : (
          <ButtonDanger onClick={handleDelete}>Delete</ButtonDanger>
        )}

        <ButtonPrimary onClick={handleSubmit}>
          {isAddMode ? "Add Task" : "Update Task"}
        </ButtonPrimary>
      </ModalActions>
    </FooterActionContainer>
  );
});
