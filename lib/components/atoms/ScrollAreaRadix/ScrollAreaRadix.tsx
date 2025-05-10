import { Corner, Root, Scrollbar, Thumb, Viewport } from '@radix-ui/react-scroll-area'
import { ReactNode } from 'react'
import styles from './ScrollAreaRadix.module.scss'

export const ScrollAreaRadix = (props: CustomScrollAreaProps) => {
  const { children, className } = props
  return (
    <Root className={`${styles.ScrollAreaRoot} ${className}`}>
      <Viewport className={`${styles.ScrollAreaViewport}`}>{children}</Viewport>
      <Scrollbar className={`${styles.ScrollAreaScrollbar}`} orientation="vertical">
        <Thumb className={`${styles.ScrollAreaThumb}`} />
      </Scrollbar>
      <Scrollbar className={`${styles.ScrollAreaScrollbar}`} orientation="horizontal">
        <Thumb className={`${styles.ScrollAreaThumb}`} />
      </Scrollbar>
      <Corner className={`${styles.ScrollAreaCorner}`} />
    </Root>
  )
}

ScrollAreaRadix.displayName = 'ScrollAreaRadix'

interface CustomScrollAreaProps {
  children: ReactNode
  className?: string
}
