import type { TypographyVariant } from 'components/atoms/Typography'
import { Typography } from 'components/atoms/Typography'
import clsx from 'clsx'

import s from './ErrorMessage.module.scss'
import { ReactElement } from 'react'

type ErrorVariant = Extract<TypographyVariant, 'danger_small' | 'danger'>

export interface ErrorMessageProps {
  errorMessage: string
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
 * <ErrorMessage errorMessage="This field is required." />
 * <ErrorMessage errorMessage="Invalid email format." variant="danger" />
 * ```
 *
 * @param props - Props for the `ErrorMessage` component
 * @param props.errorMessage - The error message text to display
 * @param props.className - Optional additional class names
 * @param props.variant - Typography variant for styling the message; defaults to `'danger_small'`
 *
 * @returns A `ReactElement` displaying a styled error message
 */

export const ErrorMessage = ({
  errorMessage,
  className,
  variant = 'danger_small',
}: ErrorMessageProps): ReactElement => {
  return (
    <Typography variant={variant} className={clsx(s.errorMessage, className)}>
      {errorMessage}
    </Typography>
  )
}

ErrorMessage.displayName = 'ErrorMessage'
