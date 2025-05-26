import clsx from 'clsx'
import { ComponentPropsWithoutRef, forwardRef, ReactNode } from 'react'
import s from '../Sidebar.module.scss'

type SidebarLinkProps = {
  icon?: ReactNode
  activeIcon?: ReactNode
  active?: boolean
  disabled?: boolean
  href: string
} & ComponentPropsWithoutRef<'a'>

/**
 * `SidebarLink` is a navigation link component designed for use within the Sidebar.
 * Supports icons, active states, and disabled states.
 *
 * ## Features:
 * - Supports icons and active icons
 * - Active state styling
 * - Disabled state (with proper accessibility attributes)
 * - Proper link semantics
 * - Customizable styling
 *
 * ## Examples:
 * ```tsx
 * <SidebarLink
 *   href="/messages"
 *   icon={<MailIcon />}
 *   activeIcon={<MailOpenIcon />}
 *   active
 * >
 *   Messages
 * </SidebarLink>
 * ```
 *
 * ### Props
 * - `icon` - Icon to display for the link
 * - `activeIcon` - Icon to display when link is active (falls back to `icon`)
 * - `active` - Whether the link is in active state
 * - `disabled` - Whether the link is disabled
 * - `href` - URL for the link
 * - `className` - Additional class for customization
 *
 * ### Returns
 * - A styled navigation link with icon support and state management
 */
export const SidebarLink = forwardRef<HTMLAnchorElement, SidebarLinkProps>(
  ({ children, icon, activeIcon, active, disabled, className, href, ...rest }, ref) => {
    return (
      <a
        className={clsx(s.link, active && s.active, disabled && s.disabled, className)}
        ref={ref}
        href={disabled ? undefined : href}
        aria-disabled={disabled}
        onClick={e => disabled && e.preventDefault()}
        {...rest}
      >
        {active && activeIcon ? activeIcon : icon}
        <span className={s.label}>{children}</span>
      </a>
    )
  }
)

SidebarLink.displayName = 'SidebarLink'
