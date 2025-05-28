import {
    ComponentPropsWithoutRef,
    ElementRef,
    forwardRef,
    ReactNode,
} from 'react';
import clsx from 'clsx';

import styles from './Btn.module.scss';
import {Typography} from "../Typography";

export interface BtnProps extends ComponentPropsWithoutRef<'button'> {
    children?: ReactNode;
    variant?: 'primary' | 'secondary';
}

export const Btn = forwardRef<ElementRef<'button'>, BtnProps>(
    ({ children, className, variant = 'primary', ...restProps }, ref) => {
        return (
            <button
                className={clsx(styles.btn, styles[variant], className)}
                ref={ref}
                {...restProps}
            >
                <Typography variant={'regular_16'}>{children}</Typography>
            </button>
        );
    }
);

Btn.displayName = 'Btn';
