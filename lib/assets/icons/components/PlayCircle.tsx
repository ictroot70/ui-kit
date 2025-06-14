import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const PlayCircle = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g fill={'currentColor'} clipPath={'url(#play-circle_svg__a)'}>
            <path d={'m11.5 14.6 2.81-2.6-2.81-2.6z'} />
            <path
              d={
                'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m4 11.18-3.64 3.37a1.74 1.74 0 0 1-1.16.45c-.238 0-.473-.052-.69-.15a1.6 1.6 0 0 1-1-1.48V8.63a1.6 1.6 0 0 1 1-1.48 1.7 1.7 0 0 1 1.85.3L16 10.82a1.6 1.6 0 0 1 0 2.36'
              }
            />
          </g>
          <defs>
            <clipPath id={'play-circle_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default PlayCircle
