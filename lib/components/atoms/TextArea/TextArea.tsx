import { DetailedHTMLProps, TextareaHTMLAttributes, forwardRef } from 'react'
import s from './TextArea.module.scss'
import { clsx } from 'clsx'
import { Typography } from '../Typography'

type DefaultTextAreaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>

export interface TextAreaProps extends DefaultTextAreaPropsType {
  error?: string
  label?: string
  placeholder?: string
  disabled?: boolean
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, error, label, disabled, placeholder, ...restProps }, ref) => {

    return (
      <Typography variant={'regular_14'}>
        <div className={clsx(s.textAreaWrapper, disabled && s.disabled)}>
          {label && <label className={s.label}>{label}</label>}
          <Typography variant={'regular_16'}>
          <textarea
            className={clsx(s.textArea, className, error && s.error, disabled && s.disabled)}
            disabled={disabled}
            ref={ref}
            placeholder={placeholder}
            {...restProps}
          />
          </Typography>
          {error && <span className={s.errorText}>{error}</span>}
        </div>
      </Typography>
    )
  },
)

TextArea.displayName = 'TextArea'