import { forwardRef } from 'react'

import { IconProps, IconWrapper } from '../IconWrapper'

const ArrowForward = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath={'url(#arrow-forward-outline_svg__a)'}>
            <path
              fill={'currentColor'}
              d={
                'M5 13h11.86l-3.63 4.36a1 1 0 1 0 1.54 1.28l5-6q.051-.072.09-.15c0-.05.05-.08.07-.13A1 1 0 0 0 20 12a1 1 0 0 0-.07-.36c0-.05-.05-.08-.07-.13a1 1 0 0 0-.09-.15l-5-6a1 1 0 0 0-1.41-.13 1 1 0 0 0-.13 1.41L16.86 11H5a1 1 0 0 0 0 2'
              }
            />
          </g>
          <defs>
            <clipPath id={'arrow-forward-outline_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default ArrowForward
