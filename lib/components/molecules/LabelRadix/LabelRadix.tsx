import { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'

import { Label } from '@radix-ui/react-label'
import clsx from 'clsx'
import { Typography } from 'components/atoms/Typography'

import styles from './LabelRadix.module.scss'


export interface LabelRadixProps extends ComponentPropsWithoutRef<typeof Label> {
  disabled?: boolean
  children?: ReactNode
  label?: ReactNode
  required?: boolean
  typographyVariant?: Parameters<typeof Typography>[0]['variant']
}

/**
 * `LabelRadix` is a wrapper around the `@radix-ui/react-label` component
 * that enhances native label behavior with custom typography, accessibility features,
 * a required field indicator, and support for disabled state.
 *
 * Typically used to associate a text label with a form element like an `<input>` or `<select>`.
 *
 * ## Features:
 * - Custom label content via the `label` prop
 * - Displays an asterisk (`*`) when `required` is `true`
 * - Adds appropriate ARIA attributes (`aria-required`, `aria-disabled`)
 * - Uses the `Typography` component for consistent label styling
 * - Accepts all native Radix `Label` props
 *
 * ## Examples:
 *
 * ### Basic usage with `htmlFor`
 * ```tsx
 * <LabelRadix htmlFor="email" label="Email address" required />
 * <input id="email" />
 * ```
 *
 * ### Wrapping an input inside the label
 * ```tsx
 * <LabelRadix htmlFor="email" label="Email address" required disabled>
 *   <input id="email" disabled />
 * </LabelRadix>
 * ```
 *
 * @param props - Props for the `LabelRadix` component
 * @param props.label - Optional text or JSX for the label (displayed using the `Typography` component)
 * @param props.children - Optional child nodes, typically form inputs; not used for the label text
 * @param props.required - Whether the associated field is required (adds `aria-required` and `*`)
 * @param props.disabled - Whether the label is for a disabled input (adds `aria-disabled`)
 * @param props.typographyVariant - Typography variant for the label text (e.g. `'regular_14'`); defaults to `'regular_14'`
 * @param props.htmlFor - Associates the label with a form element via its `id`
 * @param props.className - Additional CSS class names
 * @param props.id - Optional ID for the label element
 *
 * @returns A `ReactElement` representing the enhanced label component
 */

export const LabelRadix = (props: LabelRadixProps): ReactElement => {
  const {
    typographyVariant = 'regular_14',
    htmlFor,
    disabled,
    required,
    children,
    label,
    className,
    id,
    ...rest
  } = props
  const labelContent = label && (
    <Typography variant={typographyVariant}>
      {label}
      {required && <span className={styles.required}> *</span>}
    </Typography>
  )

  return (
    <Label
      aria-required={required}
      id={id}
      aria-disabled={disabled}
      className={clsx(styles.label, className)}
      htmlFor={htmlFor}
      {...rest}
    >
      {children}
      {label && labelContent}
    </Label>
  )
}

LabelRadix.displayName = 'LabelRadix'
