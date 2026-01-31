import { clsx } from 'clsx'
import s from '../styles/DatePicker.module.scss'
import { LabelRadix } from 'components/molecules'
import { ErrorMessage } from 'components/atoms'
import { Popover, PopoverContent, PopoverPortal, PopoverTrigger } from '@radix-ui/react-popover'
import { Calendar, CalendarOutline } from 'assets/icons'

interface DatePickerWrapperProps {
  label?: string
  required?: boolean
  disabled?: boolean
  error?: string | React.ReactNode
  hint?: string
  classNames?: {
    wrapper?: string
    label?: string
    trigger?: string
    content?: string
  }
  buttonId: string
  popoverContentId: string
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  handleKeyDown: (event: React.KeyboardEvent) => void
  displayText: string
  children: React.ReactNode
}

/**
 * `DatePickerWrapper` is a shared layout component that provides the main structure and styling for `DatePickerSingle` and `DatePickerRange`.
 * It's built upon `@radix-ui/react-popover` to handle the floating calendar view and includes the trigger button, label, and error/hint messages.
 *
 * ## Features:
 * - Provides a consistent layout for all date picker variants.
 * - Manages the popover state (open/closed).
 * - Displays label, error messages, and hints.
 * - Integrates ARIA attributes for accessibility, connecting the trigger button and the popover content.
 * - Allows style customization through the `classNames` prop.
 *
 * ### Props
 * - `props` - Props for configuring the DatePicker wrapper.
 * - `props.label` - The text label displayed above the date picker trigger.
 * - `props.required` - If `true`, adds a required indicator to the label.
 * - `props.disabled` - If `true`, disables the date picker and styles it accordingly.
 * - `props.error` - An error message (string or ReactNode) to display below the picker.
 * - `props.hint` - A hint message to display below the picker when there is no error.
 * - `props.classNames` - An object to apply custom CSS classes to internal elements (`wrapper`, `label`, `trigger`, `content`).
 * - `props.buttonId` - A unique ID for the trigger button, used for `htmlFor` on the label.
 * - `props.popoverContentId` - A unique ID for the popover content, used for ARIA attributes.
 * - `props.isOpen` - A boolean controlling the visibility of the popover.
 * - `props.setIsOpen` - A function to update the `isOpen` state.
 * - `props.handleKeyDown` - A keydown event handler for the trigger button.
 * - `props.displayText` - The text to display inside the trigger button (e.g., the selected date).
 * - `props.children` - The content to be rendered inside the popover (the calendar).
 *
 * ### Returns
 * - A fully structured date picker layout component with a trigger and a popover for calendar content.
 */
export const DatePickerWrapper: React.FC<DatePickerWrapperProps> = ({
  label,
  required,
  disabled,
  error,
  hint,
  classNames,
  buttonId,
  popoverContentId,
  isOpen,
  setIsOpen,
  handleKeyDown,
  displayText,
  children,
}) => (
  <div className={clsx(s.container, classNames?.wrapper)}>
    <div className={s.datePickerWrapper}>
      {label && (
        <LabelRadix
          htmlFor={buttonId}
          required={required}
          className={clsx(s.label, classNames?.label)}
          disabled={disabled}
        >
          {label}
        </LabelRadix>
      )}
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <button
            type={'button'}
            id={buttonId}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={handleKeyDown}
            className={clsx(
              s.datePicker,
              disabled && s.disabled,
              error && s.error,
              classNames?.trigger
            )}
            aria-disabled={disabled}
            role={'button'}
            aria-haspopup={'dialog'}
            aria-expanded={isOpen}
            aria-controls={popoverContentId}
            aria-label={label}
          >
            <div>{displayText}</div>
            {isOpen ? <Calendar /> : <CalendarOutline />}
          </button>
        </PopoverTrigger>
        {!disabled && (
          <PopoverPortal>
            <PopoverContent
              className={clsx(s.popoverContent, classNames?.content)}
              side={'bottom'}
              align={'start'}
              avoidCollisions
              id={popoverContentId}
            >
              {children}
            </PopoverContent>
          </PopoverPortal>
        )}
      </Popover>
      {hint && !error && !isOpen && <div className={s.hint}>{hint}</div>}
      {error &&
        !isOpen &&
        (typeof error === 'string' ? (
          <ErrorMessage message={error} variant={'danger_small'} />
        ) : (
          error
        ))}
    </div>
  </div>
)
