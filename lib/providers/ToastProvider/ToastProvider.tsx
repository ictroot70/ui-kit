import React from 'react'

import { Toast } from 'components/molecules/Toast/Toast.types'
import { ToastContainer, ToastPosition } from 'components/molecules/Toast/ToastContainer'
import { ToastContext } from 'providers/ToastProvider/ToastContext'
import { useToastManager } from 'providers/ToastProvider/hooks/useToastManager'

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
 * across your application. It provides the `showToast` method via `useToastContext`, allowing any child
 * component to trigger toast messages.
 *
 * It also manages the lifecycle of toasts, including display, auto-dismiss, hover pause, and an optional
 * progress bar.
 *
 * ### Usage:
 * ```tsx
 * <ToastProvider>
 *   <App />
 * </ToastProvider>
 * ```
 *
 * Inside a child component:
 * ```tsx
 * const { showToast } = useToastContext()
 * showToast({
 *   message: 'This is a toast!',
 *   type: 'success',
 *   duration: 3000
 * })
 * ```
 *
 * @component
 *
 * @param {ToastProviderProps} props - Props to configure toast behavior and rendering.
 * @param {React.ReactNode} props.children - Components that should have access to the toast context.
 * @param {(toast: Toast, onClose: () => void) => React.ReactNode} [props.renderToast] - Optional custom render function for each toast.
 * @param {'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'} [props.position='top-right'] - Position of the toast container on the screen.
 * @param {number} [props.maxToasts=5] - Maximum number of toasts shown simultaneously.
 * @param {boolean} [props.enableHoverPause=true] - Whether hovering over a toast pauses its dismiss timer.
 * @param {boolean} [props.enableProgressBar=true] - Whether to display a progress bar on each toast.
 *
 * @returns {ReactElement} The provider that wraps your app and makes toast functionality available via context.
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

  const { toasts, showToast, removeToast, pauseToast, resumeToast } = useToastManager({ maxToasts })

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

ToastProvider.displayName = 'ToastProvider'
