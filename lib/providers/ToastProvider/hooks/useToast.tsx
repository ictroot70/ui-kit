import { Toast } from 'components/molecules/Toast/Toast.types'
import { useToastContext } from 'providers/ToastProvider/ToastContext'

/**
 * Custom React hook that provides a `toast` function for displaying toast notifications.
 *
 * @returns An object containing the `toast` method to trigger a toast message.
 *
 * @example
 * ```const { toast } = useToast();
 * toast({
 *   type: 'success',
 *   title: 'Success',
 *   message: 'Your action was successful.',
 *   duration: 3000,
 *   closeable: true
 * });
 * ```
 *
 * @param options Configuration object for the toast.
 * @param options.type Type of the alert (e.g., 'success', 'error', 'warning').
 * @param options.title Optional title of the toast.
 * @param options.message Required message content of the toast.
 * @param options.duration Optional duration in milliseconds before auto-dismissal.
 * @param options.closeable Optional flag to allow manual dismissal.
 */

/**
 * Type of options passed when triggering a toast.
 * Based on `Toast`, but omits system-managed fields.
 */
export type ToastInput = Omit<Toast, 'id' | 'pauseStart' | 'createdAt' | 'remaining' | 'timeoutId'>
export type UseToastResult = {
  toast: (options: ToastInput) => void
}

export const useToast = (): UseToastResult => {
  const { showToast } = useToastContext()

  return {
    toast: options => showToast(options),
  }
}
