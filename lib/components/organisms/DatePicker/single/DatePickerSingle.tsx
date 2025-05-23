// Import necessary dependencies
import clsx from "clsx";
import "react-day-picker/style.css";
import s from "../DatePicker.module.scss";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useId, useMemo, useState  } from "react";
import { LabelRadix } from '../../../molecules/LabelRadix'
import { Calendar, CalendarOutline } from '../../../../assets/icons'

// Define props interface for DatePickerSingle component
// Extends HTMLDivElement props but omits onChange
export type DatePickerSingleProps = {
  value?: Date; // Selected date for controlled component
  defaultDate?: Date; // Initial date for uncontrolled component
  onDateChange?: (date: Date | undefined) => void; // Callback when date changes
  label?: string; // Label text above the input
  placeholder?: string; // Placeholder text when no date selected
  disabled?: boolean; // Whether the datepicker is disabled
  required?: boolean; // Whether the field is required
  className?: string; // Additional class for container
  inputClassName?: string; // Additional class for input
  error?: string; // Error message
  hint?: string; // Hint text
  calendarProps?: Omit<DayPickerProps, "mode" | "selected" | "onSelect">; // Additional props for DayPicker
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

// Main DatePicker component for single date selection
export const DatePickerSingle = ({
                                   value,
                                   defaultDate,
                                   onDateChange,
                                   label = "Select Date",
                                   placeholder = "Select date",
                                   disabled = false,
                                   required = false,
                                   className,
                                   inputClassName,
                                   error,
                                   hint,
                                   calendarProps,
                                   ...restProps
                                 }: DatePickerSingleProps) => {
  // State management
  const isControlled = value !== undefined; // Check if component is controlled
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultDate); // Internal state for uncontrolled mode
  const selectedDate = isControlled ? value : internalDate; // Current selected date
  const today = useMemo(() => new Date(), []); // Memoized current date
  const [isFocused, setIsFocused] = useState(false); // Track input focus state
  const [isOpen, setIsOpen] = useState(false); // Track popover open state
  const inputId = useId(); // Generate unique ID for input-label connection

  // Handle date selection
  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) {
      setInternalDate(date); // Update internal state if uncontrolled
    }
    onDateChange?.(date); // Notify parent component about change
  };

  return (
    <div className={clsx(s.container, className)} {...restProps}>
      <div className={s.datePickerWrapper}>
        {/* Render label if provided */}
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

        {/* Popover wrapper for calendar */}
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            {/* Custom input trigger */}
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
              {/* Display selected date or placeholder */}
              <div className={s.dateText}>
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  : placeholder}
              </div>
              {/* Toggle calendar icon based on popover state */}
              {isOpen ? <Calendar /> : <CalendarOutline />}
            </div>
          </PopoverTrigger>

          {/* Calendar popover content */}
          {!disabled && (
            <PopoverContent className={s.popoverContent} side="bottom" align="center" avoidCollisions={true}>
              <div className={s.wrapperCalendar}>
                {/* DayPicker configuration */}
                <DayPicker
                  animate={true}
                  showOutsideDays
                  weekStartsOn={1} // Start week on Monday
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  modifiers={{
                    today: today, // Highlight today
                    weekend: (date) => date.getDay() === 0 || date.getDay() === 6, // Style weekends
                    hover: () => true, // Enable hover effect
                    outside: date => date.getMonth() !== today.getMonth(), // Style days from other months
                  }}
                  modifiersClassNames={{
                    today: s.rdpDay_today,
                    selected: s.rdpDay_selected,
                    weekend: s.weekendDay,
                    hover: s.rdpDay_hover,
                    outside: s.rdpDay_outside,
                  }}
                  classNames={{
                    caption_label: s.rdpCaptionLabel,
                    button_next: s.rdpButton_next,
                    button_previous: s.rdpButton_previous,
                    nav: s.rdpNav,
                  }}
                  {...calendarProps}
                />
              </div>
            </PopoverContent>
          )}
        </Popover>
      </div>

      {/* Display hint or error message */}
      {hint && !error && <div className={s.hint}>{hint}</div>}
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};