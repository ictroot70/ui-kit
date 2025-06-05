import s from './Select.module.scss'
import * as RadixSelect from '@radix-ui/react-select'
import { clsx } from 'clsx'
import { type ComponentRef, forwardRef, ReactNode, useId } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Typography } from '../../atoms'
import { LabelRadix } from '../LabelRadix'

type SelectItemsProps = {
  value: string
  label?: string
  icon?: ReactNode
}

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
    const generatedId = useId()
    const id = rest.id || generatedId

    const triggerStyle = style
    const widthStyle = style?.width

    const contentStyle = widthStyle ? { width: widthStyle } : undefined
    const viewportStyle = widthStyle ? { width: widthStyle } : undefined

    return (
      <div className={s.selectWrapper}>
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

          <RadixSelect.Portal>
            <RadixSelect.Content className={s.Content} position={'popper'} style={contentStyle}>
              <RadixSelect.ScrollUpButton className={s.ScrollButton}>
                <ChevronUpIcon />
              </RadixSelect.ScrollUpButton>
              <RadixSelect.Viewport className={s.Viewport} style={viewportStyle}>
                <RadixSelect.Group>
                  {groupLabel && (
                    <>
                      <RadixSelect.Label style={{ marginLeft: 5 }}>{groupLabel}</RadixSelect.Label>
                      {withSeparator && <RadixSelect.Separator className={s.Separator} />}
                    </>
                  )}
                  {items.map(item => (
                    <RadixSelect.Item key={item.value} value={item.value} className={s.selectItem}>
                      <RadixSelect.ItemText asChild>
                        <Typography variant={'regular_14'} className={s.selectItems}>
                          {item.icon && item.icon} {item.label}
                        </Typography>
                      </RadixSelect.ItemText>
                    </RadixSelect.Item>
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

export type SelectProps = {
  id?: string
  className?: string
  style?: React.CSSProperties
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
}
