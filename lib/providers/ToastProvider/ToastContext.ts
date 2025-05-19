import { createContext, useContext } from 'react'
import { ToastInput } from 'providers/ToastProvider/useToast'

export type ToastContextType = {
  showToast: (toast: ToastInput) => void
}
/**
 * ToastContext provides access to the `showToast` function used to trigger toast notifications.
 *
 * This context must be used within a `ToastProvider`. Attempting to use `useToastContext` outside
 * of a provider will result in an error.
 *
 * @example
 * ```tsx
 * const { showToast } = useToastContext();
 * showToast({
 *   type: 'success',
 *   title: 'Done!',
 *   message: 'The operation completed successfully.',
 *   duration: 3000,
 *   closeable: true,
 * });
 * ```
 *
 *     Displays a toast notification.
 *
 *     @param toast - Toast configuration (all properties except `id`, which will be generated internally).
 *
 *     Custom hook to access the toast context.
 *
 *   @throws Will throw an error if used outside of a `ToastProvider`.
 *   @returns The toast context with access to `showToast`.
 */

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToastContext must be used within a ToastProvider')
  return context
}
