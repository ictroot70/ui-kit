import { HTMLAttributes, ReactElement, useState } from 'react'
import { type DateRange, DayPicker, type DayPickerProps } from 'react-day-picker'

import 'react-day-picker/style.css'
import s from '../styles/DatePicker.module.scss'

import { dayPickerClassNamesForRange, modifiersClassNamesForRange } from '../helpers'
import {
  useDatePickerModifiersForRange,
  useDatePickerBehavior,
  useFormattedRange,
  useStableId,
} from '../hooks'

import { DatePickerWrapper } from './DatePickerWrapper'

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
  const buttonId = useStableId('date-picker-trigger')
  const popoverContentId = useStableId('date-picker-popover')
  const displayText = useFormattedRange(selectedDates, placeholder)
  const modifiers = useDatePickerModifiersForRange(selectedDates)

  const { isFocused, setIsFocused, isOpen, setIsOpen, handleKeyDown } =
    useDatePickerBehavior(disabled)

  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      setInternalDates(range)
      onDateChange?.(range)
    } else {
      setInternalDates({ from: undefined, to: undefined })
      onDateChange?.({ from: undefined, to: undefined })
    }
  }

  return (
    <DatePickerWrapper
      label={label}
      required={required}
      disabled={disabled}
      error={error}
      hint={hint}
      className={className}
      inputClassName={inputClassName}
      buttonId={buttonId}
      popoverContentId={popoverContentId}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isFocused={isFocused}
      setIsFocused={setIsFocused}
      handleKeyDown={handleKeyDown}
      displayText={displayText}
      {...restProps}
    >
      <div className={s.wrapperCalendar}>
        <DayPicker
          animate
          showOutsideDays
          weekStartsOn={1}
          mode={'range'}
          selected={selectedDates}
          onSelect={handleSelect}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNamesForRange}
          classNames={dayPickerClassNamesForRange}
          {...calendarProps}
        />
      </div>
    </DatePickerWrapper>
  )
}

DatePickerRange.displayName = 'DatePickerRange'
