import { DateRange, Matcher } from 'react-day-picker'
import s from '../DatePicker.module.scss'

export type Modifiers = Record<string, Matcher | Matcher[] | undefined>

/**
 * Returns a set of custom modifiers for react-day-picker.
 *
 * @param today - The current date used for context.
 * @param selectedDates - The currently selected date range (optional).
 * @returns An object of modifiers used to customize day behavior.
 */
export const getModifiers = (today: Date, selectedDates?: DateRange): Modifiers => {
  const isRange = selectedDates !== undefined

  const modifiers: Modifiers = {
    today,
    weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  }

  if (isRange && selectedDates) {
    modifiers.inRange = (date: Date) => {
      const { from, to } = selectedDates
      return !!(from && to && date >= from && date <= to)
    }
  }

  return modifiers
}

/**
 * Mapping of modifier names to their corresponding CSS class names.
 */
export const modifiersClassNames = {
  today: s.rdpDay_today,
  selected: s.rdpDay_selected,
  weekend: s.weekendDay,
  disabled: s.rdpDayDisabled,
  inRange: s.rdpDay_inRange,
  range_start: s.rdpDay_first,
  range_end: s.rdpDay_last,
  outside: s.rdpDay_outside,
}

/**
 * Mapping of react-day-picker structural elements to custom CSS class names.
 */
export const dayPickerClassNames = {
  caption_label: s.rdpCaptionLabel,
  button_next: s.rdpButton_next,
  button_previous: s.rdpButton_previous,
  nav: s.rdpNav,
  day_range_start: s.rdpDay_first,
  day_range_end: s.rdpDay_last,
  day_range_middle: s.rdpDay_inRange,
}
