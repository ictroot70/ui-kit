import { ReactElement, ReactNode } from 'react'

import { Corner, Root, Scrollbar, Thumb, Viewport } from '@radix-ui/react-scroll-area'
import { clsx } from 'clsx'
import { useHorizontalWheelScroll } from 'components/atoms/ScrollAreaRadix/useHorizontalWheelScroll'

import styles from './ScrollAreaRadix.module.scss'

export type ScrollAreaOrientation = 'vertical' | 'horizontal' | 'both'

export interface CustomScrollAreaProps {
  children: ReactNode
  className?: string
  viewportClassName?: string
  orientation?: ScrollAreaOrientation
}

/**
 * A customizable scroll area component built on top of Radix UI's ScrollArea primitives.
 *
 * Provides styled scrollbars for vertical, horizontal, or bidirectional scrolling.
 * Horizontal scrolling can also be enhanced with mouse wheel support via the
 * `useHorizontalWheelScroll` custom hook.
 *
 * By default, the component preserves the original behavior and renders both
 * vertical and horizontal scrollbars (`orientation="both"`). Existing usages
 * without the `orientation` prop do not need to be changed.
 *
 * Use `orientation="vertical"` for page-level or layout scroll containers where
 * horizontal page scrolling must be prevented.
 *
 * @component
 * @example
 * ```tsx
 * import { ScrollAreaRadix } from 'components/atoms/ScrollAreaRadix/ScrollAreaRadix'
 *
 * const MyComponent = () => (
 *   <ScrollAreaRadix className="my-scroll-area" viewportClassName="my-viewport">
 *     <div>Scrollable content here</div>
 *   </ScrollAreaRadix>
 * )
 * ```
 *
 * @example
 * ```tsx
 * <ScrollAreaRadix orientation="vertical">
 *   <div>Vertically scrollable content here</div>
 * </ScrollAreaRadix>
 * ```
 *
 * @param {CustomScrollAreaProps} props - Props for the ScrollAreaRadix component.
 * @param {React.ReactNode} props.children - The content rendered inside the scrollable area.
 * @param {string} [props.className] - Optional CSS class applied to the root element.
 * @param {string} [props.viewportClassName] - Optional CSS class applied to the viewport element.
 * @param {'vertical' | 'horizontal' | 'both'} [props.orientation='both'] - Controls which scroll axis is enabled. Defaults to `both` for backward compatibility.
 * @returns {React.ReactElement} The rendered scroll area component.
 *
 * @remarks
 * `useHorizontalWheelScroll` is enabled only when horizontal scrolling is active
 * (`orientation="horizontal"` or `orientation="both"`).
 */

export const ScrollAreaRadix = (props: CustomScrollAreaProps): ReactElement => {
  const { children, className, viewportClassName, orientation = 'both' } = props

  const showVertical = orientation === 'vertical' || orientation === 'both'
  const showHorizontal = orientation === 'horizontal' || orientation === 'both'
  const scrollRef = useHorizontalWheelScroll({ enabled: showHorizontal })

  return (
    <Root className={clsx(styles.ScrollAreaRoot, className)}>
      <Viewport
        tabIndex={0}
        ref={scrollRef}
        className={clsx(
          styles.ScrollAreaViewport,
          orientation === 'vertical' && styles.ScrollAreaViewportVertical,
          orientation === 'horizontal' && styles.ScrollAreaViewportHorizontal,
          viewportClassName
        )}
      >
        {children}
      </Viewport>

      {showVertical && (
        <Scrollbar className={styles.ScrollAreaScrollbar} orientation={'vertical'}>
          <Thumb className={styles.ScrollAreaThumb} />
        </Scrollbar>
      )}

      {showHorizontal && (
        <Scrollbar className={styles.ScrollAreaScrollbar} orientation={'horizontal'}>
          <Thumb className={styles.ScrollAreaThumb} />
        </Scrollbar>
      )}

      {showVertical && showHorizontal && <Corner className={styles.ScrollAreaCorner} />}
    </Root>
  )
}

ScrollAreaRadix.displayName = 'ScrollAreaRadix'
