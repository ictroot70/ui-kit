import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Close from 'assets/icons/components/Close'
import { clsx } from 'clsx'
import { Separator, Typography } from 'components/atoms'

import s from './Modal.module.scss'

type BaseProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
} & ComponentPropsWithoutRef<typeof Dialog.Content>

type ModalWithTitle = BaseProps & { modalTitle: string; closeBtnOutside?: never }
type ModalWithOutsideClose = BaseProps & { modalTitle?: never; closeBtnOutside: true }
type ModalSimple = BaseProps & { modalTitle?: never; closeBtnOutside?: never }

export type ModalProps = ModalWithTitle | ModalWithOutsideClose | ModalSimple

export const Modal = ({
  modalTitle,
  onClose,
  open,
  children,
  className,
  closeBtnOutside,
  ...rest
}: ModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose()
    }
  }
  const shouldRemovePadding = closeBtnOutside || !modalTitle

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content
          aria-describedby={undefined}
          className={clsx(s.content, className)}
          {...rest}
        >
          {modalTitle ? (
            <Header title={modalTitle} />
          ) : (
            <Dialog.Title className={'visually-hidden'} hidden>
              <VisuallyHidden>Modal</VisuallyHidden>
            </Dialog.Title>
          )}

          {!modalTitle && closeBtnOutside && (
            <Dialog.Close className={clsx(s.outsideCloseButton, s.closeBtn)}>
              <Close svgProps={{ width: 24, height: 24 }} />
            </Dialog.Close>
          )}

          <div className={clsx(s.body, shouldRemovePadding && s['body--withoutPadding'])}>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Modal.displayName = 'Modal'

const Header = ({ title }: { title: string }) => {
  return (
    <>
      <div className={s.header}>
        <Dialog.Title className={s.title}>
          <Typography variant={'h1'} color={'light'}>
            {title}
          </Typography>
        </Dialog.Title>
        <Dialog.Close aria-label={'Close'} className={s.iconButton}>
          <Close svgProps={{ width: 24, height: 24 }} />
        </Dialog.Close>
      </div>
      <Separator />
    </>
  )
}
