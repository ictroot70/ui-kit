import { ComponentPropsWithoutRef} from 'react';
import {HeaderAuthorized} from "../../molecules";
import {HeaderUnauthorized} from "../../molecules/HeaderUnauthorized";


export interface HeaderProps extends ComponentPropsWithoutRef<'header'> {
    isAuthorized?: boolean;
}

export const Header = ({ isAuthorized = false, ...props }: HeaderProps) => {
    return isAuthorized ? <HeaderAuthorized {...props} /> : <HeaderUnauthorized {...props} />;
};

Header.displayName = 'Header';