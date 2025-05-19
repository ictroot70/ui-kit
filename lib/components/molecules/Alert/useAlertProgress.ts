import { useEffect, useState } from 'react'

export const useProgressBar = (duration: number, enabled: boolean) => {
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (!enabled || duration === 0) return

    const start = Date.now()
    const interval = setInterval(() => {
      const elapsed = Date.now() - start
      const percent = Math.max(100 - (elapsed / duration) * 100, 0)
      setProgress(percent)
      if (percent <= 0) clearInterval(interval)
    }, 100)

    return () => clearInterval(interval)
  }, [duration, enabled])

  return progress
}
