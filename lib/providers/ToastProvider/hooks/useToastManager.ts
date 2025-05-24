import { useCallback, useRef, useState } from 'react'
import { ToastInput } from 'providers/ToastProvider/hooks/useToast'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from 'components/molecules/Toast/Toast.types'

export interface UseToastManagerOptions {
  maxToasts?: number
}

export interface UseToastManagerReturn {
  toasts: Toast[]
  showToast: (toast: ToastInput) => void
  removeToast: (id: string) => void
  pauseToast: (toast: Toast) => void
  resumeToast: (toast: Toast) => void
}

/**
 * A custom React hook for managing toast notifications.
 *
 * This hook allows you to display, remove, pause, and resume toast messages.
 * It supports a configurable maximum number of toasts, and automatically removes
 * toasts after a specified duration.
 *
 * @param {number} [options.maxToasts=5] - Maximum number of toasts to display at once.
 * @returns {{
 *   toasts: Toast[],
 *   showToast: (toast: ToastInput) => void,
 *   removeToast: (id: string) => void,
 *   pauseToast: (toast: Toast) => void,
 *   resumeToast: (toast: Toast) => void
 * }} An object containing the list of toasts and toast management functions.
 *
 * @example
 * const {
 *   toasts,
 *   showToast,
 *   removeToast,
 *   pauseToast,
 *   resumeToast,
 * } = useToastManager({ maxToasts: 3 })
 *
 * showToast({ type: 'success', title: 'Saved!', duration: 3000 })
 * @param options
 */

export const useToastManager = (options: UseToastManagerOptions): UseToastManagerReturn => {
  const { maxToasts = 5 } = options
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeouts = useRef<Record<string, NodeJS.Timeout>>({})
  /**
   * Removes a toast by its ID and clears its timeout.
   *
   * @param {string} id - The ID of the toast to remove.
   */
  const removeToast = (id: string) => {
    clearTimeout(timeouts.current[id])
    delete timeouts.current[id]
    setToasts(prev => prev.filter(t => t.id !== id))
  }
  /**
   * Displays a new toast message.
   *
   * If the number of toasts exceeds `maxToasts`, the oldest one is removed.
   * If a duration is specified and not 0, the toast will auto-dismiss.
   *
   * @param {ToastInput} toast - The toast configuration.
   */
  const showToast = useCallback(
    (toast: ToastInput) => {
      const id = uuidv4()
      const createdAt = Date.now()
      const newToast: Toast = {
        ...toast,
        id,
        createdAt,
        pauseStart: undefined,
        remaining: toast.duration ?? 4000,
        timeoutId: undefined,
      }

      setToasts(prev => {
        const newToasts = [...prev, newToast]
        if (newToasts.length > maxToasts) {
          const [removed] = newToasts
          clearTimeout(timeouts.current[removed.id])
          delete timeouts.current[removed.id]
          newToasts.shift()
        }
        return newToasts
      })

      if (toast.duration !== 0) {
        timeouts.current[id] = = setTimeout(() => removeToast(id), toast.duration ?? 4000)
      }
    },
    [maxToasts]
  )
  /**
   * Pauses the timeout for a given toast (used on hover).
   *
   * @param {Toast} toast - The toast to pause.
   */
  const pauseToast = (toast: Toast) => {
    setToasts(prev =>
      prev.map(t => {
        if (t.id !== toast.id) return t
        const now = Date.now()
        const elapsed = now - t.createdAt
        const remaining = (t.remaining ?? t.duration ?? 5000) - elapsed

        clearTimeout(t.timeoutId)

        return {
          ...t,
          pauseStart: now,
          remaining: Math.max(remaining, 0),
        }
      })
    )
  }
  /**
   * Resumes the timeout for a previously paused toast.
   *
   * @param {Toast} toast - The toast to resume.
   */
  const resumeToast = (toast: Toast) => {
    setToasts(prev =>
      prev.map(t => {
        if (t.id !== toast.id) return t

        const remaining = t.remaining ?? t.duration ?? 5000

        const timeoutId = setTimeout(() => removeToast(t.id), remaining)

        return {
          ...t,
          timeoutId,
          createdAt: Date.now(), // for the progressbar to recount from the current time
          pauseStart: undefined,
          remaining: undefined,
        }
      })
    )
  }
  return {
    toasts,
    showToast,
    removeToast,
    pauseToast,
    resumeToast,
  }
}
