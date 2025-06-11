import { CSSProperties } from 'react'

import { ToastPosition } from 'components/molecules/Toast/ToastContainer'

export const getPositionStyle = (position: ToastPosition): CSSProperties => {
  const base: CSSProperties = { position: 'fixed', zIndex: 9999 }
  const styles: Record<ToastPosition, CSSProperties> = {
    'top-left': { ...base, top: 20, left: 20 },
    'top-right': { ...base, top: 20, right: 20 },
    'bottom-left': { ...base, bottom: 20, left: 20 },
    'bottom-right': { ...base, bottom: 20, right: 20 },
    'top-center': { ...base, top: 20, left: '50%', transform: 'translateX(-50%)' },
    'bottom-center': { ...base, bottom: 20, left: '50%', transform: 'translateX(-50%)' },
  }

  return styles[position] || base
}
