import { forwardRef } from 'react'

import { IconProps, IconWrapper } from '../IconWrapper'

const ArrowBack = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
  const { svgProps: props, ...restProps } = allProps

  return (
    <IconWrapper
      ref={ref}
      icon={
        <svg
          fill={'none'}
          width={'100%'}
          height={'100%'}
          viewBox={'0 0 24 24'}
          xmlns={'http://www.w3.org/2000/svg'}
          {...props}
        >
          <path
            fill={'currentColor'}
            d={
              'M19 11H7.14l3.63-4.36a1.001 1.001 0 0 0-1.54-1.28l-5 6a1 1 0 0 0-.09.15c0 .05 0 .08-.07.13A1 1 0 0 0 4 12a1 1 0 0 0 .07.36c0 .05 0 .08.07.13q.039.078.09.15l5 6A1 1 0 0 0 10 19a1 1 0 0 0 .77-1.64L7.14 13H19a1 1 0 0 0 0-2'
            }
          />
        </svg>
      }
      {...restProps}
    />
  )
})

export default ArrowBack
ArrowBack.displayName = 'ArrowBack'
