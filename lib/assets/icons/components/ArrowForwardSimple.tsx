import { forwardRef } from 'react'
import type { IconProps } from '../IconWrapper'
import { IconWrapper } from '../IconWrapper'

const ArrowIosForward = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
  const { svgProps: props, ...restProps } = allProps

  return (
    <IconWrapper
      ref={ref}
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <g clipPath="url(#arrow-ios-forward_svg__a)">
            <path
              fill="currentColor"
              d="M10 19a1 1 0 0 1-.77-1.64L13.71 12 9.39 6.63a1 1 0 0 1 .15-1.41 1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19"
            />
          </g>
          <defs>
            <clipPath id="arrow-ios-forward_svg__a">
              <path fill="currentColor" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default ArrowIosForward
