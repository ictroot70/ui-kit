import { ReactElement, ReactNode } from 'react'

import { Alert } from 'components/molecules'
import { Toast } from 'components/molecules/Toast/Toast.types'
import { getToastProgress } from 'components/molecules/Toast/helpers/getToastProgress'
import { motion } from 'framer-motion'

export interface ToastItemProps {
  toast: Toast
  onClose: () => void
  enableCloseButton?: boolean
  renderToast?: (toast: Toast, onClose: () => void) => ReactNode
  enableProgressBar?: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
}

/**
 * `ToastItem` renders a single toast notification with optional animations, progress bar,
 * and support for custom content rendering.
 *
 * It uses Framer Motion to animate enter/exit transitions and can render either a default
 * `Alert` component or a custom toast via the `renderToast` prop.
 *
 * Supports pause-on-hover functionality and an optional close button.
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
 * @param props - Props for the ToastItem component.
 * @param props.toast - The toast object containing details like type, title, message, duration, etc.
 * @param props.onClose - Callback fired when the toast is dismissed.
 * @param props.renderToast - Optional custom render function for the toast.
 * @param props.enableCloseButton - Fallback close button visibility if `toast.closeable` is not defined.
 * @param props.enableProgressBar - Whether to show a progress bar indicating remaining time.
 * @param props.onMouseEnter - Called when the mouse enters the toast (typically to pause the timer).
 * @param props.onMouseLeave - Called when the mouse leaves the toast (typically to resume the timer).
 *
 * @returns A `ReactElement` representing the animated toast component.
 */

export const ToastItem = (props: ToastItemProps): ReactElement => {
  const {
    toast,
    onClose,
    renderToast,
    enableProgressBar,
    enableCloseButton,
    onMouseEnter,
    onMouseLeave,
  } = props

  const progress = getToastProgress(toast.createdAt, toast.duration)
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
          typographyVariant={'regular_14'}
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
