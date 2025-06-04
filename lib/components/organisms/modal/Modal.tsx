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
  modalTitle: string;
} & ComponentPropsWithoutRef<"div">;

export const Modal = ({ modalTitle, onClose, open, children, className, ...rest }: Props) => (
  <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
    <Dialog.Portal>
      <Dialog.Overlay className={s.overlay} />
      <Dialog.Content className={clsx(s.content, className)}>
        <div className={s.header}>
          <Dialog.Title className={s.title}>
            <Typography variant={"h1"} color={"light"}>
              {modalTitle}
            </Typography>
          </Dialog.Title>
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