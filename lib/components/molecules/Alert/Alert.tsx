import { ReactElement } from 'react'

import { clsx } from 'clsx'
import { TypographyVariant } from 'components/atoms'
import { AlertContent } from 'components/molecules/Alert/components/AlertContent/AlertContent'
import { AlertProgressBar } from 'components/molecules/Alert/components/AlertProgressBar/AlertProgressBar'
import { CloseButton } from 'components/molecules/Alert/components/CloseButton/CloseButton'
import { useProgressBar } from 'components/molecules/Alert/hooks/useAlertProgress'

import styles from 'components/molecules/Alert/Alert.module.scss'

export type AlertType = 'success' | 'error' | 'warning' | 'info'

export type variantType = Extract<TypographyVariant, 'regular_16' | 'bold_16' | 'regular_14'>

export interface AlertProps {
  typographyVariant: variantType
  type: AlertType
  title?: string
  message: string
  onClose?: () => void
  closeable?: boolean
  className?: string
  duration?: number
  progressBar?: boolean
  progress?: number
}

/**
 * Renders a customizable alert component with optional title, message, close button, and progress bar.
 *
 * Typically used for displaying feedback messages such as success, error, warning, or informational alerts.
 *
 * @component
 *
 * @example
 * ```tsx
 * <Alert
 *   type="success"
 *   title="Success!"
 *   message="Your changes have been saved."
 *   duration={5000}
 *   closeable
 *   progressBar
 *   typographyVariant="bold_16"
 * />
 * ```
 *
 * @param props AlertProps - Component properties.
 * @param props.type Type of alert: `'success'`, `'error'`, `'warning'`, or `'info'`.
 * @param props.typographyVariant Typography style for the text: `'regular_16'`, `'bold_16'`, or `'regular_14'`.
 * @param props.title Optional title displayed above the message.
 * @param props.message Main text content of the alert (required).
 * @param props.onClose Optional callback triggered when the alert is closed manually.
 * @param props.closeable Determines if the close button should be rendered (default: `true`).
 * @param props.className Additional CSS class names to apply to the root element.
 * @param props.duration Duration in milliseconds before the alert auto-dismisses (used for progress bar).
 * @param props.progressBar If `true`, displays a progress bar showing time until auto-dismissal.
 * @param props.progress Optional controlled progress value (not commonly used externally).
 *
 * @returns ReactElement - A rendered alert component.
 */

export const Alert = (props: AlertProps): ReactElement => {
  const {
    type,
    typographyVariant = 'regular_16',
    title,
    message,
    onClose,
    closeable = true,
    className,
    duration = 4000,
    progressBar = false,
  } = props
  const progress = useProgressBar(duration, progressBar)

  return (
    <div className={clsx(styles.alert, styles[type], className)}>
      <div className={styles.content}>
        <AlertContent message={message} variant={typographyVariant} title={title} />
        {progressBar && duration !== 0 && <AlertProgressBar progress={progress} />}
      </div>
      {closeable && <CloseButton onClick={onClose} />}
    </div>
  )
}

Alert.displayName = 'Alert'
