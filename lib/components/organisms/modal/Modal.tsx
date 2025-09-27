import { ComponentPropsWithoutRef, CSSProperties } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import SvgClose from 'assets/icons/components/Close'
import { clsx } from 'clsx'
import { Separator, Typography } from 'components/atoms'

import s from './Modal.module.scss'

export type ModalProps = {
  open: boolean
  onClose: () => void
  modalTitle?: string
  width?: string | number
  height?: string | number
} & ComponentPropsWithoutRef<typeof Dialog.Content>

/**
 * `Modal` is a customizable and accessible dialog component built on top of `@radix-ui/react-dialog`.
 * It provides a styled modal window with a header, title, close button, separator, and content area.
 *
 * ## Features:
 * - Accessible modal dialog with focus trapping and ARIA attributes
 * - Customizable title rendered with the `Typography` component
 * - Integrated close button with custom SVG icon
 * - Styled overlay and separator between header and content
 * - Accepts any React nodes as children for flexible modal content
 * - Customizable width and height through props
 *
 * ## Examples:
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   modalTitle="Email sent"
 *   onClose={() => setOpen(false)}
 *   width="500px"
 *   height="400px"
 * >
 *   <p>Content goes here...</p>
 * </Modal>
 * ```
 *
 * @param props - Modal props
 * @param props.open - Controls whether the modal is open
 * @param props.onClose - Function to be called when the modal is dismissed
 * @param props.modalTitle - String displayed as the modal header/title
 * @param props.width - Width of the modal (CSS value as string or number in pixels)
 * @param props.height - Height of the modal (CSS value as string or number in pixels)
 * @param props.children - Content to render within the modal body
 * @param props.className - Additional class name(s) for the modal content container
 * @returns Accessible, styled modal dialog with header, close button, and custom content area
 */

export const Modal = ({
  modalTitle,
  onClose,
  open,
  children,
  className,
  width,
  height,
  style,
  ...rest
}: ModalProps) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose()
    }
  }

  const modalStyle: CSSProperties = {
    ...style,
    ...(width && { width: typeof width === 'number' ? `${width}px` : width }),
    ...(height && { height: typeof height === 'number' ? `${height}px` : height }),
  }

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content  className={clsx(s.content, className)} style={modalStyle} {...rest}>
          <div className={s.header}>
            {modalTitle && (
              <Dialog.Title className={s.title}>
                <Typography variant={'h1'} color={'light'}>
                  {modalTitle}
                </Typography>
              </Dialog.Title>
            )}
            <Dialog.Close asChild>
              <button type={'button'} className={s.iconButton} aria-label={'Close'}>
                <SvgClose svgProps={{ width: 24, height: 24 }} />
              </button>
            </Dialog.Close>
          </div>
          <Separator />
          <Dialog.Description asChild>
            <VisuallyHidden>
              {modalTitle ? `Dialog box: ${modalTitle}` : 'Dialog box'}
            </VisuallyHidden>
          </Dialog.Description>
          <div className={s.body}>{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
Modal.displayName = 'Modal'
