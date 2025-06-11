import type { TypographyVariant } from 'components/atoms/Typography'

import { ReactElement } from 'react'

import clsx from 'clsx'
import { Typography } from 'components/atoms/Typography'

import styles from './ErrorMessage.module.scss'

type ErrorVariant = Extract<TypographyVariant, 'danger_small' | 'danger'>

export interface ErrorMessageProps {
  message: string
  className?: string
  variant?: ErrorVariant
}

/**
 * `ErrorMessage` is a presentational component used to display validation or error messages
 * in forms and other UI contexts. It leverages the `Typography` component to apply consistent
 * styling, and supports two predefined variants: `'danger_small'` and `'danger'`.
 *
 * ## Features:
 * - Renders error text using `Typography` with consistent styling
 * - Accepts custom class names for additional styling
 * - Supports small and regular error variants via the `variant` prop
 *
 * ## Examples:
 * ```tsx
 * <ErrorMessage message="This field is required." />
 * <ErrorMessage message="Invalid email format." variant="danger" />
 * ```
 *
 * @param props - Props for the `ErrorMessage` component
 * @param props.message - The error message text to display
 * @param props.className - Optional additional class names
 * @param props.variant - Typography variant for styling the message; defaults to `'danger_small'`
 *
 * @returns A `ReactElement` displaying a styled error message
 */

export const ErrorMessage = ({
  message,
  className,
  variant = 'danger_small',
}: ErrorMessageProps): ReactElement => {
  return (
    <Typography variant={variant} className={clsx(styles.message, className)}>
      {message}
    </Typography>
  )
}

ErrorMessage.displayName = 'ErrorMessage'
