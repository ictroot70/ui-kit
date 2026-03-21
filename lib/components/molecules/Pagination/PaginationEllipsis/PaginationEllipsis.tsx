import { KeyboardEvent } from 'react';
import { Typography } from 'components/atoms';
import styles from '../Pagination.module.scss';

interface PaginationEllipsisProps {
  position: 'left' | 'right';
  onClick: () => void;
  showInput: boolean;
  inputValue: string;
  onInputChange: (value: string) => void;
  onInputBlur: () => void;
  onKeyDown: (e: KeyboardEvent) => void;
}

/**
 * Ellipsis control used by pagination.
 * Renders either static `...` button or inline numeric input for direct page jump.
 */
export const PaginationEllipsis = ({
  position,
  onClick,
  showInput,
  inputValue,
  onInputChange,
  onInputBlur,
  onKeyDown,
}: PaginationEllipsisProps) => {
  if (showInput) {
    return (
      <input
        type="text"
        value={inputValue}
        onChange={(e) => onInputChange(e.target.value)}
        onBlur={onInputBlur}
        onKeyDown={onKeyDown}
        className={styles.pageInput}
        autoFocus
        aria-label={`Enter page number near ${position}`}
      />
    );
  }

  return (
    <button
      type="button"
      className={styles.ellipsisButton}
      onClick={onClick}
      aria-label={`Jump to page near ${position}`}
    >
      <Typography
        variant="regular_14"
        className={styles.ellipsisText}
        asChild
      >
        <span>...</span>
      </Typography>
    </button>
  );
};
