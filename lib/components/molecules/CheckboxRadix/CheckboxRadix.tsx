import {
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
  ReactElement,
  ReactNode,
  useRef,
} from 'react'
import * as Checkbox from '@radix-ui/react-checkbox'
import { clsx } from 'clsx'

import s from './CheckboxRadix.module.scss'
import { CheckboxIndicator } from 'components/molecules/CheckboxRadix/CheckboxIndicator'
import { LabelRadix } from 'components/molecules/LabelRadix'
import { mergeRefs } from 'components/molecules/CheckboxRadix/mergeRefs'
import { ErrorMessage } from 'components/atoms'

export interface CheckboxProps extends ComponentPropsWithoutRef<typeof Checkbox.Root> {
  className?: string
  disabled?: boolean
  errorMessage?: string
  label?: ReactNode
  indeterminate?: boolean
}

/**
 * `CheckboxRadix` is a customizable and accessible checkbox component built with `@radix-ui/react-checkbox`.
 * It wraps Radix's primitive with additional features like custom styling, labels, indeterminate state handling,
 * error messaging, and ARIA enhancements.
 *
 * This component is designed for form use, providing a consistent API and integrated label rendering using `LabelRadix`.
 *
 * ## Features:
 * - Customizable label via the `label` prop (rendered using `LabelRadix`)
 * - Supports the indeterminate state (`checked="indeterminate"`)
 * - Integrates with `ErrorMessage` to show validation errors
 * - Uses `mergeRefs` to allow internal and external ref handling
 * - Fully accessible (`aria-checked`, `role`, `required`, etc.)
 *
 * ## Examples:
 * ```tsx
 * <CheckboxRadix
 *   id="terms"
 *   label="Accept Terms and Conditions"
 *   checked={isChecked}
 *   onCheckedChange={setChecked}
 *   required
 *   errorMessage={hasError ? 'This field is required' : undefined}
 * />
 * ```
 *
 * @param props - Props for configuring the checkbox component
 * @param props.label - Optional text or JSX to be rendered as the label, passed to `LabelRadix`
 * @param props.checked - Controlled checked state (`true`, `false`, or `"indeterminate"`)
 * @param props.indeterminate - Enables the indeterminate visual state when `true`
 * @param props.onCheckedChange - Callback triggered when the checked state changes
 * @param props.disabled - Disables the checkbox and associated label
 * @param props.required - Adds `aria-required` and passes `required` to the input
 * @param props.errorMessage - Optional error text displayed below the checkbox
 * @param props.className - Additional class name(s) for the outer container
 * @param props.id - The `id` used to associate the checkbox with its label via `htmlFor`
 *
 * @returns A fully styled and accessible checkbox component with integrated label and error message
 */

export const CheckboxRadix = forwardRef<ElementRef<typeof Checkbox.Root>, CheckboxProps>(
  (props, ref): ReactElement => {
    const {
      className,
      disabled,
      errorMessage,
      id,
      label,
      onCheckedChange,
      required,
      checked,
      indeterminate = false,
      ...rest
    } = props

    const classNames = {
      container: clsx(s.container, className, disabled && s.disabled),
      btnWrapper: clsx(s.btnWrapper, disabled && s.disabled),
      indicator: s.indicator,
      label: clsx(s.label, disabled && s.disabled),
    }

    const handleCheckedChange = (checked: boolean | 'indeterminate') => {
      onCheckedChange?.(checked)
      if (typeof checked === 'boolean') {
        onCheckedChange?.(checked)
      }
    }
    const buttonRef = useRef<HTMLButtonElement | null>(null)
    return (
      <div className={classNames.container}>
        <LabelRadix
          required
          label={label}
          aria-label={'Checkbox'}
          className={classNames.label}
          htmlFor={id}
        >
          <div className={classNames.btnWrapper}>
            <Checkbox.Root
              role={'checkbox'}
              aria-checked={checked === 'indeterminate' ? 'mixed' : checked}
              tabIndex={0}
              id={id}
              className={s.root}
              checked={indeterminate ? 'indeterminate' : checked}
              onCheckedChange={handleCheckedChange}
              disabled={disabled}
              required={required}
              ref={mergeRefs(ref, buttonRef)}
              {...rest}
            >
              {checked && <CheckboxIndicator className={s.indicator} />}
            </Checkbox.Root>
          </div>
        </LabelRadix>
        {errorMessage && (
          <ErrorMessage
            errorMessage={errorMessage}
            className={s.errorMessage}
            variant={'danger_small'}
          />
        )}
      </div>
    )
  }
)

CheckboxRadix.displayName = 'CheckboxRadix'
