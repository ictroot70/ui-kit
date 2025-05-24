import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactElement, ReactNode } from 'react'

import clsx from 'clsx'

import styles from './Card.module.scss'

interface CardProps extends ComponentPropsWithoutRef<'div'> {
  children?: ReactNode
}

/**
 * `Card` is a wrapper component that renders a styled `div` element.
 * It supports forwarding refs and accepts all standard `div` attributes.
 *
 * @param {CardProps} props - The props for the Card component.
 * @param {React.Ref<HTMLDivElement>} ref - A forwarded ref to the card's DOM element.
 * @returns {ReactElement} The rendered card component.
 */
export const Card = forwardRef<ElementRef<'div'>, CardProps>(
  ({ children, className, ...restProps }, ref): ReactElement => {
    return (
      <div className={clsx(styles['root'], className)} ref={ref} {...restProps}>
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
