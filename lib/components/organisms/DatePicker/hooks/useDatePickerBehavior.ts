import React, { useState, useCallback } from 'react'

export const useDatePickerBehavior = (disabled: boolean) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      if (disabled) {
        return
      }
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault()
        setIsOpen(prev => !prev)
      }
    },
    [disabled]
  )

  return {
    isOpen,
    setIsOpen,
    handleKeyDown,
  }
}
