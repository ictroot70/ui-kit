import { DetailedHTMLProps, forwardRef, TextareaHTMLAttributes } from 'react'

import { clsx } from 'clsx'
import { ErrorMessage } from 'components/atoms/ErrorMessage/ErrorMessage'
import { LabelRadix } from 'components/molecules/LabelRadix/LabelRadix'

import s from './TextArea.module.scss'

export type DefaultTextAreaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export interface TextAreaProps extends DefaultTextAreaPropsType {
  error?: string
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  id?: string
  className?: string
}

/**
 * `TextArea` is a component that renders a textarea field with a label and error message.
 * It provides a multi-line text input with enhanced accessibility and styling.
 *
 * ## Features:
 * - Renders a textarea field with a label and error message
 * - Supports disabled state
 * - Supports required state
 * - Supports error state
 * - Uses LabelRadix for consistent label styling
 * - Uses ErrorMessage for consistent error display
 *
 * ## Examples:
 * ```tsx
 * // Basic usage
 * <TextArea
 *   label="Description"
 *   placeholder="Enter your description"
 *   id="description"
 * />
 *
 * // With required state
 * <TextArea
 *   label="Required Description"
 *   placeholder="This field is required"
 *   required
 *   id="required"
 * />
 *
 * // With error state
 * <TextArea
 *   label="Description"
 *   placeholder="Enter your description"
 *   error="This field is required"
 *   id="error"
 * />
 * ```
 *
 * - @param props - Props for the `TextArea` component
 * - @param props.label - The label for the textarea field
 * - @param props.error - The error message to display
 * - @param props.placeholder - The placeholder text for the textarea field
 * - @param props.disabled - Whether the textarea field is disabled
 * - @param props.required - Whether the textarea field is required
 * - @param props.id - The id for the textarea field (required for accessibility)
 * - @param props.className - Optional additional class names
 * - @param props.value - The value of the textarea
 * - @param props.onChange - Callback fired when the value changes
 *
 * You should use the `id` prop to identify the textarea field for accessibility purposes (especially when using the 'label' and `error` props).
 *
 * @returns A `ReactElement` displaying a styled textarea field with a label and error message
 */

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    { className, error, label, disabled, placeholder, required, value, onChange, id, ...restProps },
    ref
  ) => {
    return (
      <div className={clsx(s.textAreaWrapper, disabled && s.disabled)}>
        {label && (
          <LabelRadix
            label={label}
            htmlFor={id}
            typographyVariant={'regular_14'}
            required={required}
            disabled={disabled}
            className={clsx(s.label, disabled && s.disabled)}
          />
        )}
        <textarea
          className={clsx(s.textArea, className, error && s.error, disabled && s.disabled)}
          disabled={disabled}
          ref={ref}
          placeholder={placeholder}
          id={id}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          value={value}
          onChange={onChange}
          {...restProps}
        />
        {error && <ErrorMessage message={error} variant={'danger'} />}
      </div>
    )
  }
)

TextArea.displayName = 'TextArea'
