import React, {FC} from 'react';
import Paper from "@mui/material/Paper";
import {Divider, Stack, useMediaQuery} from "@mui/material";
import Button from "@mui/material/Button";
import NickName from "../../shared/components/nickName";

interface IType {
    children?: any
}

const User: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    return (
        <Paper>
            <Stack
                direction={mediaQuery ? "row" : "column"}
                alignItems={mediaQuery ? "center" : "flex-start"}
                justifyContent="space-between"
                spacing={7}>
                <Stack direction="row" alignItems="center" spacing={7}>
                    <NickName name="Иванов Иван Иванович" number="@ryabishin" direction="row-reverse"/>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={7}>
                    <Stack alignItems="center" textAlign="center" spacing={2}>
                        <span className="subHeaders white-90">Приглашенные</span>
                        <span className="subHeadersBold">18</span>
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack alignItems="center" textAlign="center" spacing={2}>
                        <span className="subHeaders white-90">Самозанятость</span>
                        <span className="subHeadersBold green">Подтверждено</span>
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack alignItems="center" textAlign="center" spacing={2}>
                        <span className="subHeaders white-90">Дата регистрации</span>
                        <span className="subHeadersBold">19.03.2021</span>
                    </Stack>
                </Stack>
                <Button color="neutral" sx={!mediaQuery ? {position: 'absolute', right: 24, top: 3,}: undefined}>Подробнее</Button>
            </Stack>
        </Paper>
    );
};

export default User;
