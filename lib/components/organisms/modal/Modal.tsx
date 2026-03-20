import { ComponentPropsWithoutRef, ReactNode } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import Close from 'assets/icons/components/Close'
import { clsx } from 'clsx'
import { Typography } from 'components/atoms'

import s from './Modal.module.scss'
import { ModalFrame } from './ModalFrame'

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

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} data-ui-kit-modal-overlay />
        <Dialog.Content aria-describedby={undefined} asChild {...rest}>
          <ModalFrame
            data-ui-kit-modal-content
            className={className}
            closeBtnOutside={closeBtnOutside}
            modalTitle={modalTitle}
            titleSlot={
              modalTitle ? (
                <Dialog.Title asChild>
                  <Typography className={s.title} variant={'h1'} color={'light'}>
                    {modalTitle}
                  </Typography>
                </Dialog.Title>
              ) : (
                <Dialog.Title className={'visually-hidden'} hidden>
                  <VisuallyHidden>Modal</VisuallyHidden>
                </Dialog.Title>
              )
            }
            headerCloseSlot={
              <Dialog.Close aria-label={'Close'} className={s.iconButton}>
                <Close svgProps={{ width: 24, height: 24 }} />
              </Dialog.Close>
            }
            outsideCloseSlot={
              <Dialog.Close className={clsx(s.outsideCloseButton, s.closeBtn)}>
                <Close svgProps={{ width: 24, height: 24 }} />
              </Dialog.Close>
            }
          >
            {children}
          </ModalFrame>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

Modal.displayName = 'Modal'
