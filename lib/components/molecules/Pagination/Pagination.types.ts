/**
 * Renderable page token for pagination controls.
 * Can be a regular numeric page or an interactive ellipsis marker.
 */
export type PageItem = number | { type: 'ellipsis'; position: 'left' | 'right' };

/**
 * Public API for the `Pagination` component.
 */
export interface PaginationProps {
  /** Currently selected page (1-based). */
  currentPage?: number;
  /** Total number of items across all pages. */
  totalItems?: number;
  /** Number of items shown per page. */
  itemsPerPage?: number;
  /** Called when current page changes. Receives a clamped 1-based page index. */
  onPageChange: (page: number) => void;
  /**
   * Enables the "items per page" selector when provided.
   * Callback receives the selected page size.
   */
  onItemsPerPageChange?: (count: number) => void;
  /** Optional root class name for layout/style overrides. */
  className?: string;
}
