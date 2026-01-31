import 'react-day-picker/style.css'
import s from '../styles/DatePicker.module.scss'

import { HTMLAttributes, ReactElement, ReactNode, useState } from 'react'
import { DayPicker, type DayPickerProps } from 'react-day-picker'

import { dayPickerClassNames, modifiersClassNames } from '../helpers'
import { useDatePickerModifiers, useFormattedDate } from '../hooks'

import { DatePickerBase } from './DatePickerBase'

export type DatePickerSingleProps = {
  value?: Date
  defaultDate?: Date
  onDateChange?: (date: Date | undefined) => void
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
  error?: string | ReactNode
  hint?: string
  calendarProps?: Omit<DayPickerProps, 'mode' | 'selected' | 'onSelect'>
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

/**
 * `DatePickerSingle` is a component for selecting a single date from a calendar.
 * It's built upon `react-day-picker` and uses `DatePickerBase` for its structure and behavior.
 * This component handles both controlled (with `value`) and uncontrolled (with `defaultDate`) state.
 *
 * ## Features:
 * - Single date selection.
 * - Supports controlled and uncontrolled modes.
 * - Displays a formatted date in the trigger button.
 * - Customizable `react-day-picker` properties via `calendarProps`.
 * - Style customization for internal elements through `classNames`.
 *
 * ## Examples:
 * ```tsx
 * // Uncontrolled
 * <DatePickerSingle
 *   label="Event Date"
 *   onDateChange={(date) => console.log(date)}
 * />
 *
 * // Controlled
 * const [date, setDate] = useState(new Date());
 * <DatePickerSingle
 *   label="Birth Date"
 *   value={date}
 *   onDateChange={setDate}
 * />
 * ```
 *
 * ### Props
 * - `props` - Props for configuring the single date picker.
 * - `props.value` - The selected date (for controlled mode).
 * - `props.defaultDate` - The initially selected date (for uncontrolled mode).
 * - `props.onDateChange` - Callback function triggered when a date is selected.
 * - `props.label` - The text label for the date picker.
 * - `props.placeholder` - Placeholder text shown when no date is selected.
 * - `props.disabled` - If `true`, disables the date picker.
 * - `props.required` - If `true`, adds a required indicator to the label.
 * - `props.classNames` - An object to apply custom CSS classes to internal elements.
 * - `props.error` - An error message to display.
 * - `props.hint` - A hint message to display.
 * - `props.calendarProps` - Props to be passed directly to the `react-day-picker` `DayPicker` component.
 *
 * ### Returns
 * - A complete single date picker component with a trigger and a calendar popover.
 */
export const DatePickerSingle = ({
  value,
  defaultDate,
  onDateChange,
  label = 'Select Date',
  placeholder = 'Select date',
  disabled = false,
  required = false,
  classNames,
  error,
  hint,
  calendarProps,
  ...restProps
}: DatePickerSingleProps): ReactElement => {
  const isControlled = value !== undefined
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultDate)
  const selectedDate = isControlled ? value : internalDate

  const displayText = useFormattedDate(selectedDate, placeholder)
  const modifiers = useDatePickerModifiers()

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) {
      setInternalDate(date)
    }
    onDateChange?.(date)
  }

  return (
    <DatePickerBase
      label={label}
      required={required}
      disabled={disabled}
      error={error}
      hint={hint}
      classNames={classNames}
      displayText={displayText}
      {...restProps}
    >
      <div className={s.wrapperCalendar}>
        <DayPicker
          animate
          mode={'single'}
          showOutsideDays
          weekStartsOn={1}
          selected={selectedDate}
          onSelect={handleSelect}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          classNames={dayPickerClassNames}
          {...calendarProps}
        />
      </div>
    </DatePickerBase>
  )
}

DatePickerSingle.displayName = 'DatePickerSingle'
