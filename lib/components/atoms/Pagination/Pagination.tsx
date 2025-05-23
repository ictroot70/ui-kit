import { useState, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.scss';
import { PaginationButton } from './PaginationButton/PaginationButton';
import { PaginationEllipsis } from './PaginationEllipsis/PaginationEllipsis';
import { PaginationItemsPerPage } from './PaginationItemsPerPage/PaginationItemsPerPage';

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (count: number) => void;
  className?: string;
}
type PageItem = number | { type: 'ellipsis'; position: 'left' | 'right' };

export const Pagination = ({
  currentPage = 1,
  totalItems = 120,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  className,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const [activeEllipsis, setActiveEllipsis] = useState<'left' | 'right' | null>(null);

  useEffect(() => {
    setInputPage(currentPage.toString());
    setActiveEllipsis(null);
  }, [currentPage]);

  const handlePageInputChange = useCallback((value: string) => {
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  }, []);

  const handlePageInputBlur = useCallback(() => {
    const page = Math.max(1, Math.min(parseInt(inputPage) || currentPage, totalPages));
    onPageChange(page);
    setInputPage(page.toString());
    setActiveEllipsis(null);
  }, [inputPage, currentPage, totalPages, onPageChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handlePageInputBlur();
  }, [handlePageInputBlur]);

  const handleItemsPerPageChange = useCallback((selectedValue: number) => {
    onItemsPerPageChange?.(selectedValue);
    onPageChange(1);
  }, [onItemsPerPageChange, onPageChange]);

  const handleEllipsisClick = useCallback((position: 'left' | 'right') => {
    setActiveEllipsis(position);
  }, []);

  const visiblePages = useMemo<PageItem[]>(() => {
    if (totalPages <= 1) return [1];

    const pages: PageItem[] = [1];
    const maxVisiblePages = 5;
    const boundaryPages = 1;

    if (totalPages <= maxVisiblePages) {
      for (let i = 2; i <= totalPages; i++) pages.push(i);
    } else {
      const startPage = Math.max(2, currentPage - boundaryPages);
      const endPage = Math.min(totalPages - 1, currentPage + boundaryPages);

      if (startPage > 2) pages.push({ type: 'ellipsis', position: 'left' });
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push({ type: 'ellipsis', position: 'right' });

      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  const pageSizeOptions = useMemo(() => [10, 20, 30, 50, 100], []);

  return (
    <div className={clsx(styles.paginationRoot, className)}>
      <nav className={styles.paginationNav} aria-label="Pagination">
        <div className={styles.paginationControls}>
          <PaginationButton
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={styles.navButton}
            ariaLabel="Previous page"
          >
            &lt;
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
                  active={page === currentPage}
                  disabled={page === currentPage}
                  ariaLabel={`Go to page ${page}`}
                  className={styles.pageButton}
                >
                  {page}
                </PaginationButton>
              );
            })}
          </div>

          <PaginationButton
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={styles.navButton}
            ariaLabel="Next page"
          >
            &gt;
          </PaginationButton>
        </div>

        {onItemsPerPageChange && (
          <div className={styles.itemsPerPageWrapper}>
            <PaginationItemsPerPage
              itemsPerPage={itemsPerPage}
              options={pageSizeOptions}
              onChange={handleItemsPerPageChange}
            />
          </div>
        )}
      </nav>
    </div>
  );
};