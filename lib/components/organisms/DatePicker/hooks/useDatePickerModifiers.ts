import { useMemo } from 'react'
import { type DateRange } from 'react-day-picker'

import { getModifiers, Modifiers } from '../helpers/datePickerHelpers'

/**
 * React hook that returns memoized date modifiers for use with react-day-picker.
 *
 * @param selectedDates - The currently selected date range from the calendar.
 * @returns A memoized object of date modifiers used to customize day rendering.
 */
export const useDatePickerModifiers = (selectedDates?: DateRange): Modifiers => {
  const today = useMemo(() => new Date(), [])

  return useMemo(() => getModifiers(today, selectedDates), [selectedDates, today])
}
