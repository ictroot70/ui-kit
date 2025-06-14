import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const Facebook = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath={'url(#facebook_svg__a)'}>
            <path fill={'#fff'} d={'M8 4h13v20H8z'} />
            <path
              fill={'#475993'}
              d={
                'M20.766 0H3.234A3.234 3.234 0 0 0 0 3.234v17.532A3.234 3.234 0 0 0 3.234 24h8.647l.014-8.576H9.667a.526.526 0 0 1-.525-.524l-.011-2.765a.526.526 0 0 1 .526-.527h2.224V8.937c0-3.1 1.893-4.788 4.658-4.788h2.27c.29 0 .525.235.525.525v2.331c0 .29-.235.526-.525.526h-1.393c-1.504 0-1.795.715-1.795 1.764v2.313h3.305c.315 0 .559.275.522.587l-.328 2.765a.526.526 0 0 1-.522.464h-2.962L15.62 24h5.145A3.234 3.234 0 0 0 24 20.766V3.234A3.234 3.234 0 0 0 20.766 0'
              }
            />
          </g>
          <defs>
            <clipPath id={'facebook_svg__a'}>
              <path fill={'#fff'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default Facebook
