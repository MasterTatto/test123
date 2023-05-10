import React, {FC, useEffect, useState} from 'react';
import BalanceChart from "./balanceChart";
import Chart from "../entities/components/chart/chart";
import {
    Divider,
    FormControl,
    Grid,
    InputLabel, MenuItem,
    Select, Skeleton,
    Stack,
    TextField,
    useMediaQuery
} from "@mui/material";
import Button from "@mui/material/Button";
import IconConnected from "../shared/assets/images/icons/iconConnected";
import SimpleModal from "../entities/components/modal/simpleModal";
import IconTraders from "../shared/assets/images/icons/iconTraders";
import IconSet from "../shared/assets/images/icons/iconSet";
import Paper from "@mui/material/Paper";
import NickName from "../shared/components/nickName";
import {Link} from "react-router-dom";
import CustomAreaChart from "../entities/components/chart/customAreaChart";
import CurrentValues from "../entities/components/currentValues";
import {
    useDeleteSetMutation, useDeleteTraderMutation,
    useGetAllAdminTradersQuery,
    useGetAllLinkedTradersQuery,
    useSettingsTraderMutation,
    useUpdateSetMutation,
    useUpdateSettingsTraderMutation
} from "../store/API/tradeSetsApi";
import IconPlus from "../shared/assets/images/icons/iconPlus";
import imgStrategyGrid from "../shared/assets/images/strategy.png";
import imgStrategyStopLoss from "../shared/assets/images/strategys-stop-loss.png";
import CustomRange from "../shared/components/customRange";
import Parameters from "../entities/components/parameters";
import {useAppSelector} from "../hooks/useRedux";
import TraderItem from "../entities/components/TraderItem";


interface IType {
    adminSet?: boolean;
    data?: any;
    isLoading?: boolean;
}

const Set: FC<IType> = ({adminSet, data, isLoading}) => {
    const {excludeSymbols, excludeDays, excludeHours} = useAppSelector(state => state.setParametersReducer)


    const [addSettingsTrader] = useSettingsTraderMutation()
    const [updateSettingsTrader] = useUpdateSettingsTraderMutation()
    const [deleteSet] = useDeleteSetMutation()
    const [updateSet] = useUpdateSetMutation()
    const {data: dataTradersSet} = useGetAllAdminTradersQuery('1')
    const {data: dataLinkedTraders} = useGetAllLinkedTradersQuery(data?.id)
    const [deleteTrader] = useDeleteTraderMutation()

    const mediaQuery = useMediaQuery('(min-width:900px)');

    const [openModalSetSettings, setOpenModalSetSettings] = useState(false);
    const [openModalSettingsTrader, setOpenModalSettingsTrader] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [openModalAddTrader, setOpenModalAddTrader] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [dataSet, setDataSet] = useState({id: '', name: ''})
    const [valueRisk, setValueRisk] = useState(0);
    const [valueMaxLot, setValueMaxLot] = useState(0);
    const [valueMinLot, setValueMinLot] = useState(false);
    const [textValue, setTextValue] = useState(data?.description);
    const [nameAccount, setNameAccount] = useState(data?.name);
    const [idTrader, setIdTrader] = useState('');

    const [updateSettings, setUpdateSetting] = useState(false)

    const closeModal = () => {
        setTextValue('')
        setNameAccount('')
        // setIdTrader('')
        setOpenModalSetSettings(false)
        setOpenModalSettingsTrader(false)
        setOpenModalAddTrader(false)
    }
    const handleUpdateSet = () => {

        updateSet({
            id: data.id,
            body: {
                name: nameAccount,
                description: textValue,
            }
        }).then(() => {
            closeModal()
        })
    }
    const handleAddSettingsTrader = () => {

        if (updateSettings) {

            updateSettingsTrader({
                idTrader,
                body: {
                    risk: valueRisk,
                    max_lot: valueMaxLot,
                    min_lot: valueMinLot,
                    exclude_symbols: excludeSymbols,
                    exclude_days: excludeDays,
                    exclude_hours: excludeHours
                }
            }).then(() => {
                closeModal()
            })
        } else {

            addSettingsTrader({
                idSet: data.id,
                idTrader,
                body: {
                    settings: {
                        risk: valueRisk,
                        max_lot: valueMaxLot,
                        min_lot: valueMinLot,
                        exclude_symbols: excludeSymbols,
                        exclude_days: excludeDays,
                        exclude_hours: excludeHours
                    }
                }
            }).then(() => {
                closeModal()
            })
        }

    }
    const handleAddTrader = () => {
        setOpenModal(false)
        setOpenModalAddTrader(true)
    }

    return (
        <>
            <Paper>
                <Stack direction="row" spacing={7} alignItems="center" sx={{mb: 7}}>
                    <IconSet/>
                    <span className="h2 white-90">Сет {data?.name}</span>
                </Stack>
                <Divider variant="fullWidth" sx={{mb: 7, width: `103%`}}/>
                <Grid
                    direction={!mediaQuery ? "column-reverse" : "row"}
                    container
                    spacing={10}
                    columns={12}
                    wrap="wrap"
                    sx={{mb: 7}}
                >
                    <Grid item xs={12} md={5}>
                        <Chart
                            title="Доходность"
                        >
                            <BalanceChart data={data?.graph}/>
                        </Chart>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Stack className="subHeaders white-80" spacing={7}>
                            <p>
                                {data?.description}
                            </p>
                        </Stack>
                    </Grid>
                </Grid>
                <Grid container spacing={10} columns={12} wrap="wrap" alignItems="stretch">
                    <Grid item xs={16} md={5}>
                        <Stack direction="row" spacing={7}>
                            <Button
                                onClick={() => {
                                    setOpenModalDelete(true)
                                    setDataSet({id: '', name: ''})
                                }}
                                variant="contained" fullWidth
                                color="error"
                                sx={{width: 81, height: 48}}
                            >Удалить</Button>
                            <Button
                                onClick={() => setOpenModalSetSettings(true)}
                                fullWidth
                                color="neutral"
                                sx={{height: 48}}
                            >Настройки</Button>
                        </Stack>


                    </Grid>
                    <Grid item xs={16} md={7}>
                        <Button fullWidth color="neutral" startIcon={<IconTraders/>} sx={{height: 48}}
                                onClick={() => setOpenModal(true)}>
                            Подключенные трейдеры
                        </Button>
                    </Grid>
                </Grid>
            </Paper>

            <SimpleModal title="Настройки" openModal={openModalSetSettings}
                         closeModal={setOpenModalSetSettings}>
                <Stack spacing={7}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={nameAccount}
                        onChange={(e) => setNameAccount(e.target.value)}
                        label="Название сета"
                        type="text"
                    />
                    <TextField
                        value={textValue}
                        multiline
                        minRows={10}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button onClick={closeModal} color="error">Отмена</Button>
                        <Button
                            onClick={handleUpdateSet}
                            color="success">Сохранить настройки</Button>
                    </Stack>
                </Stack>
            </SimpleModal>


            <SimpleModal maxWidth={1140} title="Подключенные трейдеры" openModal={openModal}
                         closeModal={setOpenModal}>
                <Stack spacing={7}>
                    <Button
                        fullWidth
                        onClick={handleAddTrader}
                        startIcon={<IconPlus/>}
                        sx={{height: 48, justifyContent: 'flex-start', color: '#BDBDBD'}}
                    >
                        Добавить трейдера
                    </Button>
                    {
                        dataLinkedTraders?.data &&
                        dataLinkedTraders?.data.map((item: any) =>
                            <TraderItem
                                id={item.id}
                                stats={item.trader.stats}
                                graph={item.trader.graph}
                                name={item.trader.name}
                                strategy={item.trader.strategy}
                                openModal={setOpenModalSettingsTrader}
                                deleteTrader={deleteTrader}
                            />
                        )
                    }
                </Stack>
            </SimpleModal>
            <SimpleModal maxWidth={1140} title="Добавить трейдера" openModal={openModalAddTrader}
                         closeModal={setOpenModalAddTrader}>
                <Stack spacing={7}>
                    {
                        dataTradersSet?.data &&
                        dataTradersSet?.data.map((item: any) =>
                            <Paper key={item.id} sx={{height: 68, alignItems: "center"}}>
                                <Grid container spacing={10} columns={14} wrap="wrap" alignItems="center">
                                    <Grid item xs={14} md={3}>
                                        <NickName name={item.name} number={item.id}
                                                  direction="row-reverse"
                                                  avatar={item.strategy === 'grid' ? imgStrategyGrid : imgStrategyStopLoss}
                                                  justifyContent="flex-end"/>
                                    </Grid>
                                    <Grid item xs={14} md={3}>
                                        <CustomAreaChart
                                            height={52}
                                            data={item.graph}
                                            dataArea={[{
                                                dataKey: "uv",
                                                stroke: "#6FCF97",
                                                fill: "#29312C"
                                            },]}/>
                                    </Grid>
                                    <Grid item xs={14} md={6}>
                                        <CurrentValues stats={item.stats}/>
                                    </Grid>
                                    <Grid item xs={14} md={2}>
                                        <Button onClick={() => {
                                            setIdTrader(item.id)
                                            setOpenModalSettingsTrader(true)
                                        }}
                                                color="success"
                                        >Подключить</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        )
                    }
                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button
                            onClick={closeModal}
                            color="neutral">Закрыть</Button>
                    </Stack>
                </Stack>
            </SimpleModal>
            <SimpleModal maxWidth={620} title="Настройки трейдера" openModal={openModalSettingsTrader}
                         closeModal={setOpenModalSettingsTrader}>
                <Stack spacing={7}>
                    <CustomRange onChange={setValueRisk} step={1} minValue={0} maxValue={100}
                                 title="Риск в процентах"
                                 isSliderRange/>
                    <CustomRange onChange={setValueMaxLot} minValue={0} step={1} maxValue={500} title="Макс. лот *"
                                 isSwitch isSliderRange/>
                    <CustomRange onChangeSwift={setValueMinLot} title="Мин. лот" required isSwitch/>
                    <Parameters/>

                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button onClick={() => setOpenModalSettingsTrader(false)} color="error">Отмена</Button>
                        <Button
                            onClick={handleAddSettingsTrader}
                            color="success">Сохранить</Button>
                    </Stack>
                </Stack>
            </SimpleModal>
            <SimpleModal maxWidth={620} title="Подтверждение" openModal={openModalDelete}
                         closeModal={setOpenModalDelete}>

                <Stack direction="row" justifyContent="flex-end" spacing={7}>
                    <Button onClick={() => setOpenModalDelete(false)} color="error">Отмена</Button>
                    <Button
                        onClick={() => deleteSet(data.id)}
                        color="success">Подтвердить</Button>
                </Stack>
            </SimpleModal>

        </>
    );
};

export default Set;