import 'react-day-picker/style.css'

import { HTMLAttributes, ReactElement } from 'react'

import { useDatePickerBehavior, useStableId } from '../hooks'

import { DatePickerWrapper } from './DatePickerWrapper'

export type DatePickerBaseProps = {
  label?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  className?: string
  inputClassName?: string
  error?: string
  hint?: string
  displayText: string
  children: React.ReactNode
} & Omit<HTMLAttributes<HTMLDivElement>, 'onChange'>

export const DatePickerBase = ({
  label,
  placeholder,
  disabled = false,
  required = false,
  className,
  inputClassName,
  error,
  hint,
  displayText,
  children,
  ...restProps
}: DatePickerBaseProps): ReactElement => {
  const buttonId = useStableId('date-picker-trigger')
  const popoverContentId = useStableId('date-picker-popover')

  const { isOpen, setIsOpen, handleKeyDown } =
    useDatePickerBehavior(disabled)

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
      handleKeyDown={handleKeyDown}
      displayText={displayText}
      {...restProps}
    >
      {children}
    </DatePickerWrapper>
  )
}

DatePickerBase.displayName = 'DatePickerBase'
