import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './HeaderUnauthorized.module.scss';
import {Btn, SelectLanguage, Typography} from "../../atoms";

export interface HeaderProps extends ComponentPropsWithoutRef<'div'> {
    children?: ReactNode;
}

export const HeaderUnauthorized = forwardRef<ElementRef<'div'>, HeaderProps>(
    ({ children, className, ...restProps }, ref) => {
        return (
            <div
                className={clsx(styles.header, className)}
                ref={ref}
                {...restProps}
            >
                <Typography variant={'large'} >Inctagram</Typography>
                <div className={styles.wrap}>
                    <SelectLanguage options={[
                        { value: 'English', label: 'English' },
                        { value: 'Russian', label: 'Русский' },
                    ]}/>
                    <Btn variant={"secondary"}>Log in</Btn>
                    <Btn variant={"primary"}>Sign up</Btn>
                </div>
            </div>
        );
    }
);

HeaderUnauthorized.displayName = 'HeaderUnauthorized';