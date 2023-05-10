import React, {FC, useState} from 'react';
import SettingsItem from "./settingsItem";
import {Button, Divider, Stack} from "@mui/material";
import CopyTradingModal from "./modal/copyTradingModal";
import SettingsModak from "./modal/settingsModak";
import Paper from "@mui/material/Paper";
import CustomInput from "../../shared/UI/customInput";

interface IType {
    children?: any
}

const SelfEmployment: FC<IType> = ({children}) => {
    const [visible, setVisible] = useState(false)
    return (
        <Paper sx={{height: `100%`}}>
            <Stack className="h2 white-90" sx={{mb: 14}}>Личные данные</Stack>
            {/*<Divider/>*/}
            <Stack spacing={7}>
                {
                    visible &&
                    <>
                        <CustomInput label="Имя"/>
                        <CustomInput label="Фамилия"/>
                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                        >Отправить</Button>
                    </>
                }

                <Stack sx={{p: `14px`, border: `0.5px solid #3C3C3C`, borderRadius: 2.5}}>
                    <span className="h2 blue">Почему нужна самозанятость?</span>
                    <Stack sx={{mb: 80}}>
                        Самоза́нятость — форма получения вознаграждения за свой труд непосредственно от заказчиков, в
                        отличие от наёмной работы. Оформите ее, чтобы не получать комиссий и других издержек
                        альтернативных
                        способов сотрудничества
                    </Stack>
                    <Button
                        onClick={() => setVisible(true)}
                        fullWidth
                        variant="outlined"
                        color="success"
                    >Внести данные</Button>
                </Stack>

            </Stack>
        </Paper>

    );
};

export default SelfEmployment;
