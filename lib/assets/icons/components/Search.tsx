import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

const Search = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath={'url(#search_svg__a)'}>
            <path
              fill={'currentColor'}
              d={
                'm20.71 19.29-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8 7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1.002 1.002 0 0 0 1.639-.325 1 1 0 0 0-.219-1.095M5 11a6 6 0 1 1 12 0 6 6 0 0 1-12 0'
              }
            />
          </g>
          <defs>
            <clipPath id={'search_svg__a'}>
              <path fill={'currentColor'} d={'M0 0h24v24H0z'} />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default Search
