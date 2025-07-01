import { type ComponentRef, CSSProperties, forwardRef, ReactNode, useId } from 'react'

import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './Select.module.scss'

import { ArrowDownSimple } from '../../../assets/icons'
import { Typography } from '../../atoms'
import { LabelRadix } from '../LabelRadix'

/**
 * SelectItemsProps represents an individual option in the select dropdown.
 *
 * @property value - Unique identifier for the option (required)
 * @property label - Display text for the option (optional)
 * @property icon - Icon or React element to render before the label (optional)
 */
type SelectItemsProps = {
  value: string
  label?: string
  icon?: ReactNode
}

/**
 * Utility type for nullable props.
 */
type NullableProps<T> = null | T

/**
 * SelectProps defines the props for the Select component.
 *
 * @property id - Optional id for the select trigger element
 * @property className - Additional class name(s) for the trigger
 * @property style - Inline styles for the trigger
 * @property labelClassName - Additional class name(s) for the label
 * @property placeholder - Placeholder text to display when no value is selected
 * @property label - Optional label displayed above the select
 * @property groupLabel - Optional group label for dropdown options
 * @property withSeparator - Whether to show a separator after the group label
 * @property items - Array of options to display in the dropdown
 * @property value - Controlled value for the select (if present)
 * @property defaultValue - Default value for the select (uncontrolled)
 * @property disabled - Whether the select is disabled
 * @property onValueChange - Callback fired when the selected value changes
 * @property width - Custom width for the select trigger
 */
export type SelectProps = {
  id?: string
  className?: string
  style?: CSSProperties
  labelClassName?: string
  placeholder?: string
  label?: string
  groupLabel?: NullableProps<string>
  withSeparator?: boolean
  items: SelectItemsProps[]
  value?: string
  defaultValue?: string
  disabled?: boolean
  onValueChange?: (value: string) => void
  width?: string
  pagination?: boolean
}

/**
 * `Select` is a fully accessible and customizable dropdown select component based on Radix UI Select.
 * It supports icons, group labels, custom styling, and both controlled and uncontrolled usage.
 *
 * ## Features:
 * - Accessible select dropdown menu
 * - Optional label with automatic id association
 * - Optional group label and separator for dropdown options
 * - Supports icons in options
 * - Controlled and uncontrolled value handling
 * - Customizable width, height, padding, and font sizes
 * - Customizable arrow icon size
 * - Scroll buttons for long lists
 *
 * ## Example usage:
 * ```tsx
 * <Select
 *   label="Choose a language"
 *   placeholder="Select..."
 *   width="120px"
 *   height="32px"
 *   padding="8px 12px"
 *   fontSize="14px"
 *   arrowSize="12px"
 *   items={[
 *     { value: "en", label: "English", icon: <EnFlag /> },
 *     { value: "fr", label: "Français", icon: <FrFlag /> }
 *   ]}
 *   onValueChange={val => setValue(val)}
 * />
 * ```
 *
 * ### Props
 * - `props.items` - Array of select options (`{ value: string, label?: string, icon?: ReactNode }`)
 * - `props.label` - Optional label displayed above the select
 * - `props.placeholder` - Placeholder text when no value is selected
 * - `props.value` - Controlled value for the select
 * - `props.defaultValue` - Default value for the select (uncontrolled)
 * - `props.disabled` - Whether the select is disabled
 * - `props.onValueChange` - Callback fired when the selected value changes
 * - `props.groupLabel` - Optional group label for the dropdown
 * - `props.withSeparator` - Show a separator after the group label (default: true)
 * - `props.className` - Additional class name(s) for the select trigger
 * - `props.style` - Inline styles for the select trigger
 * - `props.id` - Optional id for the select trigger
 * - `props.width` - Custom width for the select trigger
 * - `props.pagination` - Pagination class
 *
 * ### Returns
 * - A fully styled and accessible select dropdown component
 */
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
      width = '210px',
      pagination,
      ...rest
    },
    ref
  ) => {
    // Generate a unique id for accessibility if not provided
    const generatedId = useId()
    const id = rest.id || generatedId

    // Inline styles for the trigger
    const triggerStyle: CSSProperties = {
      ...style,
      ...(width && { width }),
    }

    return (
      <div className={s.selectWrapper}>
        {/* Render label above the select if provided */}
        {label && (
          <LabelRadix
            className={s.label}
            typographyVariant={'regular_14'}
            htmlFor={id}
            label={label}
            style={{ color: 'var(--color-light-900)' }}
          />
        )}
        <RadixSelect.Root
          defaultValue={defaultValue}
          value={value}
          onValueChange={rest.onValueChange}
          disabled={disabled}
        >
          {/* Select trigger button */}
          <RadixSelect.Trigger
            id={id}
            className={clsx(s.trigger, className, pagination ? s.pagination : '')}
            ref={ref}
            {...rest}
            style={triggerStyle}
          >
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon asChild>
              <ArrowDownSimple className={s.iconDown} size={pagination ? 16 : 24} />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>
          {/* Dropdown content rendered in a portal */}
          <RadixSelect.Portal>
            <RadixSelect.Content className={s.Content} position={'popper'}>
              <RadixSelect.ScrollUpButton className={s.ScrollButton}>
                <ArrowDownSimple />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className={s.Viewport}>
                <RadixSelect.Group>
                  {/* Render group label and separator if present */}
                  {groupLabel && (
                    <>
                      <RadixSelect.Label>{groupLabel}</RadixSelect.Label>
                      {withSeparator && <RadixSelect.Separator className={s.Separator} />}
                    </>
                  )}
                  {/* Render each option */}
                  {items.map(item => (
                    <RadixSelect.Item
                      key={item.value}
                      value={item.value}
                      className={clsx(s.selectItem)}
                    >
                      <RadixSelect.ItemText asChild>
                        <Typography
                          variant={pagination ? 'regular_14' : 'regular_16'}
                          className={`${s.selectItems} ${s.customFontSize}`}
                        >
                          {item.icon && item.icon} {item.label}
                        </Typography>
                      </RadixSelect.ItemText>
                    </RadixSelect.Item>
                  ))}
                </RadixSelect.Group>
              </RadixSelect.Viewport>
              <RadixSelect.ScrollDownButton className={s.ScrollButton}>
                <ArrowDownSimple size={pagination ? 16 : 24} />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
      </div>
    )
  }
)
Select.displayName = 'Select'
