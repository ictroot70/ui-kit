import s from './Select.module.scss'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { type ComponentRef, forwardRef, ReactNode, useId } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Typography } from '../../atoms'
import { SelectItem } from './SelectItem/SelectItems'
import { LabelRadix } from '../LabelRadix'

// Type definition for individual select items
type SelectItemsProps = {
  value: string
  label?: string
  icon?: ReactNode
}

// Generic type for nullable props
type NullableProps<T> = null | T

// Main Select component wrapped in forwardRef to support ref forwarding
export const Select = forwardRef<ComponentRef<typeof RadixSelect.Trigger>, SelectProps>(
  (
    {
      className,
      placeholder,
      defaultValue,
      value,
      label,
      disabled,
      items,
      groupLabel,
      withSeparator = true,
      style,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId() // Generate a unique ID if not provided
    const id = rest.id || generatedId // Use passed ID or fallback to generated

    // Assign the entire style object (if any) to triggerStyle to apply it to the trigger element
    const triggerStyle = style
    // Extract the width property from the style object, if it exists
    const widthStyle = style?.width

    // If width is specified, create an object with width to apply to the content container; otherwise undefined
    const contentStyle = widthStyle ? { width: widthStyle } : undefined
    // Similarly, create an object with width for the viewport container if width is specified; otherwise undefined
    const viewportStyle = widthStyle ? { width: widthStyle } : undefined

    return (
      <div className={s.selectWrapper}>
        {label && (
          <LabelRadix
            className={s.label}
            typographyVariant={'regular_14'}
            htmlFor={id}
            label={label}
          />
        )}
        {/* Radix Select Root component wraps the full Select logic */}
        <RadixSelect.Root
          defaultValue={defaultValue}
          value={value}
          onValueChange={rest.onValueChange}
          disabled={disabled}
        >
          {/* Trigger component renders the button used to open the dropdown */}
          <RadixSelect.Trigger
            id={id}
            className={clsx(s.trigger, className)}
            ref={ref}
            {...rest}
            style={triggerStyle}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon>
              <ChevronDownIcon className={s.iconDown} />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          {/* Portal ensures dropdown content is rendered at the root of the DOM */}
          <RadixSelect.Portal>
            <RadixSelect.Content className={s.Content} position={'popper'} style={contentStyle}>
              {/* Scroll button for navigating up if items overflow */}
              <RadixSelect.ScrollUpButton className={s.ScrollButton}>
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>
              {/* Viewport holds the list of items */}
              <RadixSelect.Viewport className={s.Viewport} style={viewportStyle}>
                <RadixSelect.Group>
                  {/* Optionally render a group label and separator */}
                  {groupLabel && (
                    <>
                      <RadixSelect.Label style={{ marginLeft: 5 }}>{groupLabel}</RadixSelect.Label>
                      {withSeparator && <RadixSelect.Separator className={s.Separator} />}
                    </>
                  )}
                  {/* Render each item using a custom SelectItem component */}
                  {items.map(item => (
                    <SelectItem key={item.value} value={item.value}>
                      <Typography variant={'regular_14'} className={s.selectItems}>
                        {item.icon && item.icon} {item.label}
                      </Typography>
                    </SelectItem>
                  ))}
                </RadixSelect.Group>
              </RadixSelect.Viewport>
              {/* Scroll button for navigating down if items overflow */}
              <RadixSelect.ScrollDownButton>
                <ChevronDownIcon />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>
    )
  }
)

// Props type definition for the Select component
export type SelectProps = {
  id?: string // Optional ID for the select input
  className?: string // Optional custom class for styling
  style?: React.CSSProperties
  labelClassName?: string // Optional custom class for the label
  placeholder?: string // Placeholder text when nothing is selected
  label?: string // Label text displayed above the select
  groupLabel?: NullableProps<string> // Optional group label inside dropdown
  withSeparator?: boolean // Whether to show a separator below group label
  items: SelectItemsProps[] // List of items for the dropdown
  value?: string // Controlled selected value
  defaultValue?: string // Uncontrolled initial value
  disabled?: boolean // Disables the select if true
  onValueChange?: (value: string) => void // Callback when a new value is selected
}
