import type { IconProps } from '../IconWrapper'

import { forwardRef } from 'react'

import { IconWrapper } from '../IconWrapper'

type BellOutlineProps = IconProps & {
  notificationCount?: number
}

const BellOutline = forwardRef<HTMLSpanElement, BellOutlineProps>((allProps, ref) => {
  const { svgProps: props, notificationCount, ...restProps } = allProps

  const badgeLabel = notificationCount !== undefined
    ? notificationCount > 99 ? '99+' : String(notificationCount)
    : null

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
          <path
            fill={'currentColor'}
            fillRule={'evenodd'}
            d={
              'm2.515 18 1.18-1.182c.378-.378.586-.88.586-1.414v-4.677c0-1.357.59-2.654 1.62-3.556a4.66 4.66 0 0 1 3.737-1.129c2.327.309 4.082 2.413 4.082 4.895v4.467c0 .534.208 1.036.585 1.413L15.485 18zM11 20.341C11 21.24 10.084 22 9 22s-2-.76-2-1.659V20h4zm6.52-3.133-1.8-1.804v-4.467c0-3.481-2.502-6.438-5.82-6.877a6.72 6.72 0 0 0-5.317 1.607 6.73 6.73 0 0 0-2.302 5.06l-.001 4.677-1.801 1.804a1.63 1.63 0 0 0-.354 1.782C.38 19.604.973 20 1.637 20H5v.341C5 22.359 6.794 24 9 24s4-1.641 4-3.659V20h3.363c.664 0 1.256-.396 1.51-1.009a1.63 1.63 0 0 0-.352-1.783'
            }
            clipRule={'evenodd'}
          />

          {badgeLabel !== null && (
            <>
              <circle cx={17.5} cy={6.5} r={6.5} fill={'#CC1439'} />
              <text
                x={17.5}
                y={6}
                textAnchor={'middle'}
                dominantBaseline={'central'}
                fill={'#fff'}
                fontSize={badgeLabel.length > 2 ? 6.5 : 10}
                fontWeight={500}
                fontFamily={'Inter, sans-serif'}
                letterSpacing={0}
              >
                {badgeLabel}
              </text>
            </>
          )}

        </svg>
      }
      {...restProps}
    />
  )
})

export default BellOutline
BellOutline.displayName = 'BellOutline'