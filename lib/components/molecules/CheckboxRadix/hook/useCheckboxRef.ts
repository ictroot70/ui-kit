import { useRef } from 'react'
import type { Ref } from 'react'

import { mergeRefs } from 'components/molecules/CheckboxRadix/mergeRefs'

/**
 * Custom hook for combining an internal and external ref using `mergeRefs`.
 *
 * @template T - The type of the referenced DOM element.
 * @param externalRef - Ref passed from the parent component (forwarded).
 * @returns An object with both the internal ref and the merged ref callback.
 */
export const useCheckboxRef = <T>(externalRef: Ref<T>) => {
  const internalRef = useRef<T | null>(null)

  const mergedRef = mergeRefs(internalRef, externalRef)

  return {
    internalRef,
    mergedRef,
  }
}
