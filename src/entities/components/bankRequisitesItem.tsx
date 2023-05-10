import React, {FC} from 'react';
import Paper from "@mui/material/Paper";
import {Chip, Stack} from "@mui/material";
import CustomInput from "../../shared/UI/customInput";
import Button from "@mui/material/Button";

interface IType {
    children?: any
}

const BankRequisitesItem: FC<IType> = ({children}) => {
    return (
        <Paper>
            <Stack spacing={7}>
                <CustomInput/>
                <CustomInput/>
                <CustomInput/>

                <Stack direction="row" justifyContent="space-between">
                    <Stack className="subHeaders" alignItems="center">
                        <span className="white-80">Дата заявки</span>
                        <span className="white-90">25.04.2022</span>
                    </Stack>
                    <Stack direction="row" spacing={7}>
                        <Button variant="contained" color="error">Отклонить</Button>
                        <Button variant="contained" color="success">Подтвердить</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Paper>
    );
};

export default BankRequisitesItem;