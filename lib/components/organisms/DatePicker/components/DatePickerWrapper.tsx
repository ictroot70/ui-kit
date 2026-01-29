import React from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Calendar, CalendarOutline } from 'assets/icons'
import { clsx } from 'clsx'
import { ErrorMessage } from 'components/atoms'
import { LabelRadix } from 'components/molecules'

import s from '../styles/DatePicker.module.scss'

interface DatePickerWrapperProps {
  label?: string
  required?: boolean
  disabled?: boolean
  error?: string
  hint?: string
  className?: string
  inputClassName?: string
  buttonId: string
  popoverContentId: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  isFocused: boolean
  setIsFocused: (focused: boolean) => void
  handleKeyDown: (event: React.KeyboardEvent) => void
  displayText: string
  children: React.ReactNode
}

/**
 * Общий layout/wrapper для DatePicker-компонентов (Single/Range)
 */
export const DatePickerWrapper: React.FC<DatePickerWrapperProps> = ({
  label,
  required,
  disabled,
  error,
  hint,
  className,
  inputClassName,
  buttonId,
  popoverContentId,
  isOpen,
  setIsOpen,
  isFocused,
  setIsFocused,
  handleKeyDown,
  displayText,
  children,
}) => (
  <div className={clsx(s.container, className)}>
    <div className={clsx(s.datePickerWrapper, { [s.open]: isOpen })}>
      {label && (
        <LabelRadix
          htmlFor={buttonId}
          required={required}
          className={clsx(s.label, error && s.labelError)}
          disabled={disabled}
        >
          {label}
        </LabelRadix>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type={'button'}
            id={buttonId}
            tabIndex={disabled ? -1 : 0}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            className={clsx(
              s.datePicker,
              disabled && s.disabled,
              error && s.error,
              isFocused && s.focused,
              inputClassName
            )}
            aria-disabled={disabled}
            role={'button'}
            aria-haspopup={'dialog'}
            aria-expanded={isOpen}
            aria-controls={popoverContentId}
            aria-label={label}
          >
            <div className={s.dateText}>{displayText}</div>
            {isOpen ? <Calendar /> : <CalendarOutline />}
          </button>
        </PopoverTrigger>
        {!disabled && (
          <PopoverContent
            className={s.popoverContent}
            side={'bottom'}
            align={'start'}
            avoidCollisions
            id={popoverContentId}
          >
            {children}
          </PopoverContent>
        )}
      </Popover>
      {hint && !error && !isOpen && <div className={s.hint}>{hint}</div>}
      {error && !isOpen && (
        <ErrorMessage message={error} className={s.errorMessage} variant={'danger_small'} />
      )}
    </div>
  </div>
)
