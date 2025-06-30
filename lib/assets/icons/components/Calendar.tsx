import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const Calendar = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath={'url(#calendar_svg__a)'}>
            <path
              fill={'currentColor'}
              d={
                'M18 4h-1V3a1 1 0 0 0-2 0v1H9V3a1 1 0 0 0-2 0v1H6a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3M8 17a1 1 0 1 1 0-2 1 1 0 0 1 0 2m8 0h-4a1 1 0 0 1 0-2h4a1 1 0 0 1 0 2m3-6H5V7a1 1 0 0 1 1-1h1v1a1 1 0 0 0 2 0V6h6v1a1 1 0 0 0 2 0V6h1a1 1 0 0 1 1 1z'
              }
            />
          </g>
          <defs>
            <clipPath id={'calendar_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default Calendar
Calendar.displayName = 'Calendar'
