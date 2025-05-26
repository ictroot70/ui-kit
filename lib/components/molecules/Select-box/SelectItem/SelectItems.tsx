import * as RadixSelect from '@radix-ui/react-select'
import stl from './SelectItems.module.scss'
import { clsx } from 'clsx'

import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef, type ReactNode } from 'react'

// Define props for the SelectItem component
type Props = {
  className?: string; // Optional custom class for styling
  value: string; // Value of the select item
  children?: ReactNode; // Content inside the item (usually label text)
  icon?: ReactNode; // Optional icon to show alongside text
} & ComponentPropsWithoutRef<typeof RadixSelect.Item>; // Include all native props from Radix Select.Item


// ForwardRef allows the parent component to access the DOM node of this item
export const SelectItem = forwardRef<ComponentRef<typeof RadixSelect.Item>, Props>(
  ({ value, children, disabled, className, icon, ...rest }, ref) => {
    return (
      <RadixSelect.Item
        // Apply conditional classes and pass down value, disabled, and other props
        className={clsx(stl.itemWrapper, className)}
        value={value}
        disabled={disabled}
        ref={ref}
        {...rest}
      >
        {/* Optionally render an icon inside a span if provided */}
        {icon && <span className={stl.icon}>{icon}</span>}
        {/* Render the item label (children) using Radix's ItemText component */}
        <RadixSelect.ItemText asChild>{children}</RadixSelect.ItemText>
      </RadixSelect.Item>
    )
  }
)

// Set display name for better debug experience in React DevTools
SelectItem.displayName = 'SelectItem'