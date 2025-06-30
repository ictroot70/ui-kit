import {
  ComponentPropsWithoutRef,
  CSSProperties,
  ElementRef,
  forwardRef,
  ReactElement,
  ReactNode,
} from 'react'

import { clsx } from 'clsx'

import styles from 'components/organisms/Header/Header.module.scss'

export interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
  isAuthorized?: boolean
  logo?: ReactNode
  classNameForLogo?: string
  width?: CSSProperties['width']
  height?: CSSProperties['height']
  background?: CSSProperties['background']
}

/**
 * Renders the main application header.
 *
 * This component supports custom branding via `logo`, customizable dimensions,
 * and conditional styling based on user authorization state.
 *
 * @component
 *
 * @example
 *
 * ```tsx
 * <Header
 *   logo={<Logo />}
 *   isAuthorized={true}
 *   width="100%"
 *   height="70px"
 *   background="var(--color-dark-800)"
 * >
 *   <Nav />
 * </Header>
 * ```
 *
 * @param {HeaderProps} props - Props for the Header component
 *
 * @param {boolean} [props.isAuthorized=false] - Indicates whether the user is authorized; used for styling/debugging via data attribute
 *
 * @param {ReactNode} [props.logo] - A logo or branding element to be rendered inside the header
 *
 * @param {string} [props.classNameForLogo] - Optional custom class for the logo wrapper
 *
 * @param {CSSProperties['width']} [props.width='100%'] - CSS width for the header
 *
 * @param {CSSProperties['height']} [props.height='60px'] - CSS height for the header
 *
 * @param {CSSProperties['background']} [props.background='var(--color-dark-700)'] - Background of the header
 *
 * @param {string} [props.className] - Additional class for the header container
 *
 * @param {React.ReactNode} props.children - Any child elements (e.g., nav buttons, language selector)
 *
 * @param {React.Ref<HTMLHeadElement>} ref - Optional forwarded ref to the `<header>` element
 *
 *
 * @returns {ReactElement} A styled header element with optional logo and content
 *
 */

export const Header = forwardRef<ElementRef<'header'>, HeaderProps>((props, ref): ReactElement => {
  const {
    isAuthorized = false,
    width = '100%',
    height = '60px',
    logo,
    background = 'var(--color-dark-700)',
    className,
    children,
    classNameForLogo,
    ...restProps
  } = props

  return (
    <header
      data-is-authorized={isAuthorized}
      className={clsx(styles.header, className)}
      style={{ width, height, background }}
      ref={ref}
      {...restProps}
    >
      <div className={clsx(styles.logo, classNameForLogo)}>{logo}</div>
      {children}
    </header>
  )
})

Header.displayName = 'Header'
