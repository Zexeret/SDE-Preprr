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
import { useDialog } from "../Dialog";

type ActionButtonsProps = {
  readonly onClose: () => void;
  readonly handleSubmit: (e: React.FormEvent<Element>) => void;
};

export const ActionButtons = memo<ActionButtonsProps>(
  ({ onClose, handleSubmit }) => {
    const mode = useSelector(selectModeInTaskModal);
    const selectedTaskId = useSelector(selectTaskIdInModal);
    const dispatch = useAppDispatch();
    const { confirm } = useDialog();

    const handleDelete = useCallback(async () => {
      if (!selectedTaskId) return;
      const confirmed = await confirm({
        title: "Delete Task",
        message:
          "Are you sure you want to delete this task? This action cannot be undone.",
        confirmText: "Delete",
        isDangerous: true,
      });
      if (confirmed) {
        dispatch(removeTask(selectedTaskId));
        onClose();
      }
    }, [confirm, dispatch, onClose, selectedTaskId]);

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
