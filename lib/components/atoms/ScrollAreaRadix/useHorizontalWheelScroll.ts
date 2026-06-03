import { useEffect, useRef } from 'react'

type UseHorizontalWheelScrollParams = {
  enabled?: boolean
}

/**
 * A React hook that enables horizontal scrolling using the vertical mouse wheel.
 *
 * @returns A ref to be attached to a scrollable element.
 */
export const useHorizontalWheelScroll = ({
  enabled = true,
}: UseHorizontalWheelScrollParams = {}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) {
      return
    }

    const el = ref.current

    if (!el) {
      return
    }

    const onWheel = (e: WheelEvent) => {
      if (e.deltaY === 0 || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        return
      }

      el.scrollLeft += Number(e.deltaY)
    }

    el.addEventListener('wheel', onWheel, { passive: true })

    return () => el.removeEventListener('wheel', onWheel)
  }, [enabled])

  return ref
}
