import clsx from 'clsx'
import 'react-day-picker/style.css'
import s from '../DatePicker.module.scss'
import { DayPicker, type DateRange, type DayPickerProps } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useId, useMemo, useState } from 'react'
import { LabelRadix } from '../../../molecules/LabelRadix'
import { Calendar, CalendarOutline } from '../../../../assets/icons'


// Type definition for the date range picker props
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
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'>


// Date range picker component
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
}: DatePickerRangeProps) => {
  // If value is provided, the component is controlled
  const isControlled = value !== undefined
  // Internal state for uncontrolled mode
  const [internalDates, setInternalDates] = useState<DateRange>(
    defaultDate || { from: undefined, to: undefined }
  )
  // Determine which dates are selected
  const selectedDates = isControlled ? value : internalDates
  // Store today's date for highlighting
  const today = useMemo(() => new Date(), [])
  // UI state for focus and popover open status
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // Generate a unique id for accessibility
  const inputId = useId()

  // Handler for date selection
  const handleSelect = (range: DateRange | undefined) => {
    // If range is defined, update state and notify parent
    if (range) {
      setInternalDates(range)
      onDateChange?.(range)
    } else {
      // If only one date is selected, reset the range
      setInternalDates({ from: undefined, to: undefined })
      onDateChange?.({ from: undefined, to: undefined })
    }
  }

  return (
    <div className={clsx(s.container, className)} {...restProps}>
      <div className={s.datePickerWrapper}>
        {label && (
          <LabelRadix
            htmlFor={inputId}
            required={required}
            className={s.label}
            disabled={disabled}
          >
            {label}
          </LabelRadix>
        )}
        {/* The popover contains the calendar and the trigger input */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <div
              id={inputId}
              tabIndex={disabled ? -1 : 0}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={clsx(
                s.datePicker,
                disabled && s.disabled,
                error && s.error,
                isFocused && s.focused,
                inputClassName
              )}
              aria-disabled={disabled}
              role="button"
            >
              {/* Show the selected date range or placeholder */}
              <div className={s.dateText}>
                {selectedDates.from && selectedDates.to
                  ? `${selectedDates.from.toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })} - ${selectedDates.to.toLocaleDateString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                    })}`
                  : placeholder}
              </div>
              {/* Show calendar icon depending on popover state */}
              {isOpen ? <Calendar /> : <CalendarOutline />}
            </div>
          </PopoverTrigger>
          {/* Only render calendar if not disabled */}
          {!disabled && (
            <PopoverContent
              className={s.popoverContent}
              side="bottom"
              align="center"
              avoidCollisions={true}
            >
              <div className={s.wrapperCalendar}>
                <DayPicker
                  animate={true}
                  showOutsideDays
                  weekStartsOn={1}
                  mode="range"
                  selected={selectedDates}
                  onSelect={handleSelect}
                  modifiers={{
                    today: today,
                    weekend: date => date.getDay() === 0 || date.getDay() === 6,
                    inRange: date => {
                      const { from, to } = selectedDates
                      return !!(from && to && date >= from && date <= to)
                    },
                    hover: () => true,
                    outside: date => date.getMonth() !== today.getMonth(), // Дни другого месяца
                  }}
                  // Apply custom classes for day states
                  modifiersClassNames={{
                    today: s.rdpDay_today,
                    selected: s.rdpDay_selected,
                    weekend: s.weekendDay,
                    disabled: s.rdpDayDisabled,
                    inRange: s.rdpDay_inRange,
                    range_start: s.rdpDay_first,
                    range_end: s.rdpDay_last,
                    hover: s.rdpDay_hover,
                    outside: s.rdpDay_outside,
                  }}
                  // Custom class names for calendar elements
                  classNames={{
                    caption_label: s.rdpCaptionLabel,
                    button_next: s.rdpButton_next,
                    button_previous: s.rdpButton_previous,
                    nav: s.rdpNav,
                    day_range_start: 'rdpDay_first',
                    day_range_end: 'rdpDay_last',
                    day_range_middle: 'rdpDay_inRange',
                  }}
                  {...calendarProps}
                />
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>
      {/* Show hint or error message below the input */}
      {hint && !error && <div className={s.hint}>{hint}</div>}
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
}
