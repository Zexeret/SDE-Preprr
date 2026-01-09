import { memo, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import {
  FiAlertCircle,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";
import type { AlertDialogOptions, DialogType } from "./types";
import {
  Overlay,
  DialogContainer,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogMessage,
  DialogFooter,
  ConfirmButton,
  IconContainer,
} from "./Dialog.styles";

interface AlertDialogProps extends AlertDialogOptions {
  readonly onClose: () => void;
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

const getDefaultTitle = (type: DialogType): string => {
  switch (type) {
    case "error":
      return "Error";
    case "warning":
      return "Warning";
    case "success":
      return "Success";
    default:
      return "Information";
  }
};

export const AlertDialog = memo(function AlertDialog({
  title,
  message,
  type = "info",
  confirmText = "OK",
  onClose,
}: AlertDialogProps) {
  const confirmButtonRef = useRef<HTMLButtonElement>(null);

  // Focus confirm button on mount
  useEffect(() => {
    confirmButtonRef.current?.focus();
  }, []);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return createPortal(
    <Overlay onClick={handleOverlayClick}>
      <DialogContainer
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <DialogHeader>
          <IconContainer type={type}>{getIcon(type)}</IconContainer>
          <DialogTitle id="dialog-title">
            {title ?? getDefaultTitle(type)}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogMessage>{message}</DialogMessage>
        </DialogBody>
        <DialogFooter>
          <ConfirmButton ref={confirmButtonRef} onClick={onClose}>
            {confirmText}
          </ConfirmButton>
        </DialogFooter>
      </DialogContainer>
    </Overlay>,
    document.body
  );
});
