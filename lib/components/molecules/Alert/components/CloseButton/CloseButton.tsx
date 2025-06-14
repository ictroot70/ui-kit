import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import { Close } from 'assets/icons'

import styles from 'components/molecules/Alert/components/CloseButton/CloseButton.module.scss'

export interface CloseButtonType extends ComponentPropsWithoutRef<'button'> {
  size?: number
}

export const CloseButton = forwardRef<ElementRef<'button'>, CloseButtonType>((props, ref) => {
  const { onClick, size = 24, className, ...rest } = props

  return (
    <button
      type={'button'}
      aria-label={'Close'}
      ref={ref}
      className={styles.button}
      onClick={onClick}
      {...rest}
    >
      <Close size={size} />
    </button>
  )
})
