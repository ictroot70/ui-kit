import clsx from 'clsx'

import { ComponentProps } from 'react'
import { Slot } from '@radix-ui/react-slot'

import s from './Typography.module.scss'

type TypographyVariant =
  | 'large'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'regular_16'
  | 'bold_16'
  | 'regular_14'
  | 'medium_14'
  | 'bold_14'
  | 'small_text'
  | 'semibold_small_text'
  | 'regular_link'
  | 'small_link'

type Props = {
  asChild?: boolean
  className?: string
  variant?: TypographyVariant
} & ComponentProps<'p'>

export const Typography = ({
  asChild = false,
  className,
  variant = 'regular_14',
  ...props
}: Props) => {
  const classNames = clsx(s[variant], className)
  const Component = asChild ? Slot : 'p'

  return <Component {...props} className={classNames} />
}
