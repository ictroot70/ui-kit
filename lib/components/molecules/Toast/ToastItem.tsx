import { memo, ReactElement, ReactNode, useEffect, useState } from 'react'

import { Alert } from 'components/molecules'
import { Toast } from 'components/molecules/Toast/Toast.types'
import { getToastProgress } from 'components/molecules/Toast/helpers/getToastProgress'

import s from './ToastItem.module.scss'

export interface ToastItemProps {
  toast: Toast
  onClose: (id: string) => void
  enableCloseButton?: boolean
  renderToast?: (toast: Toast, onClose: () => void) => ReactNode
  enableProgressBar?: boolean
  enableHoverPause?: boolean
  onMouseEnter?: (toast: Toast) => void
  onMouseLeave?: (toast: Toast) => void
}

const defaultToastDuration = 4000
const clampProgress = (value: number): number => Math.min(100, Math.max(0, value))

const getCurrentProgress = (toast: Toast): number => {
  const totalDuration = toast.totalDuration ?? toast.duration ?? defaultToastDuration

  if (totalDuration <= 0) {
    return 0
  }

  const segmentDuration = Math.max(toast.remaining ?? toast.duration ?? defaultToastDuration, 0)

  if (toast.pauseStart !== undefined) {
    return clampProgress((segmentDuration / totalDuration) * 100)
  }

  const elapsedProgress = getToastProgress(toast.createdAt, segmentDuration)
  const segmentRatio = clampProgress((segmentDuration / totalDuration) * 100)

  return clampProgress((elapsedProgress / 100) * segmentRatio)
}

/**
 * `ToastItem` renders a single toast notification with optional animations, progress bar,
 * and support for custom content rendering.
 *
 * It can render either a default `Alert` component or a custom toast via the `renderToast` prop.
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

const ToastItemBase = (props: ToastItemProps): ReactElement => {
  const {
    toast,
    onClose,
    renderToast,
    enableProgressBar,
    enableHoverPause = true,
    enableCloseButton,
    onMouseEnter,
    onMouseLeave,
  } = props

  const [progress, setProgress] = useState(() => getCurrentProgress(toast))

  useEffect(() => {
    setProgress(getCurrentProgress(toast))

    if (toast.pauseStart !== undefined || (toast.duration ?? defaultToastDuration) <= 0) {
      return
    }

    const intervalId = setInterval(() => {
      setProgress(getCurrentProgress(toast))
    }, 100)

    return () => clearInterval(intervalId)
  }, [toast])

  const isCloseable = toast.closeable ?? enableCloseButton
  const handleClose = () => onClose(toast.id)
  const handleMouseEnter = enableHoverPause ? () => onMouseEnter?.(toast) : undefined
  const handleMouseLeave = enableHoverPause ? () => onMouseLeave?.(toast) : undefined

  return (
    <div className={s.toastItem} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {renderToast ? (
        renderToast(toast, handleClose)
      ) : (
        <Alert
          typographyVariant={'regular_14'}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          closeable={isCloseable}
          onClose={handleClose}
          duration={toast.duration}
          progressBar={enableProgressBar}
          progress={progress}
        />
      )}
    </div>
  )
}

ToastItemBase.displayName = 'ToastItem'

export const ToastItem = memo(ToastItemBase)
