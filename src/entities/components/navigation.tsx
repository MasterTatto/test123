import React, {FC, useEffect, useState} from "react";
import IconAccount from "../../shared/assets/images/icons/iconAccount";
import {NavLink, useLocation} from "react-router-dom";
import IconCopyTrading from "../../shared/assets/images/icons/iconCopyTrading";
import IconPartner from "../../shared/assets/images/icons/iconPartner";
import IconSettings from "../../shared/assets/images/icons/iconSettings";
import IconSupport from "../../shared/assets/images/icons/iconSupport";
import IconProducts from "../../shared/assets/images/icons/iconProducts";
import {useMediaQuery} from "@mui/material";


export const menuUserData = [
    {path: "/", name: 'Мои счета', navigateClass: 'navigationGreen', icon: IconAccount},
    {path: "/copy-trading", name: 'Копитрейдинг', navigateClass: 'navigationPurple', icon: IconCopyTrading},
    {path: "/partner", name: 'Партнерская программа', navigateClass: 'navigationRed', icon: IconPartner},
    {path: "/settings", name: 'Настройки', navigateClass: 'navigationWhite', icon: IconSettings},
    {path: "/support", name: 'Тех. поддержка', navigateClass: 'supportMenuItem support', icon: IconSupport},
]
export const menuAdminData = [
    {path: "/admin/users", name: 'Пользователи', navigateClass: 'navigationWhite', },
    {path: "/admin/forex", name: 'Forex счета', navigateClass: 'navigationWhite', },
    {path: "/admin/bank-requisites", name: 'Банковские реквизиты', navigateClass: 'navigationWhite', },
    {path: "/admin/transaction", name: 'Вывод', navigateClass: 'navigationWhite', },
    {path: "/admin/sets", name: 'Сеты', navigateClass: 'navigationWhite', },
    {path: "/admin/traders", name: 'Трейдеры', navigateClass: 'navigationWhite', },
    {path: "/admin/broker-servers", name: 'Сервера брокера', navigateClass: 'navigationWhite', },
]
interface IMenuData{
    path: string;
    name:string;
    navigateClass: string;
    icon?: any;
}
interface IType {
    isAdmin?: boolean;
}
const Navigation: FC<IType> = ({isAdmin}) => {
    const location = useLocation()
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const [menuData,setMenuData] = useState<IMenuData[]>()
    useEffect(()=>{
        if(isAdmin){
            setMenuData(menuAdminData)
        }else{
            setMenuData(menuUserData)
        }
    },[menuData])
    return (
        <ul className={isAdmin ?"menuList" : "menuList menuUserList"}>
            {
                !isAdmin &&
                <>
                    <li className={`menuItem menuItemProduct active navigationYellow`}>
                        <NavLink to="/tariff" className="active">
                            Продукты
                            <IconProducts active={true}/>
                        </NavLink>
                    </li>
                    <li className="h1">
                        Библиотека
                    </li>
                </>
            }

            {
                menuData && menuData.map(item =>
                    <li key={item?.path} className={
                        location.pathname === item.path ?
                            "menuItem" + ' ' + item.navigateClass
                            : "menuItem"
                    }>
                        <NavLink
                            className={({isActive}) =>
                                isActive ? "active" : undefined
                            }
                            to={item.path}>
                            {item.name}
                            {item.icon && <item.icon active={location.pathname === item.path}/>}
                        </NavLink>
                    </li>
                )
            }
        </ul>
    );
};

export default Navigation;