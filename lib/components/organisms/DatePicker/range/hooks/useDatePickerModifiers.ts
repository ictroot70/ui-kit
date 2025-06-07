import { useMemo } from 'react'
import { getModifiers, Modifiers } from '../helpers/DatePickerModifiers'
import { type DateRange } from 'react-day-picker'

/**
 * React hook that returns memoized date modifiers for use with react-day-picker.
 *
 * It provides commonly used modifiers such as:
 * - `today`: The current date.
 * - `weekend`: A function that returns `true` for Saturday and Sunday.
 * - `inRange`: A function that returns `true` for dates within the selected range.
 * - `hover`: Always returns `true` (placeholder for hover styling).
 * - `outside`: A function that returns `true` for dates outside the current month.
 *
 * @param selectedDates - The currently selected date range from the calendar.
 * @returns A memoized object of date modifiers used to customize day rendering.
 */

export const useDatePickerModifiers = (selectedDates: DateRange): Modifiers => {
  const today = useMemo(() => new Date(), [])
  return useMemo(() => getModifiers(selectedDates, today), [selectedDates, today])
}
