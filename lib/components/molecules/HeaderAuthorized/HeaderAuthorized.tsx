import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './HeaderAuthorized.module.scss';
import {SelectLanguage, Typography} from "../../atoms";
import {BellOutline} from "../../../assets/icons";

export interface HeaderProps extends ComponentPropsWithoutRef<'div'> {
    children?: ReactNode;
}

export const HeaderAuthorized = forwardRef<ElementRef<'div'>, HeaderProps>(
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
                    <BellOutline/>
                </div>
            </div>
        );
    }
);

HeaderAuthorized.displayName = 'HeaderAuthorized';