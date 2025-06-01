'use client'

import { default as ReCAPTCHA, ReCAPTCHA as ReCAPTCHAInstance } from 'react-google-recaptcha'
import clsx from 'clsx'
import { forwardRef, ReactElement } from 'react'
import s from 'components/molecules/Recaptcha/Recaptcha.module.scss'
import { RecaptchaProps } from 'components/molecules/Recaptcha/Recaptcha.types'
import { useRecaptchaStatus } from 'components/molecules/Recaptcha/hook/useRecaptchaStatus'
import { useRecaptchaHandlers } from 'components/molecules/Recaptcha/hook/useRecaptchaHandlers'
import { Typography } from 'components/atoms'
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

    return (
      <div
        className={clsx(s.recaptchaWrapper, {
          [s.error]: visualStatus === 'error',
          [s.expired]: visualStatus === 'expired',
        })}
      >
        <ReCAPTCHA
          ref={ref}
          hl="en"
          theme="dark"
          className="recaptcha-core"
          sitekey={sitekey}
          onChange={handleOnChange}
          onExpired={handleOnExpired}
          {...rest}
        />

        {visualStatus === 'error' && (
          <Typography variant={'danger_small'} className={s.recaptchaMessage}>
            Please verify that you are not a robot
          </Typography>
        )}
      </div>
    )
  }
)

Recaptcha.displayName = 'Recaptcha'
