import React, { useCallback, useRef, useState } from 'react'
import { ToastContext } from 'providers/ToastProvider/ToastContext'
import type { Toast } from 'providers/ToastProvider/types'
import { ToastContainer, ToastPosition } from 'components/molecules/Toast/ToastContainer'
import { v4 as uuidv4 } from 'uuid'
import { ToastInput } from 'providers/ToastProvider/useToast'

export type ToastProviderProps = {
  children: React.ReactNode
  renderToast?: (toast: Toast, onClose: () => void) => React.ReactNode
  position?: ToastPosition
  maxToasts?: number
  enableHoverPause?: boolean
  enableProgressBar?: boolean
}

/**
 * `ToastProvider` is a context provider component that enables toast (notification) functionality
 * across your application. It wraps your app or any subtree and provides the `showToast` method
 * through `ToastContext` to trigger toast messages.
 *
 * This component also manages toast lifecycle, including showing, dismissing, pausing on hover,
 * and displaying a progress bar if enabled.
 *
 * ### Example:
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 *
 * Inside a child component:
 * ```tsx
 * const { showToast } = useToastContext()
 * showToast({ message: 'This is a toast!', type: 'success', duration: 3000 })
 * ```
 *
 * @component
 *
 * @param {ToastProviderProps} props - The props for configuring the toast behavior and rendering.
 * @param {React.ReactNode} props.children - The components that should have access to the toast context.
 * @param {(toast: Toast, onClose: () => void) => React.ReactNode} [props.renderToast] - Optional custom render function for individual toasts.
 * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} [props.position='top-right'] - Position of the toast container.
 * @param {number} [props.maxToasts=5] - Maximum number of visible toasts at the same time.
 * @param {boolean} [props.enableHoverPause=true] - Whether hovering over a toast should pause its timeout.
 * @param {boolean} [props.enableProgressBar=true] - Whether to show a progress bar on toasts.
 *
 * @returns {ReactElement} The ToastProvider wrapping the app and providing toast context.
 */

export const ToastProvider = (props: ToastProviderProps): React.ReactElement => {
  const {
    children,
    renderToast,
    position = 'top-right',
    maxToasts = 5,
    enableHoverPause = true,
    enableProgressBar = true,
  } = props
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

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastContainer
        toasts={toasts}
        position={position}
        renderToast={renderToast}
        enableHoverPause={enableHoverPause}
        enableProgressBar={enableProgressBar}
        onRemove={removeToast}
        onPause={pauseToast}
        onResume={resumeToast}
      />
    </ToastContext.Provider>
  )
}
