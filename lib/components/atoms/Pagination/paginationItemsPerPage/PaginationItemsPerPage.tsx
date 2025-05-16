import { Typography } from 'components/atoms/Typography';
import styles from '../Pagination.module.scss';

interface PaginationItemsPerPageProps {
  itemsPerPage: number;
  options: number[];
  onChange: (value: number) => void;
}

export const PaginationItemsPerPage = ({
  itemsPerPage,
  options,
  onChange,
}: PaginationItemsPerPageProps) => {
  return (
    <div className={styles.itemsPerPageContainer}>
      <Typography
        variant="regular_14"
        className={styles.itemsPerPageLabel}
      >
        Show
      </Typography>
      <select
        value={itemsPerPage}
        onChange={(e) => onChange(Number(e.target.value))}
        className={styles.itemsPerPageSelect}
        aria-label="Items per page"
      >
        {options.map((count) => (
          <option key={count} value={count}>
            <Typography
              variant="regular_14"
              asChild
            >
              <span>{count}</span>
            </Typography>
          </option>
        ))}
      </select>
      <Typography
        variant="regular_14"
        className={styles.itemsPerPageLabel}
      >
        on page
      </Typography>
    </div>
  );
};