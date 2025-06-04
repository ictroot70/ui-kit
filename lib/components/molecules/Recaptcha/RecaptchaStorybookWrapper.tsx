import { ReactElement } from 'react'

import { Recaptcha, RecaptchaProps } from 'components/molecules/Recaptcha/Recaptcha'

/**
 * A wrapper component for the `Recaptcha` component, used specifically in Storybook.
 * It allows passing custom props for Storybook-specific visualization, such as mock states.
 *
 * @param {RecaptchaProps} props - Props passed to the wrapper.
 * @param {'default' | 'success' | 'expired'} [props.statusForStorybook='default'] - (Storybook only) Simulates different reCAPTCHA states.
 * @param {string} props.sitekey - The reCAPTCHA site key required for initialization.
 *
 * @returns {ReactElement} A wrapped `Recaptcha` component with optional mocked state.
 *
 * @example
 * <RecaptchaStorybookWrapper
 *   sitekey="your-site-key"
 *   statusForStorybook="success"
 * />
 */

export const RecaptchaStorybookWrapper = ({
  statusForStorybook = 'default',
  sitekey,
}: RecaptchaProps): ReactElement => {
  return <Recaptcha sitekey={sitekey} statusForStorybook={statusForStorybook} />
}
