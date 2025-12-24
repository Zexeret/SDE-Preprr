import React, { memo, useCallback } from "react";
import { FooterActionContainer } from "./TaskForm.styles";
import {
  ButtonDanger,
  ButtonPrimary,
  ButtonSecondary,
  ModalActions,
} from "../../sharedStyles";
import {
  openTaskModal,
  removeTask,
  selectModeInTaskModal,
  selectTaskIdInModal,
  useAppDispatch,
} from "../../store";
import { useSelector } from "react-redux";

type ActionButtonsProps = {
  readonly onClose: () => void;
  readonly handleSubmit: (e: React.FormEvent<Element>) => void;
};

export const ActionButtons = memo<ActionButtonsProps>(
  ({ onClose, handleSubmit }) => {
    const mode = useSelector(selectModeInTaskModal);
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

    const handleEditTask = useCallback(() => {
      if (!selectedTaskId) return;
      dispatch(
        openTaskModal({
          isOpen: true,
          taskId: selectedTaskId,
          mode: "edit",
        })
      );
    }, [dispatch, selectedTaskId]);
    return (
      <FooterActionContainer>
        <ModalActions>
          {mode === "add" && (
            <>
              <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
              <ButtonPrimary onClick={handleSubmit}>Add Task</ButtonPrimary>
            </>
          )}

          {mode === "edit" && (
            <>
              <ButtonDanger onClick={handleDelete}>Delete</ButtonDanger>
              <ButtonPrimary onClick={handleSubmit}>Update Task</ButtonPrimary>
            </>
          )}

          {mode === "view" && (
            <>
              <ButtonPrimary onClick={handleEditTask}>Edit Task</ButtonPrimary>
            </>
          )}
        </ModalActions>
      </FooterActionContainer>
    );
  }
);
