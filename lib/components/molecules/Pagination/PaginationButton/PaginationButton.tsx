import clsx from 'clsx'
import styles from '../Pagination.module.scss'
import { Typography } from 'components/atoms/Typography'

interface PaginationButtonProps {
  children: React.ReactNode
  onClick: () => void
  disabled?: boolean
  active?: boolean
  className?: string
  ariaLabel: string
}

export const PaginationButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
  className,
  ariaLabel,
}: PaginationButtonProps) => {
  const isDisabled = disabled && !active

  const handleClick = () => {
    if (isDisabled || active) {
      return
    }

    onClick()
  }

  return (
    <button
      type="button"
      className={clsx(
        styles.buttonBase,
        active ? styles.buttonActive : styles.buttonInactive,
        isDisabled && styles.buttonDisabled,
        className
      )}
      onClick={handleClick}
      disabled={isDisabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
    >
      <Typography
        variant={active ? 'bold_14' : 'regular_14'}
        className={clsx(
          active ? styles.textActive : styles.textInactive,
          isDisabled && styles.textDisabled
        )}
      >
        {children}
      </Typography>
    </button>
  )
}
