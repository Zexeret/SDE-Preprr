/**
 * Dialog Types
 */

export type DialogType = "info" | "warning" | "error" | "success";

export interface AlertDialogOptions {
  readonly title?: string;
  readonly message: string;
  readonly type?: DialogType;
  readonly confirmText?: string;
}

export interface ConfirmDialogOptions {
  readonly title?: string;
  readonly message: string;
  readonly type?: DialogType;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly isDangerous?: boolean;
}

export interface DialogContextValue {
  readonly alert: (options: AlertDialogOptions | string) => Promise<void>;
  readonly confirm: (
    options: ConfirmDialogOptions | string
  ) => Promise<boolean>;
}
