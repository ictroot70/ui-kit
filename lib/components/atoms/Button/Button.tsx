import { ComponentPropsWithoutRef, ElementType } from 'react'
import { Slot } from '@radix-ui/react-slot'
import clsx from 'clsx'
import s from './Button.module.css'

type Variant = 'primary' | 'outlined' | 'secondary'

type Props = {
  variant?: Variant
  fullWidth?: boolean
  asChild?: boolean
} & ComponentPropsWithoutRef<'button'>

export const Button = ({
  variant = 'primary',
  className,
  fullWidth = false,
  asChild = false,
  ...rest
}: Props) => {
  const Comp: ElementType = asChild ? Slot : 'button'

  return (
    <Comp
      className={clsx(
        s.button,
        s[variant],
        fullWidth && s.fullWidth,
        className
      )}
      {...rest}
    />
  )
}