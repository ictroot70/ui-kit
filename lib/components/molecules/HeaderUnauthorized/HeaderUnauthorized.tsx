import { ComponentPropsWithoutRef, ElementRef, forwardRef, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './HeaderUnauthorized.module.scss';
import {Button, Typography} from "../../atoms";
import {UkFlag} from "../../../assets/icons";
import RussiaFlag from "../../../assets/icons/components/RussiaFlag";
import {Select} from "../Select-box";

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
                    <Select
                        items={[
                            { value: 'en', label: 'English', icon: <UkFlag/> },
                            { value: 'ru', label: 'Русский', icon: <RussiaFlag/> },
                        ]}
                        defaultValue={'en'}
                        onValueChange={(value) => console.log('Selected language:', value)}
                        className={styles.select}
                    />
                    <Button variant={"text"} >Log in</Button>
                    <Button variant={"primary"}>Sign up</Button>
                </div>
            </div>
        );
    }
);

HeaderUnauthorized.displayName = 'HeaderUnauthorized';