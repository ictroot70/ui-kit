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
          weekStartsOn={1}
          mode={'single'}
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
