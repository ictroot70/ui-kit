import 'react-day-picker/style.css'
import s from '../styles/DatePicker.module.scss'
import { HTMLAttributes, ReactElement, useState } from 'react'
import { type DateRange, DayPicker, type DayPickerProps } from 'react-day-picker'

import { DatePickerBase } from './DatePickerBase'
import { useDatePickerModifiersForRange, useFormattedRange } from '../hooks'
import { dayPickerClassNamesForRange, modifiersClassNamesForRange } from '../helpers'

export type DatePickerRangeProps = {
  value?: DateRange
  defaultDate?: DateRange
  onDateChange?: (dates: DateRange) => void
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  classNames?: {
    wrapper?: string
    label?: string
    trigger?: string
    content?: string
  }
  error?: string
  hint?: string
  calendarProps?: Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'>
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

/**
 * `DatePickerRange` is a component for selecting a date range from a calendar.
 * It's built upon `react-day-picker` and uses `DatePickerBase` for its structure and behavior.
 * This component handles both controlled (with `value`) and uncontrolled (with `defaultDate`) state for the date range.
 *
 * ## Features:
 * - Date range selection.
 * - Supports controlled and uncontrolled modes.
 * - Displays a formatted date range in the trigger button.
 * - Customizable `react-day-picker` properties via `calendarProps`.
 * - Style customization for internal elements through `classNames`.
 *
 * ## Examples:
 * ```tsx
 * // Uncontrolled
 * <DatePickerRange
 *   label="Booking Dates"
 *   onDateChange={(dates) => console.log(dates.from, dates.to)}
 * />
 *
 * // Controlled
 * const [dateRange, setDateRange] = useState({ from: new Date(), to: undefined });
 * <DatePickerRange
 *   label="Vacation"
 *   value={dateRange}
 *   onDateChange={setDateRange}
 * />
 * ```
 *
 * ### Props
 * - `props` - Props for configuring the range date picker.
 * - `props.value` - The selected date range (for controlled mode).
 * - `props.defaultDate` - The initially selected date range (for uncontrolled mode).
 * - `props.onDateChange` - Callback function triggered when a date range is selected.
 * - `props.label` - The text label for the date picker.
 * - `props.placeholder` - Placeholder text shown when no date range is selected.
 * - `props.disabled` - If `true`, disables the date picker.
 * - `props.required` - If `true`, adds a required indicator to the label.
 * - `props.classNames` - An object to apply custom CSS classes to internal elements.
 * - `props.error` - An error message to display.
 * - `props.hint` - A hint message to display.
 * - `props.calendarProps` - Props to be passed directly to the `react-day-picker` `DayPicker` component.
 *
 * ### Returns
 * - A complete range date picker component with a trigger and a calendar popover.
 */
export const DatePickerRange = ({
  value,
  defaultDate,
  onDateChange,
  label = 'Select Date Range',
  placeholder = 'Select date range',
  disabled = false,
  required = false,
  classNames,
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
      hint={hint}
      error={error}
      label={label}
      required={required}
      disabled={disabled}
      classNames={classNames}
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
