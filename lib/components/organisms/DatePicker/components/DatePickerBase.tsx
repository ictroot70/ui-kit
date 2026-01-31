import 'react-day-picker/style.css'

import { HTMLAttributes, ReactElement, ReactNode } from 'react'

import { useDatePickerBehavior, useStableId } from '../hooks'

import { DatePickerWrapper } from './DatePickerWrapper'

export type DatePickerBaseProps = {
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
  displayText: string
  children: React.ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

/**
 * `DatePickerBase` is a component that provides the core behavior and state management for the date picker.
 * It uses `useStableId` for generating accessible IDs and `useDatePickerBehavior` to manage the popover's open/closed state.
 * It then passes all the necessary props down to the `DatePickerWrapper` for rendering the UI.
 *
 * ## Features:
 * - Generates stable, unique IDs for accessibility (`buttonId`, `popoverContentId`).
 * - Manages popover visibility and keyboard interactions.
 * - Acts as an intermediary between the final components (`DatePickerSingle`, `DatePickerRange`) and the layout component (`DatePickerWrapper`).
 *
 * ### Props
 * - `props` - Props for configuring the base date picker behavior.
 * - `props.label` - The text label for the date picker.
 * - `props.placeholder` - The placeholder text, used to calculate the display text.
 * - `props.disabled` - If `true`, disables the date picker.
 * - `props.required` - If `true`, adds a required indicator to the label.
 * - `props.classNames` - An object to apply custom CSS classes to internal elements (`wrapper`, `label`, `trigger`, `content`).
 * - `props.error` - An error message to display.
 * - `props.hint` - A hint message to display.
 * - `props.displayText` - The text to display inside the trigger button.
 * - `props.children` - The content to be rendered inside the popover (the calendar).
 *
 * ### Returns
 * - A `DatePickerWrapper` component configured with the necessary state, handlers, and IDs.
 */
export const DatePickerBase = ({
  label,
  placeholder,
  disabled = false,
  required = false,
  classNames,
  error,
  hint,
  displayText,
  children,
  ...restProps
}: DatePickerBaseProps): ReactElement => {
  const buttonId = useStableId('date-picker-trigger')
  const popoverContentId = useStableId('date-picker-popover')

  const { isOpen, setIsOpen, handleKeyDown } = useDatePickerBehavior(disabled)

  return (
    <DatePickerWrapper
      label={label}
      required={required}
      disabled={disabled}
      error={error}
      hint={hint}
      classNames={classNames}
      buttonId={buttonId}
      popoverContentId={popoverContentId}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      handleKeyDown={handleKeyDown}
      displayText={displayText}
      {...restProps}
    >
      {children}
    </DatePickerWrapper>
  )
}

DatePickerBase.displayName = 'DatePickerBase'
