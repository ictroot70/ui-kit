import { useMemo } from 'react'

import { v4 as uuidv4 } from 'uuid'
/**
 * React hook that generates a stable unique ID for the lifetime of the component.
 *
 * Useful for associating elements (e.g. labels and inputs) with consistent,
 * unique identifiers that persist across re-renders.
 *
 * @param prefix - Optional string to prefix the ID with (default is `'id'`).
 * @returns A stable, memoized string ID like `prefix-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`.
 */
export const useStableIdForRange = (prefix = 'id'): string => {
  return useMemo(() => `${prefix}-${uuidv4()}`, [prefix])
}
