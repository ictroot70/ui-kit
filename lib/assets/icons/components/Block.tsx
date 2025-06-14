import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const Block = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath={'url(#block_svg__a)'}>
            <path
              fill={'currentColor'}
              d={'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20'}
            />
            <path
              stroke={'currentColor'}
              strokeDasharray={'6 6'}
              strokeLinecap={'round'}
              strokeWidth={2.3}
              d={'m7.681 18.405 8.724-13.086'}
            />
          </g>
          <defs>
            <clipPath id={'block_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default Block
