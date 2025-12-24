import { memo } from "react";
import {
  ModalHeader,
  ModalTitle,
  CloseButton,
} from "../../sharedStyles";
import { useSelector } from "react-redux";
import { selectTaskIdInModal } from "../../store";
import { FiX } from "react-icons/fi";

type TaskFormHeaderProps = {
  readonly onClose: () => void;
}

export const TaskFormHeader = memo<TaskFormHeaderProps>(({onClose}) => {
  const isAddMode = useSelector(selectTaskIdInModal) === null ;

  return (
    <ModalHeader>
      <ModalTitle>
        {isAddMode ? "Add New Task" : "Edit Task"}
      </ModalTitle>
      <CloseButton onClick={onClose}>
        <FiX />
      </CloseButton>
    </ModalHeader>
  );
});
