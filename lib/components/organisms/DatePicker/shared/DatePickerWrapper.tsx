import React from "react";
import clsx from "clsx";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { LabelRadix } from "components/molecules/LabelRadix";
import { Calendar, CalendarOutline } from "assets/icons";
import s from "components/organisms/DatePicker/DatePicker.module.scss";
import { ErrorMessage } from '../../../atoms/ErrorMessage/ErrorMessage'

interface DatePickerWrapperProps {
  label?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  hint?: string;
  className?: string;
  inputClassName?: string;
  buttonId: string;
  popoverContentId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  isFocused: boolean;
  setIsFocused: (focused: boolean) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  displayText: string;
  children: React.ReactNode;
}

/**
 * Общий layout/wrapper для DatePicker-компонентов (Single/Range)
 */
export const DatePickerWrapper: React.FC<DatePickerWrapperProps> = ({
                                                                      label,
                                                                      required,
                                                                      disabled,
                                                                      error,
                                                                      hint,
                                                                      className,
                                                                      inputClassName,
                                                                      buttonId,
                                                                      popoverContentId,
                                                                      isOpen,
                                                                      setIsOpen,
                                                                      isFocused,
                                                                      setIsFocused,
                                                                      handleKeyDown,
                                                                      displayText,
                                                                      children,
                                                                    }) => (
  <div className={clsx(s.container, className)}>
    <div className={clsx(s.datePickerWrapper, { [s.open]: isOpen })}>
      {label && (
        <LabelRadix
          htmlFor={buttonId}
          required={required}
          className={clsx(s.label, error && s.labelError)}
          style={{ color: 'var(--color-light-900)' }}
          disabled={disabled}
        >
          {label}
        </LabelRadix>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            id={buttonId}
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
            aria-controls={popoverContentId}
            aria-label={label}
          >
            <div className={s.dateText}>{displayText}</div>
            {isOpen ? <Calendar /> : <CalendarOutline />}
          </button>
        </PopoverTrigger>
        {!disabled && (
          <PopoverContent
            className={s.popoverContent}
            side="bottom"
            align="start"
            avoidCollisions={true}
            id={popoverContentId}
          >
            {children}
          </PopoverContent>
        )}
      </Popover>
      {hint && !error && <div className={s.hint}>{hint}</div>}
      {error && (
        <ErrorMessage message={error} className={s.errorMessage} variant={'danger_small'} />
      )}
    </div>
  </div>
);