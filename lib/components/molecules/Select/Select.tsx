import { type ComponentRef, forwardRef, ReactNode, useId } from 'react'

import * as ScrollArea from '@radix-ui/react-scroll-area'
import * as RadixSelect from '@radix-ui/react-select'
import ArrowDownSimple from 'assets/icons/components/ArrowDownSimple'
import { clsx } from 'clsx'
import { ErrorMessage, Typography } from 'components/atoms'

import s from './Select.module.scss'

import { LabelRadix } from '../LabelRadix'

export type SelectItemsProps = {
  value: string
  label?: string
  icon?: ReactNode
}

type SelectClassNames = {
  label?: string
  trigger?: string
  content?: string
  item?: string
}

export type SelectProps = {
  id?: string
  label?: string
  error?: string
  items: SelectItemsProps[]
  placeholder?: string
  size?: 'medium' | 'small'
  value?: string
  disabled?: boolean
  defaultValue?: string
  onValueChange?: (value: string) => void
  collisionPadding?: number | Partial<Record<'top' | 'right' | 'bottom' | 'left', number>>
  avoidCollisions?: boolean
  /**
   * @deprecated Use `classNames.trigger`.
   */
  className?: string
  /**
   * @deprecated Use `classNames.content`.
   */
  contentClassName?: string
  /**
   * @deprecated Use `classNames.label`.
   */
  labelClassName?: string
  classNames?: SelectClassNames
}

/**
 * `Select` is a fully accessible and customizable dropdown select component based on Radix UI Select.
 * It supports icons, custom styling, and both controlled and uncontrolled usage.
 *
 * ## Features:
 * - Accessible select dropdown menu
 * - Optional label with automatic id association
 * - Error state with message rendering
 * - Supports icons in options
 * - Controlled and uncontrolled value handling
 * - Customizable size via 'size' prop affecting padding, font sizes, and arrow icon size
 * - Scroll buttons for long lists (if max-height is set)
 *
 * ## Example usage:
 * ```tsx
 * <Select
 *   label="Choose a language"
 *   placeholder="Select..."
 *   size="medium"
 *   items={[
 *     { value: "en", label: "English", icon: <EnFlag /> },
 *     { value: "fr", label: "Français", icon: <FrFlag /> }
 *   ]}
 *   onValueChange={val => setValue(val)}
 *   classNames={{ content: 'my-custom-content-class' }}
 * />
 * ```
 *
 * ### Props
 * - `props.items` - Array of select options (`{ value: string, label?: string, icon?: ReactNode }`)
 * - `props.label` - Optional label displayed above the select
 * - `props.placeholder` - Placeholder text when no value is selected
 * - `props.error` - Optional error message displayed below the select
 * - `props.value` - The controlled value of the select. Should be used in conjunction with `onValueChange` to manage the component's state.
 * - `props.defaultValue` - The initial value for an uncontrolled select. The component manages its own state internally.
 * - `props.disabled` - Whether the select is disabled
 * - `props.onValueChange` - Callback fired when the selected value changes
 * - `props.id` - Optional id for the select trigger
 * - `props.size` - Determines the size of the select component, affecting padding, font size, and icon size. Available options are 'medium' or 'small'.
 * - `props.collisionPadding` - The padding between the content and the viewport edge. Can be a single number or a partial object of paddings. Defaults to `20`.
 * - `props.classNames` - An object of custom class names for the component's parts, allowing for targeted style overrides. Can include `label`, `trigger`, `content`, and `item`.
 *
 * @todo SCRUM-26 (tech debt): after one stable cycle, remove deprecated `className`, `contentClassName`, and `labelClassName`
 * aliases and keep only slot-based `classNames`.
 *
 * ### Returns
 * - A fully styled and accessible select dropdown component
 */
export const Select = forwardRef<ComponentRef<typeof RadixSelect.Trigger>, SelectProps>(
  (
    {
      id: providedId,
      className,
      contentClassName,
      labelClassName,
      placeholder,
      defaultValue,
      value,
      label,
      error,
      disabled,
      items,
      size = 'medium',
      onValueChange,
      collisionPadding = 20,
      avoidCollisions = false,
      classNames = {},
      ...rest
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || generatedId

    return (
      <div className={s.wrapper}>
        {!!label && (
          <LabelRadix
            htmlFor={id}
            label={label}
            className={clsx(s.label, classNames.label, labelClassName)}
            invalid={Boolean(error)}
            typographyVariant={'regular_14'}
          />
        )}
        <RadixSelect.Root
          value={value}
          disabled={disabled}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
        >
          <RadixSelect.Trigger
            id={id}
            ref={ref}
            className={clsx(
              s.trigger,
              error && s.triggerError,
              classNames.trigger,
              className,
              s[`trigger--${size}`]
            )}
            aria-invalid={Boolean(error)}
            {...rest}
          >
            <RadixSelect.Value className={s.value} data-slot={'value'} placeholder={placeholder} />
            <RadixSelect.Icon asChild>
              <ArrowDownSimple
                className={s.icon}
                data-slot={'icon'}
                size={size === 'small' ? 16 : 24}
              />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              position={'popper'}
              avoidCollisions={avoidCollisions}
              collisionPadding={collisionPadding}
              className={clsx(s.content, classNames.content, contentClassName)}
            >
              <ScrollArea.Root type={'auto'}>
                <RadixSelect.Viewport asChild>
                  <ScrollArea.Viewport>
                    {items.map(item => (
                      <RadixSelect.Item
                        key={item.value}
                        value={item.value}
                        data-slot={'item'}
                        className={clsx(s.item, classNames.item, s[`item--${size}`])}
                      >
                        <RadixSelect.ItemText asChild>
                          <Typography
                            variant={size === 'small' ? 'regular_14' : 'regular_16'}
                            className={s.list}
                            data-slot={'item-text'}
                          >
                            {item.icon && item.icon} {item.label}
                          </Typography>
                        </RadixSelect.ItemText>
                      </RadixSelect.Item>
                    ))}
                  </ScrollArea.Viewport>
                </RadixSelect.Viewport>

                <ScrollArea.Scrollbar orientation={'vertical'}>
                  <ScrollArea.Thumb />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>
        {error && <ErrorMessage message={error} variant={'danger'} />}
      </div>
    )
  }
)
Select.displayName = 'Select'
