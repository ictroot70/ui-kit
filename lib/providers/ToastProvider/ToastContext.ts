import { createContext, useContext } from 'react'
import { ToastInput } from 'providers/ToastProvider/hooks/useToast'

export type ToastContextType = {
  showToast: (toast: ToastInput) => void
}
/**
 * ToastContext provides access to the `showToast` function,
 * which is used to trigger toast notifications.
 *
 * This context must be used within a `ToastProvider`.
 * Using `useToastContext` outside of a `ToastProvider` will throw an error.
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
 * @param toast - Toast configuration object (all properties except `id`, which is generated internally).
 *
 * @throws Will throw an error if used outside of a `ToastProvider`.
 * @returns The toast context, providing access to `showToast`.
 */

export const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToastContext = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToastContext must be used within a ToastProvider')
  }
  return context
}
