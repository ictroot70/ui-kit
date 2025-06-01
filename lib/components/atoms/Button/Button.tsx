import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import clsx from 'clsx'
import s from 'components/atoms/Button/Button.module.scss'

type Variant = 'primary' | 'outlined' | 'secondary' | 'text'

export type ButtonProps<T extends ElementType = 'button'> = {
  as?: T
  children?: ReactNode
  className?: string
  fullWidth?: boolean
  iconPosition?: 'left' | 'right'
  variant?: Variant
} & ComponentPropsWithoutRef<T>

/**
 * Button component with multiple visual variants and layout options.
 *
 * Supports rendering as different HTML elements via the `as` prop
 * (e.g. `'a'`, `'button'`, `'div'`, etc.).
 *
 * @typeParam T - The type of element to render as (defaults to `'button'`).
 *
 * @param props - Props for configuring the button's behavior and appearance.
 * @param props.as - Custom element type to render (e.g. `'a'` for link).
 * @param props.children - Content inside the button.
 * @param props.className - Additional custom class names.
 * @param props.fullWidth - If `true`, makes the button take the full container width.
 * @param props.iconPosition - Optional icon position: `'left'` or `'right'`. Adds special padding and direction.
 * @param props.variant - Visual style of the button: `'primary'`, `'outlined'`, `'secondary'`, or `'text'`.
 * @param rest - Additional props forwarded to the rendered component.
 *
 * @returns A customizable button component with style and layout control.
 */

export const Button = <T extends ElementType = 'button'>(props: ButtonProps<T>) => {
  const {
    as: Component = 'button',
    className,
    fullWidth,
    iconPosition = 'left',
    variant = 'primary',
    ...rest
  } = props
  const hasIcon = !!props.iconPosition
  const positionClasses = {
    left: s.left,
    right: s.right,
  }
  const positionClass = positionClasses[iconPosition]

  const buttonClasses = clsx(
    s[variant],
    fullWidth ? s.fullWidth : '',
    hasIcon && s.hasIconPadding,
    className,
    positionClass,
    s.button
  )

  return <Component className={buttonClasses} {...rest} />
}
