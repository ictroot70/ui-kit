import { ComponentPropsWithoutRef } from 'react';
import s from './Button.module.css';
import clsx from 'clsx';

type Props = {
  variant?: 'primary' | 'outlined' | 'secondary';
  className?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export const Button = ({
  variant = 'primary',
  className,
  children,
  ...rest
}: Props) => {
  return (
    <button className={clsx(s.button, s[variant], className)} {...rest}>
      {children}
    </button>
  );
};