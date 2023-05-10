import React, {FC} from 'react';
import NickName from "../../shared/components/nickName";
import Paper from "@mui/material/Paper";
import {Avatar, Divider, Stack, useMediaQuery} from "@mui/material";
import {NavLink} from "react-router-dom";


interface IType {
    name: string;
    link: string;
    avatar?: string;
    registrationDate?: string;
    lastPayment?: string;
}

const Referrals: FC<IType> = ({name, link, avatar, registrationDate, lastPayment}) => {
    const mediaQuery = useMediaQuery('(min-width:900px)');
    return (
        <Paper>
            <Stack direction={mediaQuery ? "row": "column"} alignItems={mediaQuery ? "center": "flex-start"} justifyContent="space-between" spacing={7}>
                <Stack direction="row" alignItems="center" spacing={7}>
                    <Avatar
                        alt={name}
                        src={avatar}
                        sx={{width: 34, height: 34}}
                    />
                    <Stack spacing={2}>
                        <NavLink className="subHeaders link" to={`https://t.me/${link}`} target="_blank">{link}</NavLink>
                        <span className="subHeadersBold">{name}</span>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={7} justifyContent="space-around" sx={{width:mediaQuery ? 'unset':`100%`}}>
                    <Stack alignItems="center">
                        <span className="subHeaders white-90">Последняя оплата</span>
                        <span className="subHeadersBold white-100">{lastPayment ? lastPayment: '---'}</span>
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack alignItems="center">
                        <span className="subHeaders white-90">Дата регистрации</span>
                        <span className="subHeadersBold white-100">{registrationDate}</span>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default Referrals;