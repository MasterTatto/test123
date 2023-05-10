import React, {FC, useEffect, useState} from 'react';
import TabsItem from "../entities/components/tabsItem";
import Box from "@mui/material/Box";
import {Grid, Stack, useMediaQuery} from "@mui/material";
import DashboardLabel from "../entities/components/dashboardLabel";
import TransactionsLabel from "../entities/components/transactionsLabel";
import BalanceChart from "./balanceChart";
import CustomBarChart from "../entities/components/chart/customBarChart";
import Chart from "../entities/components/chart/chart";
import SwitchList from "../entities/components/switchList";
import CustomTable from "../shared/components/customTable";
import TradersAndSets from "./tradersAndSets";
import TabsHeader from "../entities/components/tabsHeader";
import IconAccount from "../shared/assets/images/icons/iconAccount";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import DashboardTradersSidebar from "./dashboardTradersSidebar";
import {useGetAccountsQuery} from "../store/API/userApi";
import {useAppSelector} from "../hooks/useRedux";
import barChartReducer from "../store/slice/barChartSlice";
import {useLocation} from "react-router-dom";
import {useGetAllSubscribesQuery, useGetAllSubscribesSetQuery} from "../store/API/subscribesApi";
import {useGetHistoryQuery} from "../store/API/tradersUserApi";


interface IType {
    traderDashboard?: boolean;
    dataDashboard?: any;
}





const DashboardTabs: FC<IType> = ({traderDashboard, dataDashboard}) => {

    const {barChartData} = useAppSelector(state => state.barChartReducer)
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [value, setValue] = useState(0);
    const [dataChart, setDataChart] = useState<any>([]);
    const location = useLocation()
    const id = location?.pathname?.split('/').pop()
    const {data} = useGetAllSubscribesQuery(id)
    const {data:dataSet} = useGetAllSubscribesSetQuery(id)
    const {data:dataHistory} = useGetHistoryQuery(id)


    useEffect((() => {
        setDataChart(barChartData)
        if (!mediaQuery) {
            setSidebarVisible(false)
        }
    }), [mediaQuery, dataChart, barChartData])
    return (
        <>
            <Box sx={{width: '100%'}}>
                <TabsHeader
                    tabsName={[
                        {name: 'Дашборд', icon: <IconAccount/>},
                        {name: 'История', icon: <IconAccount/>},
                        // {name: 'Открытые позиции', icon: <IconAccount/>}
                    ]}
                    tabsValue={value} onTabsChange={setValue}/>

                <TabsItem value={value} index={0}>
                    <Grid container spacing={10} columns={12} wrap="wrap">
                        <Grid item md={8} xs={16}>
                            <Stack spacing={7}>
                                {
                                    traderDashboard &&
                                    <Paper>
                                        <Stack className="subHeaders white-80" spacing={7}>
                                            <p>Velit nunc ultrices sit est et
                                                varius. Tellus accumsan pretium sollicitudin elit purus morbi.
                                                Euismod fames ullamcorper eget eget mi nisi aliquet tortor. Etiam
                                                aenean mauris integer maecenas et in. Volutpat dolor id vulputate
                                                non sed arcu. Justo ut nisl non elit odio cursus auctor. Aliquam
                                                tincidunt nunc ultricies dignissim aenean montes feugiat.
                                                Vestibulum leo augue magna in morbi montes malesuada diam. Faucibus
                                                velit risus orci dui pellentesque fusce cursus magna. Quam tristique
                                                enim id.
                                            </p>
                                            <p>
                                                Velit nunc ultrices sit est et varius. Tellus accumsan pretium
                                                sollicitudin elit purus morbi. Euismod fames ullamcorper eget eget
                                                mi nisi aliquet tortor. Etiam aenean mauris integer maecenas et in.
                                                Volutpat dolor id vulputate non sed arcu. Justo ut nisl non elit
                                                odio cursus auctor. Aliquam tincidunt nunc ultricies dignissim
                                                aenean montes feugiat.
                                                Vestibulum leo augue magna in morbi montes malesuada diam. Faucibus
                                                velit risus orci dui pellentesque fusce cursus magna. Quam tristique
                                                enim id.
                                            </p>
                                        </Stack>
                                    </Paper>

                                }
                                <DashboardLabel notProduct={!traderDashboard} updateTariff={!traderDashboard}
                                                balance={dataDashboard?.balance}/>
                                <TransactionsLabel  data={dataDashboard?.deals_count}/>



                                <Chart title="Баланс" icon="bad" date>
                                    <BalanceChart description="label" additionLabel removeLabel transactionLabel/>
                                </Chart>
                                {/*<Chart title="Средства" icon="good" date>*/}
                                {/*    <BalanceChart description="label" additionLabel removeLabel/>*/}
                                {/*</Chart>*/}
                                {/*<Chart title="Прирост баланса" icon="good">*/}
                                {/*    <BalanceChart/>*/}
                                {/*</Chart>*/}
                                {/*<Chart title="По трейдерам" icon="good">*/}
                                {/*    <BalanceChart description="swift"/>*/}
                                {/*</Chart>*/}
                                {/*<Stack spacing={7} direction={mediaQuery ? "row" : "column"}*/}
                                {/*       justifyContent="space-between">*/}
                                {/*    <Chart title="График" select={true}>*/}
                                {/*        <CustomBarChart barChartData={data}/>*/}
                                {/*    </Chart>*/}
                                {/*    <SwitchList/>*/}
                                {/*</Stack>*/}
                                {/*<Chart title="По дням">*/}
                                {/*    <CustomBarChart barChartData={data}/>*/}
                                {/*</Chart>*/}
                                {/*<Chart title="По часам" select={true}>*/}
                                {/*    <CustomBarChart barChartData={data}/>*/}
                                {/*</Chart>*/}
                                <Paper>
                                    <Stack className="h2 white-90" sx={{mb: 7}}>По месяцам</Stack>
                                    <CustomTable/>
                                </Paper>
                            </Stack>
                        </Grid>
                        {
                            sidebarVisible &&
                            <Grid item md={4} xs={16}>
                                {
                                    traderDashboard ?
                                        <DashboardTradersSidebar/>
                                        : <TradersAndSets dataSets={dataSet?.data} accountId={id} data={data?.data}/>
                                }


                            </Grid>
                        }
                    </Grid>
                    {
                        !mediaQuery &&
                        <Button
                            onClick={() => setSidebarVisible(true)}
                            variant="contained"
                            color="warning"
                            sx={{height: 48, position: 'fixed', right: 20, left: 20, bottom: 40}}
                        >Настройки</Button>

                    }
                </TabsItem>
                <TabsItem value={value} index={1}>
                    <CustomTable/>
                </TabsItem>
                <TabsItem value={value} index={2}>
                    <CustomTable/>
                </TabsItem>
            </Box>
        </>
    );
};

export default DashboardTabs;