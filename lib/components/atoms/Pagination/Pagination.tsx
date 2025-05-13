// Pagination.tsx
import { useState, ChangeEvent, useEffect, useMemo, useCallback } from 'react';
import clsx from 'clsx';
import styles from './Pagination.module.scss';

interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (count: number) => void;
  className?: string;
}

type PageItem = number | 'ellipsis';

export const Pagination = ({
  currentPage = 1,
  totalItems = 120,
  itemsPerPage = 20,
  onPageChange,
  onItemsPerPageChange,
  className,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const [inputPage, setInputPage] = useState(currentPage.toString());
  const [isInputVisible, setIsInputVisible] = useState(false);

  useEffect(() => {
    setInputPage(currentPage.toString());
  }, [currentPage]);

  const handlePageInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setInputPage(value);
    }
  }, []);

  const handlePageInputBlur = useCallback(() => {
    const page = Math.max(1, Math.min(parseInt(inputPage) || currentPage, totalPages));
    onPageChange(page);
    setInputPage(page.toString());
    setIsInputVisible(false);
  }, [inputPage, currentPage, totalPages, onPageChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handlePageInputBlur();
  }, [handlePageInputBlur]);

  const handleItemsPerPageChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(e.target.value);
    onItemsPerPageChange?.(value);
    onPageChange(1);
  }, [onItemsPerPageChange, onPageChange]);

  const toggleInputVisibility = useCallback(() => {
    setIsInputVisible(prev => !prev);
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

      if (startPage > 2) pages.push('ellipsis');
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push('ellipsis');

      pages.push(totalPages);
    }

    return pages;
  }, [totalPages, currentPage]);

  const pageSizeOptions = useMemo(() => [10, 20, 30, 50, 100], []);

  return (
    <div className={clsx(styles.paginationContainer, className)}>
      <div className={styles.pagination}>
        <button
          className={clsx(styles.navButton, { [styles.disabled]: currentPage === 1 })}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {visiblePages.map((page, index) => (
          page === 'ellipsis' ? (
            isInputVisible ? (
              <input
                key={`input-${index}`}
                type="text"
                value={inputPage}
                onChange={handlePageInputChange}
                onBlur={handlePageInputBlur}
                onKeyDown={handleKeyDown}
                className={styles.pageInput}

              />
            ) : (
              <span
                key={`ellipsis-${index}`}
                onClick={toggleInputVisibility}
                className={styles.ellipsis}
                role="button"
                aria-label="Jump to page"
              >
                ...
              </span>
            )
          ) : (
            <button
              key={page}
              className={clsx(styles.pageButton, {
                [styles.active]: page === currentPage,
              })}
              onClick={() => onPageChange(page)}
              disabled={page === currentPage}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          )
        ))}

        <button
          className={clsx(styles.navButton, { [styles.disabled]: currentPage === totalPages })}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          &gt;
        </button>
      </div>

      {onItemsPerPageChange && (
        <div className={styles.itemsPerPage}>
          <span>Show</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            aria-label="Items per page"
          >
            {pageSizeOptions.map(count => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
          <span>on page</span>
        </div>
      )}
    </div>
  );
};