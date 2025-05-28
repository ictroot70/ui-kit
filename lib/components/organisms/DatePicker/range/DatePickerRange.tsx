import clsx from 'clsx'
import 'react-day-picker/style.css'
import s from '../DatePicker.module.scss'
import { DayPicker, type DateRange, type DayPickerProps } from 'react-day-picker'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { useId, useMemo, useState } from 'react'
import { LabelRadix } from '../../../molecules/LabelRadix'
import { Calendar, CalendarOutline } from '../../../../assets/icons'

/**
 * Props for the DatePickerRange component.
 */
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

/**
 * Date range picker component with popover calendar and optional error/hint display.
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
                                }: DatePickerRangeProps) => {
  const isControlled = value !== undefined
  const [internalDates, setInternalDates] = useState<DateRange>(
    defaultDate || { from: undefined, to: undefined }
  )
  const selectedDates = isControlled ? value : internalDates
  const today = useMemo(() => new Date(), [])
  const [isFocused, setIsFocused] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const inputId = useId()

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
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <button
              id={inputId}
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
            >
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
              {isOpen ? <Calendar /> : <CalendarOutline />}
            </button>
          </PopoverTrigger>
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
                    outside: date => date.getMonth() !== today.getMonth(),
                  }}
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
      {hint && !error && <div className={s.hint}>{hint}</div>}
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  )
}
