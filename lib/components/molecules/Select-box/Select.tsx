import s from './Select.module.scss'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { type ComponentRef, forwardRef, ReactNode, useId } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Typography } from '../../atoms'
import { LabelRadix } from '../LabelRadix'
import { SelectItem } from './SelectItem/SelectItems'

type SelectItemsProps = {
  value: string
  label?: string
  icon?: ReactNode
}

type NullableProps<T> = null | T

/**
 * Optional class map for targeted styling of `Select` internals.
 * Keep this for backward compatibility with consumers that already pass `classNames`.
 */
type SelectClassNames = {
  label?: string
  trigger?: string
  content?: string
  item?: string
}

/**
 * Accessible select component based on Radix Select.
 *
 * Supports controlled and uncontrolled usage:
 * - Controlled: pass `value` + `onValueChange`
 * - Uncontrolled: pass `defaultValue`
 *
 * Styling API:
 * - `className` styles trigger root
 * - `contentClassName` styles dropdown content
 * - `classNames` styles specific inner parts (`label`, `trigger`, `content`, `item`)
 * - `style` is intentionally applied only to trigger as an escape hatch for dynamic sizing
 *
 * @todo SCRUM-26 (tech debt): unify styling API for Select.
 * Current overlap: `className` + `contentClassName` + `classNames`.
 * Next step: introduce one slot-based classes prop, mark old props as deprecated,
 * and remove duplicates after one beta release cycle with migration notes.
 */
export const Select = forwardRef<ComponentRef<typeof RadixSelect.Trigger>, SelectProps>(
  (
    {
      id: providedId,
      className,
      placeholder,
      defaultValue,
      value,
      label,
      labelClassName,
      disabled,
      items,
      groupLabel,
      withSeparator = true,
      style,
      contentClassName,
      classNames,
      onValueChange,
      ...rest
    },
    ref
  ) => {
    const generatedId = useId()
    const id = providedId || generatedId

    return (
      <div className={s.selectWrapper}>
        {label && (
          <LabelRadix
            className={clsx(s.label, classNames?.label, labelClassName)}
            typographyVariant={'regular_14'}
            htmlFor={id}
            label={label}
          />
        )}
        <RadixSelect.Root
          defaultValue={defaultValue}
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
        >
          <RadixSelect.Trigger
            id={id}
            className={clsx(s.trigger, classNames?.trigger, className)}
            ref={ref}
            {...rest}
            style={style}
          >
            <RadixSelect.Value
              className={s.value}
              data-slot="value"
              placeholder={placeholder}
            />
            <RadixSelect.Icon>
              <ChevronDownIcon className={s.iconDown} data-slot="icon" />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className={clsx(s.Content, classNames?.content, contentClassName)}
              position={'popper'}
            >
              <RadixSelect.ScrollUpButton className={s.ScrollButton}>
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className={s.Viewport}>
                <RadixSelect.Group>
                  {groupLabel && (
                    <>
                      <RadixSelect.Label className={s.groupLabel}>{groupLabel}</RadixSelect.Label>
                      {withSeparator && <RadixSelect.Separator className={s.Separator} />}
                    </>
                  )}
                  {items.map(item => (
                    <SelectItem
                      className={classNames?.item}
                      key={item.value}
                      value={item.value}
                      data-slot="item"
                    >
                      <Typography
                        variant={'regular_14'}
                        className={s.selectItems}
                        data-slot="item-text"
                      >
                        {item.icon && item.icon} {item.label}
                      </Typography>
                    </SelectItem>
                  ))}
                </RadixSelect.Group>
              </RadixSelect.Viewport>
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

/**
 * Props for `Select`.
 */
export type SelectProps = {
  /** Optional HTML id for trigger and label association. */
  id?: string
  /** Custom class for trigger root. */
  className?: string
  /** Custom class for dropdown content rendered inside portal. */
  contentClassName?: string
  /** Backward-compatible class map for specific parts of Select. */
  classNames?: SelectClassNames
  /** Inline styles applied only to trigger (escape hatch for dynamic size/position tweaks). */
  style?: React.CSSProperties
  /** Custom class for text label above trigger. */
  labelClassName?: string
  /** Placeholder shown when no value is selected. */
  placeholder?: string
  /** Optional label rendered above trigger. */
  label?: string
  /** Optional group heading shown inside dropdown list. */
  groupLabel?: NullableProps<string>
  /** Renders separator below `groupLabel` when true. */
  withSeparator?: boolean
  /** Dropdown options list. */
  items: SelectItemsProps[]
  /** Controlled selected value. */
  value?: string
  /** Initial value for uncontrolled usage. */
  defaultValue?: string
  /** Disables trigger and interactions. */
  disabled?: boolean
  /** Called when selected value changes. */
  onValueChange?: (value: string) => void
}
