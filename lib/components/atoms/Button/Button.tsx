import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { clsx } from 'clsx'
import s from 'components/atoms/Button/Button.module.scss'

export type Variant = 'primary' | 'outlined' | 'secondary' | 'text'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  asChild?: boolean
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  nowrap?: boolean
  // iconPosition?: 'left' | 'right'
  variant?: Variant
} & ComponentPropsWithoutRef<T>

/**
 * Button component with multiple visual variants and layout options.
 *
 * Supports rendering as different HTML elements via the `as` prop
 * (e.g. `'a'`, `'button'`, `'div'`, etc.) or using Radix UI Slot via `asChild`.
 *
 * @typeParam T - The type of element to render as (defaults to `'button'`).
 *
 * - @param props - Props for configuring the button's behavior and appearance.
 * - @param props.as - Custom element type to render (e.g. `'a'` for link).
 * - @param props.asChild - If `true`, uses Radix UI Slot to merge props with the first child element.
 * - @param props.children - Content inside the button.
 * - @param props.className - Additional custom class names.
 * - @param props.fullWidth - If `true`, makes the button take the full container width.
 // * - @param props.iconPosition - Optional icon position: `'left'` or `'right'`. Adds special padding and direction.
 * - @param props.nowrap - option to set 'nowrap' style to button
 * - @param props.variant - Visual style of the button: `'primary'`, `'outlined'`, `'secondary'`, or `'text'`.
 * - @param rest - Additional props forwarded to the rendered component.
 *
 * @returns A customizable button component with style and layout control.
 */

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as,
    asChild,
    className,
    fullWidth,
    nowrap = false,
    // iconPosition = 'left',
    variant = 'primary',
    ...rest
  } = props

  // const hasIcon = !!iconPosition
  // const positionClass = iconPosition && s[iconPosition]

  const buttonClasses = clsx(
    s[variant],
    fullWidth ? s.fullWidth : '',
    // hasIcon && s.hasIconPadding,
    className,
    // positionClass,
    nowrap && s.nowrap,
    s.button
  )

  const Component = asChild ? Slot : (as ?? 'button') as ElementType;

  return <Component className={buttonClasses} {... rest} />
}

Button.displayName = 'Button'
