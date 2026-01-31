import { useMemo } from 'react'

import { getModifiers, Modifiers } from '../helpers/datePickerHelpers'

/**
 * React hook that returns memoized date modifiers for use with react-day-picker (single mode).
 *
 * @returns A memoized object of date modifiers used to customize day rendering.
 */
export const useDatePickerModifiers = (): Modifiers => {
  const today = useMemo(() => new Date(), [])

  return useMemo(() => getModifiers(today), [today])
}
