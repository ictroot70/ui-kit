import clsx from 'clsx'

import React, { ComponentProps, forwardRef } from 'react'
import { Slot } from '@radix-ui/react-slot'

import s from './Typography.module.scss'

export type TypographyVariant =
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
  | 'danger'
  | 'danger_small'

type Props = {
  asChild?: boolean
  className?: string
  variant?: TypographyVariant
} & ComponentProps<'p'>

export const Typography = forwardRef<HTMLParagraphElement, Props>(
  ({ asChild = false, className, variant = 'regular_14', children, ...props }, ref) => {
    if (asChild) {
      if (React.Children.count(children) !== 1 || !React.isValidElement(children)) {
        console.error('Typography with `asChild` expects a single React element as a child.')
        return (
          <p {...props} ref={ref} className={clsx(s[variant], className)}>
            {children}
          </p>
        )
      }
      return (
        <Slot {...props} ref={ref} className={clsx(s[variant], className)}>
          {children}
        </Slot>
      )
    }

    return (
      <p {...props} ref={ref} className={clsx(s[variant], className)}>
        {children}
      </p>
    )
  }
)
