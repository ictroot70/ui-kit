import { ReactElement, ReactNode } from 'react'

import { Corner, Root, Scrollbar, Thumb, Viewport } from '@radix-ui/react-scroll-area'
import { useHorizontalWheelScroll } from 'components/atoms/ScrollAreaRadix/useHorizontalWheelScroll'

import styles from './ScrollAreaRadix.module.scss'

export interface CustomScrollAreaProps {
  children: ReactNode
  className?: string
  viewportClassName?: string
}

/**
 * A customizable scroll area component built on top of Radix UI's ScrollArea primitives.
 *
 * Provides vertical and horizontal scrolling with styled scrollbars, and supports
 * horizontal scrolling via mouse wheel using the `useHorizontalWheelScroll` custom hook.
 *
 * @component
 * @example
 * ```tsx
 * import { ScrollAreaRadix } from 'components/atoms/ScrollAreaRadix/ScrollAreaRadix'
 * const MyComponent = () => (
 *   <ScrollAreaRadix className="my-scroll-area" viewportClassName="my-viewport">
 *     <div>Scrollable content here</div>
 *   </ScrollAreaRadix>
 * )
 * ```
 *
 * @param {CustomScrollAreaProps} props - Props for the ScrollAreaRadix component.
 * @param {React.ReactNode} props.children - The content to be rendered inside the scrollable area.
 * @param {string} [props.className] - Optional CSS class to apply to the root element for custom styling.
 * @param {string} [props.viewportClassName] - Optional CSS class to apply to the viewport element for custom styling.
 * @returns {React.ReactElement} The rendered scroll area component.
 *
 * @remarks
 * Uses `useHorizontalWheelScroll` internally to enhance UX for horizontal content layouts.

 */

export const ScrollAreaRadix = (props: CustomScrollAreaProps): ReactElement => {
  const { children, className, viewportClassName } = props
  const scrollRef = useHorizontalWheelScroll()

  return (
    <Root className={`${styles.ScrollAreaRoot} ${className}`}>
      <Viewport
        tabIndex={0}
        ref={scrollRef}
        className={`${styles.ScrollAreaViewport} ${viewportClassName}`}
      >
        {children}
      </Viewport>
      <Scrollbar className={`${styles.ScrollAreaScrollbar}`} orientation={'vertical'}>
        <Thumb className={`${styles.ScrollAreaThumb}`} />
      </Scrollbar>
      <Scrollbar className={`${styles.ScrollAreaScrollbar}`} orientation={'horizontal'}>
        <Thumb className={`${styles.ScrollAreaThumb}`} />
      </Scrollbar>
      <Corner className={`${styles.ScrollAreaCorner}`} />
    </Root>
  )
}

ScrollAreaRadix.displayName = 'ScrollAreaRadix'
