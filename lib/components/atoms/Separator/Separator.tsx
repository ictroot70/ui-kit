import { clsx } from 'clsx'

import s from './Separator.module.scss'

export type SeparatorProps = { className?: string }

export const Separator = ({ className }: SeparatorProps) => {
  return <hr className={clsx(s.separator, className)} />
}
