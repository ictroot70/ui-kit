import { Matcher } from 'react-day-picker'

import s from '../styles/DatePicker.module.scss'

export type Modifiers = Record<string, Matcher | Matcher[] | undefined>

/**
 * Returns a set of custom modifiers for react-day-picker.
 * @param today - The current date used for context.
 * @returns An object of modifiers used to customize day behavior.
 */
export const getSingleModifiers = (today: Date): Modifiers => ({
  today,
  weekend: (date: Date) => date.getDay() === 0 || date.getDay() === 6,
  hover: (_: Date) => true,
})

/**
 * Mapping of modifier names to their corresponding CSS class names.
 */
export const modifiersClassNames = {
  today: s.rdpDay_today,
  selected: s.rdpDay_selected,
  weekend: s.weekendDay,
  hover: s.rdpDay_hover,
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
}
