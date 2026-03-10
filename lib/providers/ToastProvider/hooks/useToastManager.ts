import { useCallback, useEffect, useRef, useState } from 'react'

import { Toast } from 'components/molecules/Toast/Toast.types'
import { ToastInput } from 'providers/ToastProvider/hooks/useToast'
import { v4 as uuidv4 } from 'uuid'

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

const DEFAULT_TOAST_DURATION = 4000

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
  const timeouts = useRef<Record<string, ReturnType<typeof setTimeout>>>({})

  useEffect(
    () => () => {
      Object.values(timeouts.current).forEach(timeoutId => clearTimeout(timeoutId))
      timeouts.current = {}
    },
    []
  )
  /**
   * Removes a toast by its ID and clears its timeout.
   *
   * @param {string} id - The ID of the toast to remove.
   */
  const removeToast = useCallback((id: string) => {
    clearTimeout(timeouts.current[id])
    delete timeouts.current[id]
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])
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
      const duration = toast.duration ?? DEFAULT_TOAST_DURATION
      const newToast: Toast = {
        ...toast,
        id,
        createdAt,
        duration,
        totalDuration: duration,
        pauseStart: undefined,
        remaining: duration,
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

      if (duration !== 0) {
        timeouts.current[id] = setTimeout(() => removeToast(id), duration)
      }
    },
    [maxToasts, removeToast]
  )
  /**
   * Pauses the timeout for a given toast (used on hover).
   *
   * @param {Toast} toast - The toast to pause.
   */
  const pauseToast = useCallback((toast: Toast) => {
    setToasts(prev =>
      prev.map(t => {
        if (t.id !== toast.id) {
          return t
        }
        if (t.pauseStart !== undefined) {
          return t
        }

        const totalDuration = t.totalDuration ?? t.duration ?? DEFAULT_TOAST_DURATION

        if (totalDuration <= 0) {
          return t
        }

        const currentSegmentDuration = t.remaining ?? t.duration ?? DEFAULT_TOAST_DURATION
        const now = Date.now()
        const elapsed = now - t.createdAt
        const remaining = currentSegmentDuration - elapsed

        clearTimeout(timeouts.current[t.id])
        delete timeouts.current[t.id]

        return {
          ...t,
          pauseStart: now,
          remaining: Math.max(remaining, 0),
        }
      })
    )
  }, [])
  /**
   * Resumes the timeout for a previously paused toast.
   *
   * @param {Toast} toast - The toast to resume.
   */
  const resumeToast = useCallback(
    (toast: Toast) => {
      setToasts(prev =>
        prev.map(t => {
          if (t.id !== toast.id) {
            return t
          }
          if (t.pauseStart === undefined) {
            return t
          }

          const totalDuration = t.totalDuration ?? t.duration ?? DEFAULT_TOAST_DURATION

          if (totalDuration <= 0) {
            return {
              ...t,
              pauseStart: undefined,
              remaining: 0,
            }
          }

          const remaining = Math.max(t.remaining ?? t.duration ?? DEFAULT_TOAST_DURATION, 0)

          const timeoutId = setTimeout(() => removeToast(t.id), remaining)

          timeouts.current[t.id] = timeoutId

          return {
            ...t,
            timeoutId,
            createdAt: Date.now(),
            pauseStart: undefined,
            remaining,
          }
        })
      )
    },
    [removeToast]
  )

  return {
    toasts,
    showToast,
    removeToast,
    pauseToast,
    resumeToast,
  }
}
