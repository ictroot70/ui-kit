export type PageItem = number | { type: 'ellipsis'; position: 'left' | 'right' };

export interface PaginationProps {
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange?: (count: number) => void;
  className?: string;
}