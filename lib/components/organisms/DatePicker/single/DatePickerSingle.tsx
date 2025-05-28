import clsx from "clsx";
import "react-day-picker/style.css";
import s from "../DatePicker.module.scss";
import { DayPicker, type DayPickerProps } from "react-day-picker";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useId, useMemo, useState } from "react";
import { LabelRadix } from "../../../molecules/LabelRadix";
import { Calendar, CalendarOutline } from "../../../../assets/icons";

/**
 * Props for the DatePickerSingle component.
 */
export type DatePickerSingleProps = {
  value?: Date;
  defaultDate?: Date;
  onDateChange?: (date: Date | undefined) => void;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  inputClassName?: string;
  error?: string;
  hint?: string;
  calendarProps?: Omit<DayPickerProps, "mode" | "selected" | "onSelect">;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "onChange">;

/**
 * Main DatePicker component for single date selection.
 */
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
  const isControlled = value !== undefined;
  const [internalDate, setInternalDate] = useState<Date | undefined>(defaultDate);
  const selectedDate = isControlled ? value : internalDate;
  const today = useMemo(() => new Date(), []);
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const inputId = useId();

  const handleSelect = (date: Date | undefined) => {
    if (!isControlled) {
      setInternalDate(date);
    }
    onDateChange?.(date);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;
    if (event.key === " " || event.key === "Enter") {
      event.preventDefault();
      setIsOpen((prev) => !prev);
    }
  };

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
            <div
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
                {selectedDate
                  ? selectedDate.toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                  : placeholder}
              </div>
              {isOpen ? <Calendar /> : <CalendarOutline />}
            </div>
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
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  modifiers={{
                    today: today,
                    weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
                    hover: () => true,
                    outside: (date) => date.getMonth() !== today.getMonth(),
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
      {hint && !error && <div className={s.hint}>{hint}</div>}
      {error && <div className={s.errorMessage}>{error}</div>}
    </div>
  );
};