import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const Layers = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g fill={'currentColor'} clipPath={'url(#layers_svg__a)'}>
            <path
              d={
                'm3.24 7.29 8.52 4.63a.51.51 0 0 0 .48 0l8.52-4.63a.44.44 0 0 0-.05-.81L12.19 3a.5.5 0 0 0-.38 0L3.29 6.48a.44.44 0 0 0-.05.81'
              }
            />
            <path
              d={
                'm20.71 10.66-1.83-.78-6.64 3.61a.51.51 0 0 1-.48 0L5.12 9.88l-1.83.78a.48.48 0 0 0 0 .85l8.52 4.9a.46.46 0 0 0 .48 0l8.52-4.9a.48.48 0 0 0-.1-.85'
              }
            />
            <path
              d={
                'm20.71 15.1-1.56-.68-6.91 3.76a.51.51 0 0 1-.48 0l-6.91-3.76-1.56.68a.49.49 0 0 0 0 .87l8.52 5a.51.51 0 0 0 .48 0l8.52-5a.49.49 0 0 0-.1-.87'
              }
            />
          </g>
          <defs>
            <clipPath id={'layers_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default Layers
