import s from "./separator.module.scss";
import { clsx } from "clsx";

type Props = { className?: string };

export const Separator = ({ className }: Props) => {
  return <hr className={clsx(s.separator, className)} />;
};
