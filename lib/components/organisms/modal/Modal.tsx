import * as Dialog from "@radix-ui/react-dialog";
import clsx from "clsx";
import s from "./Modal.module.scss";
import { ComponentPropsWithoutRef } from "react";
import SvgClose from "assets/icons/components/Close";
import { Typography } from '../../atoms'
import { Separator } from '../../atoms/Separator/Separator'

type Props = {
  open: boolean;
  onClose: () => void;
  modalTitle?: string;
} & ComponentPropsWithoutRef<typeof Dialog.Content>;

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
 *
 * ## Examples:
 * ```tsx
 * <Modal
 *   open={isOpen}
 *   modalTitle="Email sent"
 *   onClose={() => setOpen(false)}
 * >
 *   <p>Content goes here...</p>
 * </Modal>
 * ```
 *
 * @param props - Modal props
 * @param props.open - Controls whether the modal is open
 * @param props.onClose - Function to be called when the modal is dismissed
 * @param props.modalTitle - String displayed as the modal header/title
 * @param props.children - Content to render within the modal body
 * @param props.className - Additional class name(s) for the modal content container
 * @returns Accessible, styled modal dialog with header, close button, and custom content area
 */

export const Modal = ({ modalTitle, onClose, open, children, className, ...rest }: Props) => {
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      onClose();
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.overlay} />
        <Dialog.Content className={clsx(s.content, className)} {...rest}>
          <div className={s.header}>
            {modalTitle && (
            <Dialog.Title className={s.title}>
              <Typography variant={"h1"} color={"light"}>
                {modalTitle}
              </Typography>
            </Dialog.Title>
              )}
            <Dialog.Close asChild>
              <button className={s.iconButton} aria-label="Close">
                <SvgClose svgProps={{ width: 24, height: 24 }} />
              </button>
            </Dialog.Close>
          </div>
          <Separator />
          <div className={s.body}>
            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};