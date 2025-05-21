import { memo, forwardRef, CSSProperties, HTMLAttributes, ReactNode, SVGProps } from 'react'

export type IconProps = {
  autoSize?: boolean
  backgroundColor?: string
  color?: string
  size?: number
  svgProps?: SVGProps<SVGSVGElement>
} & Omit<HTMLAttributes<HTMLSpanElement>, 'color' | 'size'>

export const IconWrapper = memo(
  forwardRef<HTMLSpanElement, { icon: ReactNode } & IconProps>(
    (
      {
        autoSize,
        backgroundColor = 'transparent',
        color: colorProp,
        icon,
        size: sizeProp,
        ...restProps
      },
      ref
    ) => {
      const color = colorProp ? colorProp : 'currentColor'
      const size = sizeProp ? `${sizeProp}px` : '24px'

      return (
        <span
          ref={ref}
          aria-hidden="true"
          role="img"
          style={
            {
              backgroundColor,
              color,
              display: 'inline-flex',
              fontSize: 'inherit',
              height: size,
              width: size,
            } as CSSProperties
          }
          {...restProps}
        >
          {icon}
        </span>
      )
    }
  )
)
