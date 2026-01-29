import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
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
  handleKeyDown,
  displayText,
  children,
}) => (
  <div className={clsx(s.container, className)}>
    <div className={s.datePickerWrapper}>
      {label && (
        <LabelRadix htmlFor={buttonId} required={required} className={s.label} disabled={disabled}>
          {label}
        </LabelRadix>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type={'button'}
            id={buttonId}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            className={clsx(s.datePicker, disabled && s.disabled, error && s.error, inputClassName)}
            aria-disabled={disabled}
            role={'button'}
            aria-haspopup={'dialog'}
            aria-expanded={isOpen}
            aria-controls={popoverContentId}
            aria-label={label}
          >
            <div>{displayText}</div>
            {isOpen ? <Calendar /> : <CalendarOutline />}
          </button>
        </PopoverTrigger>
        {!disabled && (
          <PopoverPortal>
            <PopoverContent
              className={s.popoverContent}
              side={'bottom'}
              align={'start'}
              avoidCollisions
              id={popoverContentId}
            >
              {children}
            </PopoverContent>
          </PopoverPortal>
        )}
      </Popover>
      {hint && !error && !isOpen && <div className={s.hint}>{hint}</div>}
      {error && !isOpen && <ErrorMessage message={error} variant={'danger_small'} />}
    </div>
  </div>
)
