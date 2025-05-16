import clsx from 'clsx';
import styles from '../Pagination.module.scss';
import { Typography } from 'components/atoms/Typography';

interface PaginationButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  className?: string;
  ariaLabel: string;
}

export const PaginationButton = ({
  children,
  onClick,
  disabled = false,
  active = false,
  className,
  ariaLabel,
}: PaginationButtonProps) => {
  return (
    <button
      className={clsx(
        styles.buttonBase,
        active ? styles.buttonActive : styles.buttonInactive,
        disabled && styles.buttonDisabled,
        className
      )}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      aria-current={active ? 'page' : undefined}
    >
      <Typography
        variant={active ? 'bold_14' : 'regular_14'}
        className={clsx(
          active ? styles.textActive : styles.textInactive,
          disabled && styles.textDisabled
        )}
      >
        {children}
      </Typography>
    </button>
  );
};