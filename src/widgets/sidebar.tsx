import React, {FC, useEffect, useState} from 'react';
import Navigation from "../entities/components/navigation";
import HeaderSidebar from "../entities/components/headerSidebar";
import {IconButton, Stack, useMediaQuery} from "@mui/material";
import IconMenu from "../shared/assets/images/icons/iconMenu";
import logo from '../shared/assets/images/logo.svg'


const style = {
    maxWidth: 300,
    width: `100%`,
    padding: `0 10px`,
    borderRight: `4px solid #1F1F1F;`,
    position: 'fixed',
    top: 28
}
const styleMediaQuery = {
    height: `100vh`,
    maxWidth: 'unset',
    padding: `0 10px`,
    width: `100%`,
    zIndex: 10,
    top: `65px`,
    left: 0,
    background: `#212121`,
    position: 'fixed'
}

interface T {
    isAdmin?: boolean;
}

const Sidebar: FC<T> = ({isAdmin}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [visibleMenu, setVisibleMenu] = useState(true)
    useEffect(() => {
        if (!mediaQuery) {
            setVisibleMenu(false)
        } else {
            setVisibleMenu(true)
        }
    }, [mediaQuery])

    const handleMenu = () => {
        setVisibleMenu(!visibleMenu)
    }

    return (
        <>
            <Stack>
                <Stack>
                    {
                        !mediaQuery ?
                            <Stack direction="row" alignItems="center" justifyContent="space-between"
                                   sx={{ml: -5, mr: -5, height: `65px`, padding: `14px 28px`, background: `#212121`}}>
                                <IconButton onClick={handleMenu}>
                                    <IconMenu active={visibleMenu}/>
                                </IconButton>
                                <img src={logo} alt="logo"/>
                            </Stack>
                            : null
                    }
                    {
                        visibleMenu ?
                            <Stack sx={!mediaQuery ? styleMediaQuery : style}>
                                <Stack spacing={7}>
                                    <Stack spacing={7}>
                                        <HeaderSidebar isAdmin={isAdmin} name="Remy Sharp" images="" account="2"
                                                       balance="10 000 000"/>
                                    </Stack>
                                    <Navigation isAdmin={isAdmin}/>
                                </Stack>
                            </Stack>
                            : null
                    }
                </Stack>
            </Stack>
        </>
    );
};

export default Sidebar;
