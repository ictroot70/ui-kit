import { useCallback, useRef, useState } from 'react'
import { ToastInput } from 'providers/ToastProvider/hooks/useToast'
import { v4 as uuidv4 } from 'uuid'
import { Toast } from 'components/molecules/Toast/Toast.types'

export const useToastManager = ({ maxToasts = 5 }: { maxToasts?: number }) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeouts = useRef<Record<string, NodeJS.Timeout>>({})

  const removeToast = (id: string) => {
    clearTimeout(timeouts.current[id])
    delete timeouts.current[id]
    setToasts(prev => prev.filter(t => t.id !== id))
  }

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
        const timeout = setTimeout(() => removeToast(id), toast.duration ?? 4000)
        timeouts.current[id] = timeout
      }
    },
    [maxToasts]
  )

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
