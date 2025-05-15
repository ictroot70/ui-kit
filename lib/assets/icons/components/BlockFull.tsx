import { forwardRef } from 'react'
import type { IconProps } from '../IconWrapper'
import { IconWrapper } from '../IconWrapper'

const BlockFull = forwardRef<HTMLSpanElement, IconProps>((allProps, ref) => {
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
          <g clipPath="url(#block-full_svg__a)">
            <path
              fill="currentColor"
              d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20m0 18a8 8 0 1 1 0-16.001A8 8 0 0 1 12 20"
            />
            <path stroke="currentColor" strokeWidth={2.3} d="m7.043 19.362 10-15" />
          </g>
          <defs>
            <clipPath id="block-full_svg__a">
              <path fill="currentColor" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
})

export default BlockFull
