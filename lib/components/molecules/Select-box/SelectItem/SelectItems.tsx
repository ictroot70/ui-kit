import * as RadixSelect from '@radix-ui/react-select'
import stl from './SelectItems.module.scss'
import { clsx } from 'clsx'

import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef, type ReactNode } from 'react'

type Props = {
  className?: string
  value: string
  children?: ReactNode
  icon?: ReactNode
} & ComponentPropsWithoutRef<typeof RadixSelect.Item>

export const SelectItem = forwardRef<ComponentRef<typeof RadixSelect.Item>, Props>(
  ({ value, children, disabled, className, icon, ...rest }, ref) => {
    return (
      <RadixSelect.Item
        className={clsx(stl.itemWrapper, className)}
        value={value}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {icon && <span className={stl.icon}>{icon}</span>}
        <RadixSelect.ItemText asChild>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  }
)

SelectItem.displayName = 'SelectItem'