import { ComponentPropsWithoutRef } from 'react'

import { Indicator } from '@radix-ui/react-checkbox'
import { Checkmark } from 'assets/icons'

export const CheckboxIndicator = (props: CheckboxIndicatorProps) => {
  const { children, className, forceMount, iconSize = 18, ...rest } = props

  return (
    <Indicator className={className} forceMount {...rest}>
      {children ?? <Checkmark size={18} />}
    </Indicator>
  )
}

export interface CheckboxIndicatorProps extends ComponentPropsWithoutRef<typeof Indicator> {
  iconSize?: number
}
