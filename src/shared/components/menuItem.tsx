import React, {FC, useEffect} from 'react';
import cls from './styles/menuItem.module.scss'
import {NavLink, useLocation} from "react-router-dom";
import IconAccount from "../assets/images/icons/iconAccount";


interface T {
    path: string;
    name: string;
    icon?: React.ReactElement;
    navigateClass?: string;
    children?: any;
}

const MenuItem: FC<T> = ({path, name, icon, navigateClass, children}) => {
    const matches = useLocation()
    console.log(icon)
    return (
        <li className={cls.item + ' ' + navigateClass}>
            <NavLink
                className={({isActive}) =>
                    isActive ? cls.active : undefined
                }
                to={path}>{name}
                {children}
            </NavLink>
        </li>
    );
};

export default MenuItem;