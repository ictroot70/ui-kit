import { forwardRef } from 'react'
import type { IconProps } from '../IconWrapper'
import { IconWrapper } from '../IconWrapper'

const ArrowDownSimple = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath="url(#arrow-ios-down-outline_svg__a)">
            <path
              fill="currentColor"
              d="M5.514 9.458a1 1 0 0 1 1.64-.77l5.36 4.48 5.37-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.15 1.46l-6 4.83a1 1 0 0 1-1.27 0l-6-5a1 1 0 0 1-.36-.83"
            />
          </g>
          <defs>
            <clipPath id="arrow-ios-down-outline_svg__a">
              <path fill="currentColor" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default ArrowDownSimple
