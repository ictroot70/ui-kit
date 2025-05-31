import { ComponentPropsWithoutRef, ElementType } from 'react'
import clsx from 'clsx'
import s from './Button.module.scss'

type Variant = 'primary' | 'outlined' | 'secondary' | 'text'

type Props<T extends ElementType = 'button'> = {
  variant?: Variant
  fullWidth?: boolean
  as: T
} & ComponentPropsWithoutRef<'button'>

export const Button = <T extends ElementType = 'button'>(props: Props<T>) => {
  const { as: Component = 'button', className, fullWidth, variant = 'primary', ...rest } = props

  return (
    <Component
      className={clsx(s.button, s[variant], fullWidth && s.fullWidth, className)}
      {...rest}
    />
  )
}
