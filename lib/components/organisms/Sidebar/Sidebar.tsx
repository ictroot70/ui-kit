import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'
import s from './Sidebar.module.scss'
import { ScrollAreaRadix } from 'components/atoms'

type SidebarProps = {
  className?: string
  children: ReactNode
  width?: number | string
} & ComponentPropsWithoutRef<'nav'>

/**
 * `Sidebar` is a customizable navigation component that provides a vertical menu with scrollable content.
 * It supports custom width, grouping of navigation items, and accessible links with icons.
 *
 * ## Features:
 * - Customizable width (number or string)
 * - Scrollable content area
 * - Semantic HTML navigation element
 * - Supports grouping of related links
 * - Accessible with proper ARIA attributes
 *
 * ## Examples:
 * ```tsx
 * <Sidebar width={250}>
 *   <SidebarGroup>
 *     <SidebarLink href="/dashboard" icon={<DashboardIcon />} active>
 *       Dashboard
 *     </SidebarLink>
 *     <SidebarLink href="/projects" icon={<ProjectsIcon />}>
 *       Projects
 *     </SidebarLink>
 *   </SidebarGroup>
 * </Sidebar>
 * ```
 *
 * ### Props
 * - `className` - Additional class for customization
 * - `children` - Sidebar content (typically SidebarGroup components)
 * - `width` - Width of the sidebar (default: 220)
 *
 * ### Returns
 * - A styled navigation sidebar with scrollable content area
 */
export const Sidebar = forwardRef<ElementRef<'nav'>, SidebarProps>(
  ({ children, className, width = 220, style, ...rest }, ref) => {
    const classNames = {
      root: clsx(s.root, className),
    }

    const inlines = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      maxWidth: typeof width === 'number' ? `${width}px` : width,
    }

    return (
      <nav
        className={classNames.root}
        style={inlines}
        ref={ref}
        aria-label="Main navigation"
        {...rest}
      >
        <ScrollAreaRadix>{children}</ScrollAreaRadix>
      </nav>
    )
  }
)

Sidebar.displayName = 'Sidebar'
