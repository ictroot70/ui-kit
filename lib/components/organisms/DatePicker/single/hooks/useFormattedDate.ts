import { useMemo } from "react";

/**
 * Formats a single date or returns a placeholder if not set.
 * Supports different locales.
 *
 * @param date - The selected date
 * @param placeholder - Placeholder string if no date is selected
 * @param locale - Locale for date formatting (default: "en-GB")
 * @returns Formatted date string or placeholder
 */
export const useFormattedDate = (
  date: Date | undefined,
  placeholder: string,
  locale: string = "en-GB"
): string =>
  useMemo(
    () =>
      date
        ? date.toLocaleDateString(locale, {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        : placeholder,
    [date, placeholder, locale]
  );