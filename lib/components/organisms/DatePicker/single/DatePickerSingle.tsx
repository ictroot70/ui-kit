import 'react-day-picker/style.css'
import s from 'components/organisms/DatePicker/DatePicker.module.scss'
import { DayPicker, type DayPickerProps } from 'react-day-picker'
import { HTMLAttributes, ReactElement, useState } from 'react'
import { useFormattedDate } from 'components/organisms/DatePicker/single/hooks/useFormattedDate'
import {
  dayPickerClassNames,
  modifiersClassNames,
} from 'components/organisms/DatePicker/single/helpers/DatePickerModifiers'
import { useDatePickerModifiers } from './helpers/useDatePickerModifiers'
import { useDatePickerBehavior } from '../shared/useDatePickerBehavior'
import { DatePickerWrapper } from '../shared/DatePickerWrapper'
import { useStableId } from './hooks/useStableld'



export type DatePickerSingleProps = {
  value?: Date
  defaultDate?: Date
  onDateChange?: (date: Date | undefined) => void
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
 * DatePickerSingle is a reusable React component for selecting a single date using `react-day-picker`.
 * It supports both controlled and uncontrolled modes, with accessible keyboard navigation and customizable styling.
 *
 * @component
 * @example
 * ```tsx
 * <DatePickerSingle
 *   label="Date of birth"
 *   value={selectedDate}
 *   onDateChange={setSelectedDate}
 *   placeholder="Select your date"
 *   error="This field is required"
 * />
 * ```
 *
 * @param {DatePickerSingleProps} props - Component props
 * @param {Date} [props.value] - Controlled selected date
 * @param {Date} [props.defaultDate] - Default date (for uncontrolled mode)
 * @param {(date: Date | undefined) => void} [props.onDateChange] - Callback when date changes
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
 * @returns {ReactElement} The rendered single date picker component
 */
export const DatePickerSingle = ({
  value,
  defaultDate,
  onDateChange,
  label = 'Select Date',
  placeholder = 'Select date',
  disabled = false,
  required = false,
  className,
  inputClassName,
  error,
  hint,
  calendarProps,
  ...restProps
}: DatePickerSingleProps): ReactElement => {
  const isControlled = value !== undefined
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultDate)
  const selectedDate = isControlled ? value : internalDate
  const buttonId = useStableId('date-picker-trigger')
  const popoverContentId = useStableId('date-picker-popover')
  const displayText = useFormattedDate(selectedDate, placeholder)
  const modifiers = useDatePickerModifiers()

  const { isFocused, setIsFocused, isOpen, setIsOpen, handleKeyDown } =
    useDatePickerBehavior(disabled)

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) setInternalDate(date)
    onDateChange?.(date)
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
          animate={true}
          showOutsideDays
          weekStartsOn={1}
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          modifiers={modifiers}
          modifiersClassNames={modifiersClassNames}
          classNames={dayPickerClassNames}
          {...calendarProps}
        />
      </div>
    </DatePickerWrapper>
  )
}