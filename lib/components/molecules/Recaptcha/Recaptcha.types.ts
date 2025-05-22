import { ReCAPTCHAProps } from 'react-google-recaptcha'

/**
 * @typedef {'default' | 'error' | 'expired'} RecaptchaStatusForStorybook
 * @description
 * Represents visual states of the ReCAPTCHA component used specifically in Storybook
 * to simulate different scenarios (default, error, or expired).
 */
export type RecaptchaStatusForStorybook = 'default' | 'error' | 'expired'

/**
 * @interface RecaptchaProps
 * @extends ReCAPTCHAProps
 * @description
 * Props for the custom Recaptcha component. Inherits all props from `react-google-recaptcha`
 * and adds an optional prop for Storybook-specific state simulation.
 *
 * @property {RecaptchaStatusForStorybook} [statusForStorybook] - Used only in Storybook to simulate visual states.
 */
export interface RecaptchaProps extends ReCAPTCHAProps {
  /** Used only in Storybook to simulate visual states */
  statusForStorybook?: RecaptchaStatusForStorybook
}
