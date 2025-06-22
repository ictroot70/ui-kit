import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './HeaderAuthorized.module.scss';
import {Typography} from "../../atoms";
import {Select} from "../Select-box";
import {UkFlag} from "../../../assets/icons";
import RussiaFlag from "../../../assets/icons/components/RussiaFlag";
import BellOutline from "../../../assets/icons/components/BellOutline";

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
                    <BellOutline size={24}/>
                    <Select
                        items={[
                            { value: 'en', label: 'English', icon: <UkFlag/> },
                            { value: 'ru', label: 'Русский', icon: <RussiaFlag/> },
                        ]}
                        defaultValue={'en'}
                        onValueChange={(value) => console.log('Selected language:', value)}
                        style={{ width: '10rem' }}
                    />
                </div>
            </div>
        );
    }
);

HeaderAuthorized.displayName = 'HeaderAuthorized';