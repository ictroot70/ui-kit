type RecaptchaHandlers = {
  handleOnChange: (token: string | null) => void
  handleOnExpired: () => void
}
type Props = {
  setSuccess: () => void
  setExpired: () => void
  onChange?: (token: string | null) => void
  onExpired?: () => void
}
/**
 * The `useRecaptchaHandlers` hook returns standardized event handlers for Google reCAPTCHA.
 * It wraps the success and expiration logic together with optional user-provided callbacks.
 *
 * @param {Object} props - Configuration object for the reCAPTCHA handlers.
 * @param {() => void} props.setSuccess - Function to call when a reCAPTCHA token is successfully received.
 * @param {() => void} props.setExpired - Function to call when the reCAPTCHA token expires.
 * @param {(token: string | null) => void} [props.onChange] - Optional callback invoked when the token changes.
 * @param {() => void} [props.onExpired] - Optional callback invoked when the token expires.
 *
 * @returns {{ handleOnChange: (token: string | null) => void, handleOnExpired: () => void }}
 * An object containing two handlers:
 * - `handleOnChange`: Called when a reCAPTCHA token is successfully generated.
 * - `handleOnExpired`: Called when the reCAPTCHA token has expired.
 *
 * @example
 * const { handleOnChange, handleOnExpired } = useRecaptchaHandlers({
 *   setSuccess: () => setIsVerified(true),
 *   setExpired: () => setIsVerified(false),
 *   onChange: (token) => console.log('Token received:', token),
 *   onExpired: () => console.log('Token expired')
 * });
 */

export const useRecaptchaHandlers = (props: Props): RecaptchaHandlers => {
  const { setSuccess, setExpired, onChange, onExpired } = props
  const handleOnChange = (token: string | null) => {
    setSuccess()
    onChange?.(token)
  }

  const handleOnExpired = () => {
    setExpired()
    onExpired?.()
  }

  return { handleOnChange, handleOnExpired }
}
