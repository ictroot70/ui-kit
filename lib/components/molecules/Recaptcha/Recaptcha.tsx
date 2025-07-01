import { forwardRef, ReactElement } from 'react'
import {
  default as ReCAPTCHA,
  ReCAPTCHA as ReCAPTCHAInstance,
  ReCAPTCHAProps,
} from 'react-google-recaptcha'

import { clsx } from 'clsx'
import { ErrorMessage } from 'components/atoms'

import { RecaptchaStatusForStorybook } from 'components/molecules/Recaptcha/Recaptcha.types'

import {
  useRecaptchaHandlers,
  useRecaptchaLoadGuard,
  useRecaptchaStatus,
} from 'components/molecules/Recaptcha/hook'

import s from 'components/molecules/Recaptcha/Recaptcha.module.scss'

/**
 * @interface RecaptchaProps
 * @extends ReCAPTCHAProps
 * @description
 * Props for the custom Recaptcha component. Inherits all props from `react-google-recaptcha`
 * and adds an optional prop for Storybook-specific state simulation.
 *
 [statusForStorybook] - Used only in Storybook to simulate visual states.
 */
export interface RecaptchaProps extends ReCAPTCHAProps {
  /** Used only in Storybook to simulate visual states */
  statusForStorybook?: RecaptchaStatusForStorybook
}

/**
 * @component Recaptcha
 * @description
 * A wrapper around the `react-google-recaptcha` component with integrated visual feedback
 * and support for Storybook testing. It handles the CAPTCHA success and expiration states
 * and displays an error message when the verification fails or expires.
 *
 * @param {RecaptchaProps} props - Props for configuring the ReCAPTCHA component.
 * @param {string} props.sitekey - The ReCAPTCHA site key.
 * @param {(value: string | null) => void} [props.onChange] - Callback when the user completes the CAPTCHA.
 * @param {() => void} [props.onExpired] - Callback when the CAPTCHA expires.
 * @param {'success' | 'expired' | 'error'} [props.statusForStorybook] - Optional status for Storybook visualization.
 * @param {React.Ref<ReCAPTCHAInstance>} ref - Ref forwarded to the ReCAPTCHA instance.
 *
 * @example
 * ```tsx
 * <Recaptcha
 *   sitekey="your-site-key"
 *   onChange={(token) => console.log(token)}
 *   onExpired={() => console.log('Captcha expired')}
 * />
 * ```
 */

export const Recaptcha = forwardRef<ReCAPTCHAInstance, RecaptchaProps>(
  (props, ref): ReactElement => {
    const { statusForStorybook, sitekey, onChange, onExpired, ...rest } = props
    const { visualStatus, setSuccess, setExpired } = useRecaptchaStatus(statusForStorybook)

    const { handleOnChange, handleOnExpired } = useRecaptchaHandlers({
      setSuccess,
      setExpired,
      onChange,
      onExpired,
    })
    const { isLoaded, hasTimedOut, markAsLoaded } = useRecaptchaLoadGuard()

    return (
      <div
        className={clsx(s.container, {
          [s.error]: visualStatus === 'error',
          [s.expired]: visualStatus === 'expired',
          [s.hidden]: !isLoaded,
        })}
      >
        <div className={s.recaptchaWrapper}>
          <ReCAPTCHA
            ref={ref}
            hl={'en'}
            theme={'dark'}
            className={'recaptcha-core'}
            sitekey={sitekey}
            onChange={handleOnChange}
            onExpired={handleOnExpired}
            onLoadCapture={markAsLoaded}
            {...rest}
          />
        </div>

        {visualStatus === 'error' && isLoaded && (
          <ErrorMessage
            variant={'danger_small'}
            className={s.recaptchaMessage}
            message={'Please verify that you are not a robot'}
          />
        )}
        {!isLoaded && hasTimedOut && (
          <ErrorMessage
            variant={'danger_small'}
            className={s.recaptchaMessage}
            message={'ReCAPTCHA failed to load. Please try again later.'}
          />
        )}
      </div>
    )
  }
)

Recaptcha.displayName = 'Recaptcha'
