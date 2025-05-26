import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'
import s from '../Sidebar.module.scss'

type SidebarGroupProps = {
  className?: string
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>

/**
 * `SidebarGroup` is a container component for grouping related navigation links in the Sidebar.
 *
 * ## Features:
 * - Groups related navigation items visually
 * - Can be used to separate different sections of the sidebar
 * - Supports custom styling
 *
 * ## Examples:
 * ```tsx
 * <SidebarGroup>
 *   <SidebarLink href="/profile" icon={<UserIcon />}>
 *     Profile
 *   </SidebarLink>
 *   <SidebarLink href="/settings" icon={<SettingsIcon />}>
 *     Settings
 *   </SidebarLink>
 * </SidebarGroup>
 * ```
 *
 * ### Props
 * - `className` - Additional class for customization
 * - `children` - Group content (typically SidebarLink components)
 *
 * ### Returns
 * - A styled container for grouping sidebar navigation items
 */
export const SidebarGroup = forwardRef<ElementRef<'div'>, SidebarGroupProps>(
  ({ children, className, ...rest }, ref) => {
    return (
      <div className={clsx(s.group, className)} ref={ref} {...rest}>
        {children}
      </div>
    )
  }
)

SidebarGroup.displayName = 'SidebarGroup'
