import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const CreditCard = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
  const { svgProps: props, ...restProps } = allProps

  return (
    <IconWrapper
      ref={ref}
      icon={
        <svg
          xmlns={'http://www.w3.org/2000/svg'}
          width={'100%'}
          height={'100%'}
          viewBox={'0 0 24 24'}
          fill={'none'}
          {...props}
        >
          <g clipPath={'url(#credit-card_svg__a)'}>
            <path
              fill={'currentColor'}
              d={
                'M19 5H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3m-8 10H7a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2m6 0h-2a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2m3-6H4V8a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1z'
              }
            />
          </g>
          <defs>
            <clipPath id={'credit-card_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default CreditCard
CreditCard.displayName = 'CreditCard'
