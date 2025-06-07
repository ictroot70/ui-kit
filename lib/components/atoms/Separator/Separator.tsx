import s from "./Separator.module.scss";
import { clsx } from "clsx";

export type SeparatorProps = { className?: string };

export const Separator = ({ className }: SeparatorProps) => {
  return <hr className={clsx(s.separator, className)} />;
};
