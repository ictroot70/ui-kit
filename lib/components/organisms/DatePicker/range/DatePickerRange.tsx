import clsx from 'clsx'
import 'react-day-picker/style.css'
import s from 'components/organisms/DatePicker/DatePicker.module.scss'
import { type DateRange, DayPicker, type DayPickerProps } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { HTMLAttributes, ReactElement, useState } from 'react'
import { LabelRadix } from 'components/molecules/LabelRadix'
import { Calendar, CalendarOutline } from 'assets/icons'
import { useFormattedRange } from 'components/organisms/DatePicker/range/hooks/useFormattedRange'
import { ErrorMessage } from 'components/atoms/ErrorMessage/ErrorMessage'
import { useDatePickerModifiers } from 'components/organisms/DatePicker/range/hooks/useDatePickerModifiers'
import {
  dayPickerClassNames,
  modifiersClassNames,
} from 'components/organisms/DatePicker/range/helpers/DatePickerModifiers'
import { useStableId } from 'components/organisms/DatePicker/range/hooks/useStableId'

export type DatePickerRangeProps = {
  value?: DateRange
  defaultDate?: DateRange
  onDateChange?: (dates: DateRange) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  inputClassName?: string
  error?: string
  hint?: string
  calendarProps?: Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'>
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

/**
 * DatePickerRange is a reusable React component for selecting a date range using `react-day-picker`.
 * It supports both controlled and uncontrolled modes, with accessible keyboard navigation and
 * customizable styling.
 *
 * @component
 * @example
 * ```tsx
 * <DatePickerRange
 *   label="Select period"
 *   value={dateRange}
 *   onDateChange={setDateRange}
 *   placeholder="Pick a date range"
 *   error="This field is required"
 * />
 * ```
 *
 * @param {DatePickerRangeProps} props - Component props
 * @param {DateRange} [props.value] - Controlled selected date range
 * @param {DateRange} [props.defaultDate] - Default date range (for uncontrolled mode)
 * @param {(dates: DateRange) => void} [props.onDateChange] - Callback when date range changes
 * @param {string} [props.label] - Label displayed above the input
 * @param {string} [props.placeholder] - Placeholder shown when no date is selected
 * @param {boolean} [props.disabled=false] - Disables interaction with the picker
 * @param {boolean} [props.required=false] - Marks the field as required
 * @param {string} [props.className] - Custom class for the outer container
 * @param {string} [props.inputClassName] - Custom class for the trigger input/button
 * @param {string} [props.error] - Error message shown below the input
 * @param {string} [props.hint] - Hint text shown below the input (only if no error)
 * @param {Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'>} [props.calendarProps] - Additional props for `DayPicker`
 * @param {React.HTMLAttributes<HTMLDivElement>} restProps - Other native div attributes
 *
 * @returns {ReactElement} The rendered date range picker component
 */

export const DatePickerRange = ({
  value,
  defaultDate,
  onDateChange,
  label = 'Select Date Range',
  placeholder = 'Select date range',
  disabled = false,
  required = false,
  className,
  inputClassName,
  error,
  hint,
  calendarProps,
  ...restProps
}: DatePickerRangeProps): ReactElement => {
  const isControlled = value !== undefined
  const [internalDates, setInternalDates] = useState<DateRange>(
    defaultDate || { from: undefined, to: undefined }
  )
  const selectedDates = isControlled ? value : internalDates
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const buttonId = useStableId('date-picker-trigger')
  const popoverContentId = useStableId('date-picker-popover')
  const displayText = useFormattedRange(selectedDates, placeholder)
  const modifiers = useDatePickerModifiers(selectedDates)
  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      setInternalDates(range)
      onDateChange?.(range)
    } else {
      setInternalDates({ from: undefined, to: undefined })
      onDateChange?.({ from: undefined, to: undefined })
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      setIsOpen(prev => !prev)
    }
  }

  return (
    <div className={clsx(s.container, className)} {...restProps}>
      <div className={clsx(s.datePickerWrapper, { [s.open]: isOpen })}>
        {label && (
          <LabelRadix
            htmlFor={buttonId}
            required={required}
            className={s.label}
            disabled={disabled}
          >
            {label}
          </LabelRadix>
        )}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
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
              role="button"
              aria-haspopup="dialog"
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
              side="bottom"
              align="start"
              avoidCollisions={true}
              id={popoverContentId}
            >
              <div className={s.wrapperCalendar}>
                <DayPicker
                  animate={true}
                  showOutsideDays
                  weekStartsOn={1}
                  mode="range"
                  selected={selectedDates}
                  onSelect={handleSelect}
                  modifiers={modifiers}
                  modifiersClassNames={modifiersClassNames}
                  classNames={dayPickerClassNames}
                  {...calendarProps}
                />
              </div>
            </PopoverContent>
          )}
        </Popover>
        {hint && !error && <div className={s.hint}>{hint}</div>}
        {error && (
          <ErrorMessage message={error} className={s.errorMessage} variant={'danger_small'} />
        )}
      </div>
    </div>
  )
}
