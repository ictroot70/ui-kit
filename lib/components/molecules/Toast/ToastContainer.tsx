import React from 'react'
import { createPortal } from 'react-dom'

import { Toast } from 'components/molecules/Toast/Toast.types'
import { ToastItem } from 'components/molecules/Toast/ToastItem'
import { getPositionStyle } from 'components/molecules/Toast/helpers/getPositionStyle'
import { AnimatePresence } from 'framer-motion'

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

export interface ToastContainerProps {
  toasts: Toast[]
  position: ToastPosition
  renderToast?: (toast: Toast, onClose: () => void) => React.ReactNode
  enableHoverPause: boolean
  enableProgressBar: boolean
  onRemove: (id: string) => void
  onPause: (toast: Toast) => void
  onResume: (toast: Toast) => void
}

/**
 * ToastContainer is responsible for rendering and positioning toast notifications on the screen.
 *
 * It uses `createPortal` to render toasts outside the main React DOM hierarchy, allowing absolute positioning.
 * Toasts are animated using `AnimatePresence` from `framer-motion`, which enables smooth enter and exit transitions.
 *
 * You can customize the appearance of toasts by providing a `renderToast` function, and control behavior such as
 * progress bar visibility and pause-on-hover support.
 *
 * @param props - The props for configuring toast display behavior and interaction.
 * @param props.toasts - Array of toast objects to render.
 * @param props.position - The screen position where toasts should appear (e.g., "top-right").
 * @param props.renderToast - Optional custom renderer for individual toasts.
 * @param props.enableHoverPause - Whether hovering pauses the toast timer.
 * @param props.enableProgressBar - Whether to show a progress bar on each toast.
 * @param props.onRemove - Callback to remove a toast by ID.
 * @param props.onPause - Callback triggered when a toast is hovered.
 * @param props.onResume - Callback triggered when the hover ends.
 *
 * @example
 * ```tsx
 * <ToastContainer
 *   toasts={toasts}
 *   position="top-right"
 *   renderToast={(toast, onClose) => <CustomToast {...toast} onClose={onClose} />}
 *   enableProgressBar
 *   enableHoverPause
 *   onRemove={id => removeToast(id)}
 *   onPause={toast => pauseTimer(toast)}
 *   onResume={toast => resumeTimer(toast)}
 * />
 * ```
 *
 * @returns A portal-rendered list of toast notifications, or `null` if rendering on the server.
 */

export const ToastContainer = (props: ToastContainerProps): React.ReactPortal | null => {
  const { toasts, position, renderToast, onRemove, onPause, onResume, enableProgressBar, ...rest } =
    props

  if (typeof document === 'undefined') {
    return null
  }

  return createPortal(
    <div style={getPositionStyle(position)}>
      <AnimatePresence>
        {toasts.map(toast => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onClose={() => onRemove(toast.id)}
            renderToast={renderToast}
            enableProgressBar={enableProgressBar}
            onMouseEnter={() => onPause(toast)}
            onMouseLeave={() => onResume(toast)}
            {...rest}
          />
        ))}
      </AnimatePresence>
    </div>,
    document.body
  )
}
