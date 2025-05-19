import { ReactElement, ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { Toast } from 'providers/ToastProvider/types'
import { Alert } from 'components/molecules'

type Props = {
  toast: Toast
  onClose: () => void
  enableCloseButton?: boolean
  renderToast?: (toast: Toast, onClose: () => void) => ReactNode
  enableProgressBar?: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}
/**
 * `ToastItem` is a single toast notification component that can render either a default alert or a custom toast via `renderToast`.
 * It uses Framer Motion for enter/exit animations and supports optional auto-dismiss behavior with a progress bar.
 *
 * @component
 *
 * @example
 * ```tsx
 * <ToastItem
 *   toast={toast}
 *   onClose={() => removeToast(toast.id)}
 *   enableCloseButton
 *   enableProgressBar
 *   onMouseEnter={pauseToast}
 *   onMouseLeave={resumeToast}
 * />
 * ```
 *
 * @param props - Component props.
 * @param props.toast - The toast data including type, message, duration, etc.
 * @param props.onClose - Callback triggered when the toast is dismissed.
 * @param props.renderToast - Optional custom renderer for the toast content.
 * @param props.enableCloseButton - Fallback close button visibility if `toast.closeable` is undefined.
 * @param props.enableProgressBar - Whether to show a progress bar based on toast duration.
 * @param props.onMouseEnter - Handler called when mouse enters the toast area (e.g., to pause countdown).
 * @param props.onMouseLeave - Handler called when mouse leaves the toast area (e.g., to resume countdown).
 *
 * @returns ReactElement - Animated toast component.
 */

export const ToastItem = (props: Props): ReactElement => {
  const {
    toast,
    onClose,
    renderToast,
    enableProgressBar,
    enableCloseButton,
    onMouseEnter,
    onMouseLeave,
  } = props
  const elapsed = Date.now() - toast.createdAt
  const progress = 1 - elapsed / (toast.duration ?? 5000)
  const isCloseable = toast.closeable ?? enableCloseButton
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      style={{ marginBottom: 8 }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {renderToast ? (
        renderToast(toast, onClose)
      ) : (
        <Alert
          typographyVariant="regular_14"
          type={toast.type}
          title={toast.title}
          message={toast.message}
          closeable={isCloseable}
          onClose={onClose}
          duration={toast.duration}
          progressBar={enableProgressBar}
          progress={progress}
        />
      )}
    </motion.div>
  )
}
