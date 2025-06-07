import { useMemo } from 'react'
import { DateRange } from 'react-day-picker'

/**
 * Returns a formatted string representing a date range in the format `DD/MM/YYYY - DD/MM/YYYY`.
 *
 * If the range is not fully selected (`from` or `to` is missing), it returns the provided `placeholder` string.
 *
 * @param {DateRange | undefined} range - An object containing the selected date range (`from` and `to`).
 * @param {string} placeholder - A fallback string displayed when the date range is incomplete or undefined.
 * @returns {string} A formatted date range string or the placeholder if dates are missing.
 *
 * @example
 * const formatted = useFormattedRange({ from: new Date(2024, 0, 1), to: new Date(2024, 0, 10) }, 'Select dates');
 * // formatted = "01/01/2024 - 10/01/2024"
 */
export const useFormattedRange = (range: DateRange | undefined, placeholder: string): string => {
  return useMemo(() => {
    if (range?.from && range?.to) {
      const format = (date: Date) =>
        date.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' })
      return `${format(range.from)} - ${format(range.to)}`
    }
    return placeholder
  }, [range, placeholder])
}
