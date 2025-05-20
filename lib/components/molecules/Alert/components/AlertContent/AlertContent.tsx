import { Typography, TypographyVariant } from 'components/atoms'
import styles from 'components/molecules/Alert/components/AlertContent/AlertContent.module.scss'

import { ReactElement } from 'react'

export type AlertContentProps = {
  title?: string
  message: string
  variant: TypographyVariant
}

/**
 * AlertContent component renders a styled block with a title and message,
 * typically used inside alert components to display feedback to the user.
 *
 * Designed to be reusable across various alert variants (e.g. success, error, warning).
 *
 * @param {AlertContentProps} props - Props for the AlertContent component.
 * @param {string} [props.title] - Optional alert title.
 * @param {string} props.message - Main alert message text.
 * @param {TypographyVariant} props.variant - Typography style for the message.
 *
 * @example
 * <AlertContent
 *   title="Success"
 *   message="Your changes have been saved successfully."
 *   variant="regular_14"
 * />
 */

export const AlertContent = (props: AlertContentProps): ReactElement => {
  const { title, message, variant } = props
  return (
    <div className={styles.root}>
      {title && (
        <Typography className={styles.title} variant="bold_16">
          {title}
        </Typography>
      )}
      <Typography variant={variant}>{message}</Typography>
    </div>
  )
}
