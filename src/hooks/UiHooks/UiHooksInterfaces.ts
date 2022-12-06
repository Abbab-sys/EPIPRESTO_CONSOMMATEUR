/*
 * Name: Snackbar Kind Interface
 * Description: This interface represents the kind of snackbar.
 * Author: Alessandro van Reusel, Adam Naoui-Busson
 */

export interface SnackbarKind {
  messageTranslationKey: string;
  severity: 'success' | 'error' | 'warning' | 'info';
}
