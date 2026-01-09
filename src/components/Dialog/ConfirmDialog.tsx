import { memo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import type { ConfirmDialogOptions, DialogType } from "./types";
import {
  Overlay,
  DialogContainer,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogMessage,
  DialogFooter,
  ConfirmButton,
  DangerButton,
  CancelButton,
  IconContainer,
} from "./Dialog.styles";

interface ConfirmDialogProps extends ConfirmDialogOptions {
  readonly onConfirm: () => void;
  readonly onCancel: () => void;
}

const getIcon = (type: DialogType) => {
  switch (type) {
    case "error":
      return <FiAlertCircle size={20} />;
    case "warning":
      return <FiAlertTriangle size={20} />;
    case "success":
      return <FiCheckCircle size={20} />;
    default:
      return <FiInfo size={20} />;
  }
};

export const ConfirmDialog = memo(function ConfirmDialog({
  title = "Confirm",
  message,
  type = "info",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDangerous = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  // Focus cancel button on mount (safer default)
  useEffect(() => {
    cancelButtonRef.current?.focus();
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onCancel();
      }
    },
    [onCancel]
  );

  const ActionButton = isDangerous ? DangerButton : ConfirmButton;

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <DialogContainer
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <IconContainer type={isDangerous ? "warning" : type}>
            {getIcon(isDangerous ? "warning" : type)}
          </IconContainer>
          <DialogTitle id="dialog-title">{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogMessage>{message}</DialogMessage>
        </DialogBody>
        <DialogFooter>
          <CancelButton ref={cancelButtonRef} onClick={onCancel}>
            {cancelText}
          </CancelButton>
          <ActionButton onClick={onConfirm}>{confirmText}</ActionButton>
        </DialogFooter>
      </DialogContainer>
    </Overlay>,
    document.body
  );
});
