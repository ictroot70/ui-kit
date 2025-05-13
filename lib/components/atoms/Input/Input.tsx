import { ComponentPropsWithoutRef, forwardRef } from 'react'
import styles from './Input.module.scss'
import clsx from 'clsx'

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label?: string
  error?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, className, ...props }, ref) => {
    return (
      <div className={styles.inputWrapper}>
        {label && (
          <label className={styles.label}>{label}</label>
        )}
        <div className={styles.inputContainer}>
          {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
          <input
            ref={ref}
            className={clsx(
              styles.input,
              error && styles.error,
              className
            )}
            {...props}
          />
          {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
        </div>
        {error && (
          <span className={styles.errorText}>{error}</span>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'