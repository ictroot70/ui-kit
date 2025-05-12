import type { IconProps } from '../IconWrapper'
import { IconWrapper } from '../IconWrapper'

const Expand = (allProps: IconProps) => {
  const { svgProps: props, ...restProps } = allProps

  return (
    <IconWrapper
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          viewBox="0 0 24 24"
          fill="none"
          {...props}
        >
          <g fill="currentColor" clipPath="url(#expand_svg__a)">
            <path d="M20 5a1 1 0 0 0-1-1h-5a1 1 0 1 0 0 2h2.57l-3.28 3.29a1 1 0 0 0 .325 1.639 1 1 0 0 0 1.095-.219L18 7.42V10a1 1 0 0 0 2 0zM10.71 13.29a1 1 0 0 0-1.42 0L6 16.57V14a1 1 0 1 0-2 0v5a1 1 0 0 0 1 1h5a1 1 0 0 0 0-2H7.42l3.29-3.29a1 1 0 0 0 0-1.42" />
          </g>
          <defs>
            <clipPath id="expand_svg__a">
              <path fill="currentColor" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </svg>
      }
      {...restProps}
    />
  )
}

export default Expand
