import { HTMLAttributes, ReactElement, useState } from 'react'
import { type DateRange, DayPicker, type DayPickerProps } from 'react-day-picker'

import 'react-day-picker/style.css'
import s from '../styles/DatePicker.module.scss'

import { dayPickerClassNamesForRange, modifiersClassNamesForRange } from '../helpers'
import { useDatePickerModifiersForRange, useFormattedRange } from '../hooks'

import { DatePickerBase } from './DatePickerBase'

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

  const displayText = useFormattedRange(selectedDates, placeholder)
  const modifiers = useDatePickerModifiersForRange(selectedDates)

  const handleSelect = (range: DateRange | undefined) => {
    if (range) {
      if (!isControlled) {
        setInternalDates(range)
      }
      onDateChange?.(range)
    } else {
      if (!isControlled) {
        setInternalDates({ from: undefined, to: undefined })
      }
      onDateChange?.({ from: undefined, to: undefined })
    }
  }

  return (
    <DatePickerBase
      label={label}
      required={required}
      disabled={disabled}
      error={error}
      hint={hint}
      className={className}
      inputClassName={inputClassName}
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
    </DatePickerBase>
  )
}

DatePickerRange.displayName = 'DatePickerRange'
