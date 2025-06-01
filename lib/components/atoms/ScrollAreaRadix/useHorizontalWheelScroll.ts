import { useEffect, useRef } from 'react'

/**
 * A React hook that enables horizontal scrolling using the vertical mouse wheel.
 *
 * This hook is useful when you want to allow horizontal scrolling in areas where
 * horizontal overflow is present, but the default mouse wheel behavior only scrolls vertically.
 *
 * The hook returns a ref that should be attached to a scrollable container (typically a div
 * with `overflow-x: auto`). It adds a `wheel` event listener that maps vertical scroll input
 * (`deltaY`) to horizontal scrolling (`scrollLeft`).
 *
 * ⚠️ The event listener is added as non-passive to allow preventing the default vertical scroll
 * behavior. Make sure this does not interfere with other scrollable areas on the page.
 *
 * @returns A ref to be attached to a scrollable element.
 *
 * @example
 * const scrollRef = useHorizontalWheelScroll();
 * return <div ref={scrollRef} style={{ overflowX: 'auto' }}>…</div>
 */

export const useHorizontalWheelScroll = () => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return

      el.scrollLeft += Number(e.deltaY)
    }

    el.addEventListener('wheel', onWheel, { passive: true })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return ref
}
