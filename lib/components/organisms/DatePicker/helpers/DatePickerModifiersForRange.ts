import { DateRange, Matcher } from 'react-day-picker'

import s from '../styles/DatePicker.module.scss'

export type ModifiersForRange = Record<string, Matcher | Matcher[] | undefined>

/**
 * Returns a set of custom modifiers for react-day-picker.
 *
 * @param selectedDates - The currently selected date range.
 * @param today - The current date used for context.
 * @returns An object of modifiers used to customize day behavior.
 */
export const getModifiersForRange = (selectedDates: DateRange, today: Date): ModifiersForRange => ({
  today,
  weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  inRange: (date: Date) => {
    const { from, to } = selectedDates

    return !!(from && to && date >= from && date <= to)
  },
  hover: (_: Date) => true,
  outside: (date: Date) => date.getMonth() !== today.getMonth(),
})

/**
 * Mapping of modifier names to their corresponding CSS class names.
 * Used to style specific days in the calendar based on state.
 */
export const modifiersClassNamesForRange = {
  today: s.rdpDay_today,
  selected: s.rdpDay_selected,
  weekend: s.weekendDay,
  disabled: s.rdpDayDisabled,
  inRange: s.rdpDay_inRange,
  range_start: s.rdpDay_first,
  range_end: s.rdpDay_last,
  hover: s.rdpDay_hover,
  outside: s.rdpDay_outside,
}

/**
 * Mapping of react-day-picker structural elements to custom CSS class names.
 * Used to style navigation, caption, and day range states.
 */
export const dayPickerClassNamesForRange = {
  caption_label: s.rdpCaptionLabel,
  button_next: s.rdpButton_next,
  button_previous: s.rdpButton_previous,
  nav: s.rdpNav,
  day_range_start: s.rdpDay_first,
  day_range_end: s.rdpDay_last,
  day_range_middle: s.rdpDay_inRange,
}
