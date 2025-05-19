import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
import { ToastItem } from './ToastItem'
import type { Toast } from 'providers/ToastProvider/types'

type ToastContainerProps = {
  toasts: Toast[]
  position: ToastPosition
  renderToast?: (toast: Toast, onClose: () => void) => React.ReactNode
  enableHoverPause: boolean
  enableProgressBar: boolean
  onRemove: (id: string) => void
  onPause: (toast: Toast) => void
  onResume: (toast: Toast) => void
}

export type ToastPosition =
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'top-center'
  | 'bottom-center'

const getPositionStyle = (position: ToastPosition): React.CSSProperties => {
  const base: React.CSSProperties = { position: 'fixed', zIndex: 9999 }
  const styles: Record<ToastPosition, React.CSSProperties> = {
    'top-left': { ...base, top: 20, left: 20 },
    'top-right': { ...base, top: 20, right: 20 },
    'bottom-left': { ...base, bottom: 20, left: 20 },
    'bottom-right': { ...base, bottom: 20, right: 20 },
    'top-center': { ...base, top: 20, left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { ...base, bottom: 20, left: '50%', transform: 'translateX(-50%)' },
  }
  return styles[position] || base
}
/**
 * ToastContainer is responsible for rendering and positioning toast notifications on the screen.
 *
 * It uses `createPortal` to render toasts outside the regular React tree and `AnimatePresence`
 * from `framer-motion` for enter/exit animations.
 *
 * Toasts can be customized with a custom renderer and include optional progress bars and pause-on-hover behavior.
 *
 * @example
 * ```tsx
 * <ToastContainer
 *   toasts={toasts}
 *   position="top-right"
 *   renderToast={(toast, onClose) => <CustomToast {...toast} onClose={onClose} />}
 *   enableProgressBar={true}
 *   enableHoverPause={true}
 *   onRemove={id => removeToast(id)}
 *   onPause={toast => pauseTimer(toast)}
 *   onResume={toast => resumeTimer(toast)}
 * />
 * ```
 */
export const ToastContainer = (props: ToastContainerProps): React.ReactPortal | null => {
  const { toasts, position, renderToast, onRemove, onPause, onResume, enableProgressBar, ...rest } =
    props
  if (typeof document === 'undefined') return null
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
