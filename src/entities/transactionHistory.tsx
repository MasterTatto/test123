import React, {FC} from 'react';
import Paper from "@mui/material/Paper";
import {Divider, Stack} from "@mui/material";
import CustomInput from "../shared/UI/customInput";
import Button from "@mui/material/Button";

interface IType {
    children?: any
}
const TransactionHistory: FC<IType> = ({children}) => {
    return (
            <Paper className=" white-90">
                <Stack direction="row" className="subHeaders white-90" sx={{mb: 7}}>
                    <Stack direction="row" spacing={14}>
                        <Stack alignItems="center">
                            <span>Дата создания</span>
                            <span className="subHeadersBold">16.01.2023</span>
                        </Stack>
                        <Divider orientation="vertical" flexItem/>
                        <Stack alignItems="center">
                            <span>ID Заявки</span>
                            <span className="subHeadersBold">23748</span>
                        </Stack>
                    </Stack>
                    <Stack alignItems="center" sx={{ml: 'auto'}}>
                        <span>Тип</span>
                        <span className="subHeadersBold white-100">Самозанятость</span>
                    </Stack>
                </Stack>
                <Divider variant="fullWidth" sx={{mb: 7, width: `105%`}}/>
                <Stack spacing={7} sx={{mb: 7}}>
                    <CustomInput label="ФИО"/>
                    <CustomInput label="Номер счета"/>
                </Stack>
                <Stack direction="row" justifyContent="space-between" className="subHeaders white-90" sx={{mb: 7}}>
                    <Stack direction="row" spacing={14}>
                        <Stack alignItems="center">
                            <span>Сумма</span>
                            <span className="subHeadersBold yellow">102 394₽</span>
                        </Stack>
                        <Divider orientation="vertical" flexItem/>
                        <Stack alignItems="center">
                            <span>С комиссией</span>
                            <span className="subHeadersBold red">91 239₽</span>
                        </Stack>
                    </Stack>
                    <Stack direction="row" spacing={7}>
                        <Button color="neutral">Причина</Button>
                        <Button variant="contained" color="error">Отклонено</Button>
                    </Stack>
                </Stack>
            </Paper>
    );
};

export default TransactionHistory;