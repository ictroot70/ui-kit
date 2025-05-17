import clsx from 'clsx'
import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react'
import styles from './Sidebar.module.scss'

type SidebarProps = {
  /** Дополнительный класс для кастомизации */
  className?: string
  /** Элементы сайдбара */
  children: ReactNode
  /** Ширина сайдбара */
  width?: number | string
} & ComponentPropsWithoutRef<'nav'>

export const Sidebar = forwardRef<ElementRef<'nav'>, SidebarProps>(
  ({ children, className, width = 220, style, ...rest }, ref) => {
    const classNames = {
      root: clsx(styles.root, className),
    }

    const inlineStyles = {
      ...style,
      width: typeof width === 'number' ? `${width}px` : width,
      maxWidth: typeof width === 'number' ? `${width}px` : width,
    }

    return (
      <nav
        className={classNames.root}
        style={inlineStyles}
        ref={ref}
        aria-label="Main navigation"
        {...rest}
      >
        {children}
      </nav>
    )
  }
)

type SidebarItemProps = {
  /** Иконка элемента */
  icon?: ReactNode
  /** Иконка элемента в активном состоянии */
  activeIcon?: ReactNode
  /** Активное состояние */
  active?: boolean
  /** Отключенное состояние */
  disabled?: boolean
  /** URL для ссылки (если используется как ссылка) */
  href?: string
  /** Компонент для навигации (например, Next.js Link) */
  as?: React.ElementType
} & ComponentPropsWithoutRef<'div'>

export const SidebarItem = forwardRef<ElementRef<'div'>, SidebarItemProps>(
  (
    {
      children,
      className,
      icon,
      activeIcon,
      active,
      disabled,
      href,
      as: Component = 'div',
      ...rest
    },
    ref
  ) => {
    const classNames = {
      item: clsx(styles.item, active && styles.active, disabled && styles.disabled, className),
    }

    const currentIcon = active && activeIcon ? activeIcon : icon
    const role = Component === 'div' ? 'menuitem' : undefined

    return (
      <Component
        className={classNames.item}
        ref={ref}
        role={role}
        aria-disabled={disabled}
        aria-current={active ? 'page' : undefined}
        href={href}
        {...rest}
      >
        {currentIcon}
        <span className={styles.label}>{children}</span>
      </Component>
    )
  }
)
