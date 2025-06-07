import { useEffect, useState } from 'react'

interface UseRecaptchaLoadGuardOptions {
  timeout?: number
}

export const useRecaptchaLoadGuard = ({ timeout = 8000 }: UseRecaptchaLoadGuardOptions = {}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasTimedOut, setHasTimedOut] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isLoaded) {
        setHasTimedOut(true)
        console.error('Recaptcha failed to load.')
      }
    }, timeout)

    return () => clearTimeout(timer)
  }, [isLoaded, timeout])

  return {
    isLoaded,
    hasTimedOut,
    markAsLoaded: () => setIsLoaded(true),
  }
}
