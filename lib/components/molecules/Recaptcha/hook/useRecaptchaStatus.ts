import { useState } from 'react'

import { RecaptchaStatusForStorybook } from 'components/molecules/Recaptcha/Recaptcha.types'

type UseRecaptchaStatusReturn = {
  visualStatus: RecaptchaInternalStatus
  setSuccess: () => void
  setExpired: () => void
}
type RecaptchaInternalStatus = 'default' | 'error' | 'expired'

/**
 * A custom hook that manages the internal reCAPTCHA status and allows
 * Storybook to override the visual state for demonstration purposes.
 *
 * @param {RecaptchaStatusForStorybook} [statusForStorybook] - (Optional) A mock status used only in Storybook to simulate different visual states.
 * Must be one of: `'default'`, `'error'`, `'expired'`.
 *
 * @returns {{
 *   visualStatus: 'default' | 'error' | 'expired',
 *   setSuccess: () => void,
 *   setExpired: () => void
 * }} An object with:
 * - `visualStatus`: The current status to be visually rendered. If `statusForStorybook` is provided and valid, it takes precedence.
 * - `setSuccess`: Sets the internal status to `'default'`.
 * - `setExpired`: Sets the internal status to `'expired'`.
 *
 * @example
 * const { visualStatus, setSuccess, setExpired } = useRecaptchaStatus(statusForStorybook)
 *
 * // Trigger updates based on reCAPTCHA events
 * onSuccess={() => setSuccess()}
 * onExpire={() => setExpired()}
 */

export const useRecaptchaStatus = (
  statusForStorybook?: RecaptchaStatusForStorybook
): UseRecaptchaStatusReturn => {
  const [internalStatus, setInternalStatus] = useState<RecaptchaInternalStatus>('default')

  const visualStatus: RecaptchaInternalStatus =
    statusForStorybook && ['default', 'error', 'expired'].includes(statusForStorybook)
      ? statusForStorybook
      : internalStatus

  const setSuccess = () => setInternalStatus('default')
  const setExpired = () => setInternalStatus('expired')

  return { visualStatus, setSuccess, setExpired }
}
