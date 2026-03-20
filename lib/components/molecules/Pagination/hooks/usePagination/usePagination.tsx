import { useState, useEffect, useMemo, useCallback } from 'react';
import { PageItem } from '../../Pagination.types';
import { PAGE_SIZE_OPTIONS } from '../../constants/constants';

interface UsePaginationParams {
    currentPage?: number;
    totalItems?: number;
    itemsPerPage?: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (count: number) => void;
}

/**
 * Encapsulates pagination state and derived handlers used by `Pagination`.
 *
 * Ellipsis input behavior:
 * - click on ellipsis: opens an empty input near that ellipsis
 * - `Enter`: commits entered page (clamped to valid range)
 * - `Escape`: cancels edit and restores current page value
 * - `blur`: commits valid entered value, otherwise closes without page change
 */
export const usePagination = ({
    currentPage = 1,
    totalItems = 0,
    itemsPerPage = 10,
    onPageChange,
    onItemsPerPageChange,
}: UsePaginationParams) => {
    const [inputPage, setInputPage] = useState(currentPage.toString());
    const [activeEllipsis, setActiveEllipsis] = useState<'left' | 'right' | null>(null);

    const safeItemsPerPage = Math.max(1, itemsPerPage);
    const totalPages = Math.max(1, Math.ceil(totalItems / safeItemsPerPage));
    const safeCurrentPage = Math.min(totalPages, Math.max(1, currentPage));

    useEffect(() => {
        setInputPage(safeCurrentPage.toString());
        setActiveEllipsis(null);
    }, [safeCurrentPage]);

    const handlePageInputChange = useCallback((value: string) => {
        if (/^\d*$/.test(value)) {
            setInputPage(value);
        }
    }, []);

    const closeInput = useCallback(() => {
        setInputPage(safeCurrentPage.toString());
        setActiveEllipsis(null);
    }, [safeCurrentPage]);

    const commitInputPage = useCallback(() => {
        const trimmedValue = inputPage.trim();

        if (!trimmedValue) {
            closeInput();
            return;
        }

        const parsedPage = Number.parseInt(trimmedValue, 10);

        if (Number.isNaN(parsedPage)) {
            closeInput();
            return;
        }

        const nextPage = Math.max(1, Math.min(parsedPage, totalPages));

        if (nextPage !== safeCurrentPage) {
            onPageChange(nextPage);
        }

        setInputPage(nextPage.toString());
        setActiveEllipsis(null);
    }, [closeInput, inputPage, onPageChange, safeCurrentPage, totalPages]);

    const handlePageInputBlur = useCallback(() => {
        commitInputPage();
    }, [commitInputPage]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            commitInputPage();
            return;
        }

        if (e.key === 'Escape') {
            e.preventDefault();
            closeInput();
        }
    }, [closeInput, commitInputPage]);

    const handleItemsPerPageChange = useCallback((selectedValue: number) => {
        onItemsPerPageChange?.(selectedValue);
        onPageChange(1);
    }, [onItemsPerPageChange, onPageChange]);

    const handleEllipsisClick = useCallback((position: 'left' | 'right') => {
        setInputPage('');
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
            const startPage = Math.max(2, safeCurrentPage - boundaryPages);
            const endPage = Math.min(totalPages - 1, safeCurrentPage + boundaryPages);

            if (startPage > 2) pages.push({ type: 'ellipsis', position: 'left' });
            for (let i = startPage; i <= endPage; i++) pages.push(i);
            if (endPage < totalPages - 1) pages.push({ type: 'ellipsis', position: 'right' });

            pages.push(totalPages);
        }

        return pages;
    }, [totalPages, safeCurrentPage]);

    const selectOptions = useMemo(() => (
        PAGE_SIZE_OPTIONS.map(option => ({
            value: option.toString(),
            label: option.toString()
        }))
    ), []);

    return {
        inputPage,
        activeEllipsis,
        totalPages,
        safeCurrentPage,
        visiblePages,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        handlePageInputChange,
        handlePageInputBlur,
        handleKeyDown,
        handleItemsPerPageChange,
        handleEllipsisClick,
        selectOptions,
        selectValue: safeItemsPerPage.toString(),
    };
};
