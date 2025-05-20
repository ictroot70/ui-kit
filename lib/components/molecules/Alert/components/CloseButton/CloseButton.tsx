import { Close } from 'assets/icons'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import styles from 'components/molecules/Alert/components/CloseButton/CloseButton.module.scss'

export interface CloseButtonType extends ComponentPropsWithoutRef<'button'> {
  size?: number
}

export const CloseButton = forwardRef<ElementRef<'button'>, CloseButtonType>((props, ref) => {
  const { onClick, size = 18, className, ...rest } = props
  return (
    <button ref={ref} className={styles.button} onClick={onClick} {...rest}>
      <Close size={size} />
    </button>
  )
})
