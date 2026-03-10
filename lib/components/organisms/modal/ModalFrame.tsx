import { ComponentPropsWithoutRef, ReactNode, forwardRef } from 'react'

import Close from 'assets/icons/components/Close'
import { clsx } from 'clsx'
import { Separator, Typography } from 'components/atoms'

import s from './Modal.module.scss'

type BaseProps = {
  children: ReactNode
  closeBtnOutside?: boolean
  headerCloseSlot?: ReactNode
  modalTitle?: string
  outsideCloseSlot?: ReactNode
  titleSlot?: ReactNode
}

export type ModalFrameProps = BaseProps & Omit<ComponentPropsWithoutRef<'div'>, 'children'>

export const ModalFrame = forwardRef<HTMLDivElement, ModalFrameProps>(
  (
    {
      modalTitle,
      children,
      className,
      closeBtnOutside,
      headerCloseSlot,
      outsideCloseSlot,
      titleSlot,
      ...rest
    },
    ref
  ) => {
    const hasTitle = Boolean(modalTitle)
    const shouldRemovePadding = closeBtnOutside || !hasTitle

    return (
      <div ref={ref} className={clsx(s.content, className)} {...rest}>
        {hasTitle ? (
          <>
            <div className={s.header}>
              {titleSlot ?? <DefaultTitle title={modalTitle!} />}
              {headerCloseSlot ?? <DecorativeHeaderClose />}
            </div>
            <Separator />
          </>
        ) : (
          titleSlot
        )}

        {!hasTitle && closeBtnOutside && (outsideCloseSlot ?? <DecorativeOutsideClose />)}

        <div className={clsx(s.body, shouldRemovePadding && s['body--withoutPadding'])}>
          {children}
        </div>
      </div>
    )
  }
)

ModalFrame.displayName = 'ModalFrame'

const DefaultTitle = ({ title }: { title: string }) => {
  return (
    <Typography className={s.title} variant={'h1'} color={'light'}>
      {title}
    </Typography>
  )
}

const DecorativeHeaderClose = () => {
  return (
    <span aria-hidden className={s.iconButton}>
      <Close svgProps={{ width: 24, height: 24 }} />
    </span>
  )
}

const DecorativeOutsideClose = () => {
  return (
    <span aria-hidden className={clsx(s.outsideCloseButton, s.closeBtn)}>
      <Close svgProps={{ width: 24, height: 24 }} />
    </span>
  )
}
