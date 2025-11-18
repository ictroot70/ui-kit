import * as RadixDropdown from '@radix-ui/react-dropdown-menu'

import s from './DropdownMenu.module.scss'
import { MoreHorizontal } from 'assets/icons'
import { Typography } from 'components/atoms'

export interface DropdownItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export type DropdownMenuProps = {
  items: DropdownItem[]
  align?: 'start' | 'end' | 'center'
  side?: 'top' | 'right' | 'bottom' | 'left'
  trigger?: React.ReactNode
  showArrow?: boolean
  arrow?: React.ReactNode
  className?: string
  contentClassName?: string
  arrowClassName?: string
}

/**
 * `DropdownMenu` is a customizable and accessible dropdown menu component built with `@radix-ui/react-dropdown-menu`.
 * It provides a contextual menu with actions that can be triggered by the user, typically represented by a "more" icon (kebab menu).
 * This component wraps Radix's primitive with additional features like custom styling, flexible positioning, and support for icons.
 *
 * ## Features:
 * - Customizable menu items with labels, icons, and click handlers
 * - Flexible positioning with align and side props
 * - Custom trigger element or default "more" icon
 * - Disabled state for individual menu items
 * - Fully accessible (keyboard navigation, ARIA attributes)
 * - Portal rendering for proper z-index management
 * - Optional arrow indicator for better visual connection to trigger
 * - Customizable arrow with support for custom components or styling
 *
 * ## Examples:
 * ```tsx
 * <DropdownMenu
 *   items={[
 *     { label: 'Edit', icon: <EditIcon />, onClick: () => console.log('Edit clicked') },
 *     { label: 'Delete', icon: <DeleteIcon />, onClick: () => console.log('Delete clicked'), disabled: true },
 *     { label: 'Share', icon: <ShareIcon />, onClick: () => console.log('Share clicked') }
 *   ]}
 *   align="start"
 *   side="top"
 *   showArrow={true}
 * />
 * ```
 *
 * ### Props
 * - `items` - An array of dropdown items to display in the menu (`{ label: string, icon?: React.ReactNode, onClick?: () => void, disabled?: boolean }`)
 * - `align` - Alignment of the menu relative to the trigger (`'start' | 'end' | 'center'`, defaults to `'end'`)
 * - `side` - Side of the trigger where the menu appears (`'top' | 'right' | 'bottom' | 'left'`, defaults to `'bottom'`)
 * - `trigger` - Custom trigger element (if not provided, uses default MoreHorizontal icon)
 * - `showArrow` - Whether to show the arrow pointing to the trigger (`boolean`, defaults to `false`)
 * - `arrow` - Custom arrow component to replace the default arrow (`React.ReactNode`)
 * - `arrowClassName` - Additional class name(s) for the arrow element (`string`)
 * - `className` - Additional class name(s) for the trigger element
 * - `contentClassName` - Additional class name(s) for the menu content
 *
 * ### Returns
 * - Fully styled and accessible dropdown menu component with customizable items and positioning
 */

export const DropdownMenu = ({
  items,
  align = 'end',
  side = 'bottom',
  trigger,
  arrow,
  showArrow = false,
  className,
  contentClassName,
  arrowClassName,
}: DropdownMenuProps) => {
  return (
    <RadixDropdown.Root>
      <RadixDropdown.Trigger asChild>
        {trigger || (
          <button className={`${s.trigger} ${className || ''}`} aria-label="Open menu">
            <MoreHorizontal />
          </button>
        )}
      </RadixDropdown.Trigger>

      <RadixDropdown.Portal>
        <RadixDropdown.Content
          className={`${s.menu} ${contentClassName || ''}`}
          align={align}
          side={side}
          onCloseAutoFocus={e => e.preventDefault()}
        >
          {items.map(({ icon, label, disabled, onClick }, index) => {
            return (
              <RadixDropdown.Item
                className={s.item}
                key={index}
                disabled={disabled}
                onSelect={onClick}
              >
                {icon}
                <Typography variant="regular_14">{label}</Typography>
              </RadixDropdown.Item>
            )
          })}
          {showArrow &&
            (arrow ? (
              <RadixDropdown.Arrow asChild className={arrowClassName}>
                {arrow}
              </RadixDropdown.Arrow>
            ) : (
              <RadixDropdown.Arrow asChild className={arrowClassName}>
                <svg
                  width="17"
                  height="10"
                  viewBox="0 0 17 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17 1L8.5 1H0L8.5 9.5L17 1Z" fill="#4C4C4C" />
                  <path d="M16.5 1.43051e-06L0.5 0L8.5 8L16.5 1.43051e-06Z" fill="#171717" />
                </svg>
              </RadixDropdown.Arrow>
            ))}
        </RadixDropdown.Content>
      </RadixDropdown.Portal>
    </RadixDropdown.Root>
  )
}
