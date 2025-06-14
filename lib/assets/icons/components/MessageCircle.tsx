import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const MessageCircle = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath={'url(#message-circle_svg__a)'}>
            <path
              fill={'currentColor'}
              d={
                'M19.07 4.93a10 10 0 0 0-16.28 11c.096.199.127.422.09.64L2 20.8a1 1 0 0 0 .605 1.13q.19.075.395.07h.2l4.28-.86a1.26 1.26 0 0 1 .64.09 10 10 0 0 0 11-16.28zM8 13a1 1 0 1 1 0-2.001A1 1 0 0 1 8 13m4 0a1 1 0 1 1 0-2.002A1 1 0 0 1 12 13m4 0a1 1 0 1 1 0-2.002A1 1 0 0 1 16 13'
              }
            />
          </g>
          <defs>
            <clipPath id={'message-circle_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default MessageCircle
