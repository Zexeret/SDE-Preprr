import { useState, useCallback, useMemo, type ReactNode } from "react";
import { AlertDialog } from "./AlertDialog";
import { ConfirmDialog } from "./ConfirmDialog";
import { DialogContext } from "./DialogContext";
import type { AlertDialogOptions, ConfirmDialogOptions } from "./types";

interface AlertState extends AlertDialogOptions {
  readonly resolve: () => void;
}

interface ConfirmState extends ConfirmDialogOptions {
  readonly resolve: (value: boolean) => void;
}

interface DialogProviderProps {
  readonly children: ReactNode;
}

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [alertState, setAlertState] = useState<AlertState | null>(null);
  const [confirmState, setConfirmState] = useState<ConfirmState | null>(null);

  const alert = useCallback(
    (options: AlertDialogOptions | string): Promise<void> => {
      return new Promise((resolve) => {
        const opts =
          typeof options === "string" ? { message: options } : options;
        setAlertState({ ...opts, resolve });
      });
    },
    []
  );

  const confirm = useCallback(
    (options: ConfirmDialogOptions | string): Promise<boolean> => {
      return new Promise((resolve) => {
        const opts =
          typeof options === "string" ? { message: options } : options;
        setConfirmState({ ...opts, resolve });
      });
    },
    []
  );

  const handleAlertClose = useCallback(() => {
    alertState?.resolve();
    setAlertState(null);
  }, [alertState]);

  const handleConfirm = useCallback(() => {
    confirmState?.resolve(true);
    setConfirmState(null);
  }, [confirmState]);

  const handleCancel = useCallback(() => {
    confirmState?.resolve(false);
    setConfirmState(null);
  }, [confirmState]);

  const contextValue = useMemo(() => ({ alert, confirm }), [alert, confirm]);

  return (
    <DialogContext.Provider value={contextValue}>
      {children}

      {alertState && (
        <AlertDialog
          title={alertState.title}
          message={alertState.message}
          type={alertState.type}
          confirmText={alertState.confirmText}
          onClose={handleAlertClose}
        />
      )}

      {confirmState && (
        <ConfirmDialog
          title={confirmState.title}
          message={confirmState.message}
          type={confirmState.type}
          confirmText={confirmState.confirmText}
          cancelText={confirmState.cancelText}
          isDangerous={confirmState.isDangerous}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </DialogContext.Provider>
  );
};
