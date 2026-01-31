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
