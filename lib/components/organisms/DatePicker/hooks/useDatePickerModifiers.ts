import { useEffect, useMemo, useState } from 'react'
import { type DateRange } from 'react-day-picker'

import { getModifiers, Modifiers } from '../helpers/datePickerHelpers'

const getStartOfDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate())

/**
 * React hook that returns memoized date modifiers for use with react-day-picker.
 *
 * @param selectedDates - The currently selected date range from the calendar.
 * @returns A memoized object of date modifiers used to customize day rendering.
 */
export const useDatePickerModifiers = (selectedDates?: DateRange): Modifiers => {
  const [today, setToday] = useState<Date>(() => getStartOfDay(new Date()))

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextToday = getStartOfDay(new Date())

      setToday(prev => (prev.getTime() === nextToday.getTime() ? prev : nextToday))
    }, 60_000)

    return () => clearInterval(intervalId)
  }, [])

  return useMemo(() => getModifiers(today, selectedDates), [selectedDates, today])
}
