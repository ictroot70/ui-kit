import { MutableRefObject, Ref, RefCallback } from 'react'

/**
 * Merges multiple React refs (either callback refs or ref objects) into a single ref callback.
 *
 * This is useful when you want to pass the same ref to multiple places — for example,
 * to both a parent and a child component — or combine internal and forwarded refs.
 *
 * ## Example
 * ```tsx
 * const localRef = useRef<HTMLDivElement>(null)
 *
 * return <div ref={mergeRefs(localRef, forwardedRef)} />
 * ```
 *
 * @template T - The type of the referenced DOM node or React component instance.
 * @param refs - An array of refs (callback refs or ref objects) to be merged.
 * @returns A ref callback that assigns the received element to all provided refs.
 */
export const mergeRefs = <T>(...refs: (Ref<T> | undefined)[]): RefCallback<T> => {
  return value => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(value)
      } else if (ref && typeof ref === 'object') {
        ;(ref as MutableRefObject<T | null>).current = value
      }
    })
  }
}
