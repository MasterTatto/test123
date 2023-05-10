import React, {FC, useState} from 'react';
import Paper from "@mui/material/Paper";
import {Button, Divider, Stack} from "@mui/material";
import IconConnected from "../shared/assets/images/icons/iconConnected";
import CustomRange from "../shared/components/customRange";
import Parameters from "../entities/components/parameters";
import HunterModModal from "../entities/components/modal/hunterModModal";

interface IType {
    children?: any
}

const DashboardTradersSidebar: FC<IType> = ({children}) => {
    const [connectionHunterMod, setConnectionHunterMod] = useState(false)
    const [hunterModBtn, setHunterModBtn] = useState('Hunter Mod')
    const [openModal, setOpenModal] = useState(false);
    const handlerHunterMod = () => {
        setConnectionHunterMod(true)
        setOpenModal(true)

    }
     const handlerCloseHunterMod = () => {
         setConnectionHunterMod(false)
         setHunterModBtn('Hunter Mod')
    }
    return (
        <Stack spacing={7}>
            <Paper sx={{p: 14}}>
                <Stack spacing={7}>
                    <Stack>
                        Информация
                    </Stack>
                    <Divider variant="fullWidth" sx={{width: `112%`}}/>
                    <Stack className="subHeaders white-90" direction="row" alignItems="center"
                           justifyContent="space-between">
                        <span>Стратегия</span>
                        <span className="subHeaders white-100">Сетка</span>
                    </Stack>
                    <Stack className="subHeaders white-90" direction="row" alignItems="center"
                           justifyContent="space-between">
                        <span>Начало торгов</span>
                        <span className="subHeaders white-100">24.12.2019</span>
                    </Stack>
                    <Stack className="subHeaders white-90" direction="row" alignItems="center"
                           justifyContent="space-between">
                        <span>Сделок за неделю</span>
                        <span className="subHeaders white-100">14</span>
                    </Stack>
                    <Stack className="subHeaders white-90" direction="row" alignItems="center"
                           justifyContent="space-between">
                        <span>Средняя прибыль в PIP</span>
                        <span className="subHeaders green">380</span>
                    </Stack>
                    <Stack className="subHeaders white-90" direction="row" alignItems="center"
                           justifyContent="space-between">
                        <span>Средний убыток в PIP</span>
                        <span className="subHeaders red">210</span>
                    </Stack>
                    <Stack className="subHeaders white-90" direction="row" alignItems="center"
                           justifyContent="space-between">
                        <span>Минимальная нагрузка</span>
                        <span className="subHeaders yellow">10%</span>
                    </Stack>
                </Stack>
            </Paper>


            <Button fullWidth variant="contained" color="success" startIcon={<IconConnected connected/>}
                    sx={{height: 96}}>
                <span className="h2">Подключено</span>
            </Button>

            <Paper sx={{p: 14}}>

                <Stack spacing={7}>
                    <span className="h2 white-90">Настройки</span>
                    <Divider variant="fullWidth" sx={{width: `112%`}}/>
                    {
                        connectionHunterMod ?
                            <Stack spacing={7}>
                                <Paper sx={{p: `14px 8px`}}>
                                    <Stack spacing={4}>
                                        <span className="h2 blue">Включен Hunter Mod!</span>
                                        <span className="subHeaders white-90">Чтобы перейти к обычным настройкам, необходимо отключить Hunter Mod</span>
                                    </Stack>
                                </Paper>
                                <Paper sx={{p: `14px 8px`}}>
                                    <Stack spacing={7}>
                                        <Stack className="h2 blue" alignItems="center">Hunter Mod</Stack>
                                        <Stack className="subHeaders white-90" direction="row" alignItems="center"
                                               justifyContent="space-between">
                                            <span>Риск</span>
                                            <span className="white-90">34%</span>
                                        </Stack>
                                        <Stack className="subHeaders white-90" direction="row" alignItems="center"
                                               justifyContent="space-between">
                                            <span>Мин.лот</span>
                                            <span className="white-90">Да</span>
                                        </Stack>
                                        <Stack className="subHeaders white-90" direction="row" alignItems="center"
                                               justifyContent="space-between">
                                            <span>Просадка</span>
                                            <span className="white-90">6%</span>
                                        </Stack>
                                        <Button fullWidth variant="contained" color="success">Настройки</Button>
                                        <Button fullWidth variant="contained" color="error" onClick={handlerCloseHunterMod}>Отключить</Button>
                                    </Stack>
                                </Paper>
                            </Stack>
                            :
                            <>
                                <CustomRange title="Риск" required isSwitch isSliderRange/>
                                <CustomRange title="Макс. лот" required isSwitch isSliderRange/>
                                <CustomRange title="Мин. лот" required isSwitch/>
                                <Parameters/>
                            </>
                    }

                </Stack>
            </Paper>
            <Button fullWidth variant="gardient" color="info" onClick={handlerHunterMod}>
                <span className="h2 blue">{hunterModBtn}</span>
            </Button>
            <HunterModModal setConnectionHunterMod={setConnectionHunterMod} setHunterModBtn={setHunterModBtn} openModal={openModal} closeModal={setOpenModal}/>
        </Stack>

    );
};

export default DashboardTradersSidebar;