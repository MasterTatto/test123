import React, {FC} from 'react';
import { Divider, Stack} from "@mui/material";
import CustomInput from "../../shared/UI/customInput";
import Paper from "@mui/material/Paper";

interface IType {
    children?: any
}

const SettingsItem: FC<IType> = ({children}) => {
    return (
        <Paper sx={{height:`100%`}}>
            <Stack className="h2 white-90" sx={{mb: 14}}>Личные данные</Stack>
            <Divider/>
            <Stack spacing={7}>
                <CustomInput label="Имя"/>
                <CustomInput label="Фамилия"/>
                {children}
            </Stack>
        </Paper>
    );
};

export default SettingsItem;