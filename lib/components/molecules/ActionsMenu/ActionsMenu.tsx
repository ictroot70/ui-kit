import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

import s from './ActionsMenu.module.scss'
import { MoreHorizontal } from 'assets/icons'
import { Typography } from 'components/atoms'

interface ActionItem {
  label: string
  icon?: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

type Props = {
  items: ActionItem[]
  align?: 'start' | 'end' | 'center'
  side?: 'top' | 'right' | 'bottom' | 'left'
  trigger?: React.ReactNode
  className?: string
  contentClassName?: string
}

/**
 * `ActionsMenu` is a customizable and accessible dropdown menu component built with `@radix-ui/react-dropdown-menu`.
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
 *
 * ## Examples:
 * ```tsx
 * <ActionsMenu
 *   items={[
 *     { label: 'Edit', icon: <EditIcon />, onClick: () => console.log('Edit clicked') },
 *     { label: 'Delete', icon: <DeleteIcon />, onClick: () => console.log('Delete clicked'), disabled: true },
 *     { label: 'Share', icon: <ShareIcon />, onClick: () => console.log('Share clicked') }
 *   ]}
 *   align="start"
 *   side="right"
 * />
 * ```
 *
 * ### Props
 * - `items` - An array of action items to display in the menu (`{ label: string, icon?: React.ReactNode, onClick?: () => void, disabled?: boolean }`)
 * - `align` - Alignment of the menu relative to the trigger (`'start' | 'end' | 'center'`, defaults to `'end'`)
 * - `side` - Side of the trigger where the menu appears (`'top' | 'right' | 'bottom' | 'left'`, defaults to `'bottom'`)
 * - `trigger` - Custom trigger element (if not provided, uses default MoreHorizontal icon)
 * - `className` - Additional class name(s) for the trigger element
 * - `contentClassName` - Additional class name(s) for the menu content
 *
 * ### Returns
 * - Fully styled and accessible dropdown menu with customizable actions and positioning
 */

const ActionsMenu = ({
  items,
  align = 'end',
  side = 'bottom',
  trigger,
  className,
  contentClassName,
}: Props) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        {trigger || (
          <button className={`${s.trigger} ${className || ''}`} aria-label="Open menu">
            <MoreHorizontal />
          </button>
        )}
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={`${s.menu} ${contentClassName || ''}`}
          align={align}
          side={side}
          onCloseAutoFocus={e => e.preventDefault()}
        >
          {items.map(({ icon, label, disabled, onClick }, index) => {
            return (
              <DropdownMenu.Item
                className={s.item}
                key={index}
                disabled={disabled}
                onSelect={onClick}
              >
                {icon}
                <Typography variant="regular_14">{label}</Typography>
              </DropdownMenu.Item>
            )
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export { ActionsMenu, type ActionItem }
