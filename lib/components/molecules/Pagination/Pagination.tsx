
import clsx from 'clsx';
import styles from './Pagination.module.scss';
import { Select } from 'components/molecules/Select';
import { Typography } from 'components/atoms';
import { PaginationProps } from './Pagination.types';

import { ArrowBackSimple, ArrowForwardSimple } from 'assets/icons';
import { usePagination } from './hooks/usePagination/usePagination';
import { PaginationButton } from './PaginationButton/PaginationButton';
import { PaginationEllipsis } from './PaginationEllipsis/PaginationEllipsis';

/**
 * Pagination control with optional page-size selector.
 * Uses "smart" visible pages with interactive ellipsis input for fast page jumps.
 */
export const Pagination = ({
  currentPage = 1,
  totalItems = 120,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  className,
}: PaginationProps) => {
  const {
    inputPage,
    activeEllipsis,
    totalPages,
    safeCurrentPage,
    visiblePages,
    selectOptions,
    handlePageInputChange,
    handlePageInputBlur,
    handleKeyDown,
    handleItemsPerPageChange,
    handleEllipsisClick,
  } = usePagination({
    currentPage,
    totalItems,
    itemsPerPage,
    onPageChange,
    onItemsPerPageChange,
  });

  return (
    <div className={clsx(styles.paginationRoot, className)}>
      <nav className={styles.paginationNav} aria-label="Pagination">
        <div className={styles.paginationControls}>
          <PaginationButton
            onClick={() => onPageChange(Math.max(1, safeCurrentPage - 1))}
            disabled={safeCurrentPage === 1}
            className={styles.navButton}
            ariaLabel="Previous page"
          >
            <ArrowBackSimple />
          </PaginationButton>

          <div className={styles.paginationPages}>
            {visiblePages.map((page) => {
              if (typeof page !== 'number') {
                return (
                  <PaginationEllipsis
                    key={`ellipsis-${page.position}`}
                    position={page.position}
                    onClick={() => handleEllipsisClick(page.position)}
                    showInput={activeEllipsis === page.position}
                    inputValue={inputPage}
                    onInputChange={handlePageInputChange}
                    onInputBlur={handlePageInputBlur}
                    onKeyDown={handleKeyDown}
                  />
                );
              }
              return (
                <PaginationButton
                  key={page}
                  onClick={() => onPageChange(page)}
                  active={page === safeCurrentPage}
                  disabled={page === safeCurrentPage}
                  ariaLabel={`Go to page ${page}`}
                  className={styles.pageButton}
                >
                  {page}
                </PaginationButton>
              );
            })}
          </div>

          <PaginationButton
            onClick={() => onPageChange(Math.min(totalPages, safeCurrentPage + 1))}
            disabled={safeCurrentPage === totalPages}
            className={styles.navButton}
            ariaLabel="Next page"
          >
            <ArrowForwardSimple />
          </PaginationButton>
        </div>
        {onItemsPerPageChange && (
          <div className={styles.itemsPerPageWrapper}>
            <Typography variant="regular_14" className={styles.itemsPerPageLabel}>
              Show
            </Typography>

            <Select
              items={selectOptions}
              size={'small'}
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                if (value) handleItemsPerPageChange(Number(value));
              }}
              classNames={{
                content: styles.paginationSelectContent,
                item: styles.paginationSelectItem,
                trigger: styles.paginationSelectTrigger,
              }}
              placeholder={itemsPerPage.toString()}
            />

            <Typography variant="regular_14" className={styles.itemsPerPageLabel}>
              on page
            </Typography>
          </div>
        )}
      </nav>
    </div>
  );
};
