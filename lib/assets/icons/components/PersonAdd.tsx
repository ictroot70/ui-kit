import { forwardRef } from 'react'
import type { IconProps } from '../IconWrapper'
import { IconWrapper } from '../IconWrapper'

const PersonAdd = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g fill="currentColor" clipPath="url(#person-add_svg__a)">
            <path d="M21 6h-1V5a1 1 0 0 0-2 0v1h-1a1 1 0 1 0 0 2h1v1a1 1 0 0 0 2 0V8h1a1 1 0 1 0 0-2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M16 21a1 1 0 0 0 1-1 7 7 0 1 0-14 0 1 1 0 0 0 1 1" />
          </g>
          <defs>
            <clipPath id="person-add_svg__a">
              <path fill="currentColor" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default PersonAdd
