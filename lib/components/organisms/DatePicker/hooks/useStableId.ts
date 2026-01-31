import { useId } from 'react'

/**
 * Generates a stable unique ID for client/server rendering.
 * @param prefix - Optional prefix for the id
 * @returns Stable unique id as string
 */
export const useStableId = (prefix = 'id'): string => {
  const reactId = useId()

  return prefix ? `${prefix}-${reactId}` : reactId
}
