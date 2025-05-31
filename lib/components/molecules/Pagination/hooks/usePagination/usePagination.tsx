import { useState, useEffect, useMemo, useCallback } from 'react';
import { PageItem } from '../../Pagination.types';
import { PAGE_SIZE_OPTIONS } from '../../constants/constants';

export const usePagination = ({
    currentPage = 1,
    totalItems = 0,
    itemsPerPage = 10,
    onPageChange,
    onItemsPerPageChange,
}: {
    currentPage?: number;
    totalItems?: number;
    itemsPerPage?: number;
    onPageChange: (page: number) => void;
    onItemsPerPageChange?: (count: number) => void;
}) => {
    const [inputPage, setInputPage] = useState(currentPage.toString());
    const [activeEllipsis, setActiveEllipsis] = useState<'left' | 'right' | null>(null);

    const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

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
        visiblePages,
        pageSizeOptions: PAGE_SIZE_OPTIONS,
        handlePageInputChange,
        handlePageInputBlur,
        handleKeyDown,
        handleItemsPerPageChange,
        handleEllipsisClick,
        selectOptions,
        selectValue: itemsPerPage.toString(),
    };
};