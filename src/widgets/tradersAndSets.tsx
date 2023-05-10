import {Button, Chip, Divider, Grid, Stack, useMediaQuery} from "@mui/material";
import React, {FC, useState} from "react";
import imgStrategyGrid from "../shared/assets/images/strategy.png";
import imgStrategyStopLoss from "../shared/assets/images/strategys-stop-loss.png";
import NickName from "../shared/components/nickName";
import Paper from "@mui/material/Paper";
import {Link, useNavigate} from "react-router-dom";
import IconSettings from "../shared/assets/images/icons/iconSettings";
import CustomAreaChart from "../entities/components/chart/customAreaChart";
import TabsHeader from "../entities/components/tabsHeader";
import IconAccount from "../shared/assets/images/icons/iconAccount";
import TabsItem from "../entities/components/tabsItem";
import {useDeleteAccountMutation} from "../store/API/userApi";


interface IType {
    accountId?: string;
    dataSets?:any;
    data?: {
        stats: { gain: number, dropdown: number, balance: number, deposit_load: number },
        graph: [],
        trader: { id: string | number, name: string, strategy: string }
    }[]
}

const TradersAndSets: FC<IType> = ({data, accountId,dataSets}) => {
    console.log(data)
    const [deleteAccount] = useDeleteAccountMutation()
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [value, setValue] = useState(0);
    const navigate = useNavigate()

    const deleteAcc = () => {
        deleteAccount(accountId)
        navigate('/')
    }

    return (
        <>
            <Paper
                sx={
                    !mediaQuery ? {
                            width: `100%`,
                            position: 'fixed',
                            top: 64,
                            right: 0,
                            left: 0,
                            background: '#1F1F1F',
                            "@media (min-width:1270px)": {
                                padding: `14px `,
                            }
                        }
                        : {
                            mb: 7,
                            flexGrow: 1,
                            "@media (min-width:1270px)": {
                                padding: `8px 14px`,
                            }
                        }
                }
            >
                {/*<Stack direction="row" justifyContent="space-between" spacing={7} sx={{mb: 4}}>*/}
                {/*    <Chip label="Трейдеры" variant="filled" color="neutral" sx={{flexGrow: 1}}/>*/}
                {/*    <Chip label="Сеты" variant="outlined" color="neutral" sx={{flexGrow: 1}}/>*/}
                {/*</Stack>*/}
                <TabsHeader
                    variant="fullWidth"
                    size={'sizeSmall'}
                    tabsName={[
                        {name: 'Трейдеры', icon: <IconAccount/>},
                        {name: 'Сеты', icon: <IconAccount/>},
                    ]}
                    tabsValue={value} onTabsChange={setValue}/>
                <Divider sx={{mb: 4,width:`105%`}}/>
                <Stack className="subHeadersBold white-80" sx={{mb: 4}}>7/15</Stack>
                <TabsItem value={value} index={0}>
                    {
                        data && data.map(item =>
                            <Paper
                                key={item.trader.id}
                                sx={{
                                    flexGrow: 1,
                                    "@media (min-width:1270px)": {
                                        padding: `14px`,
                                    }
                                }}>
                                <NickName
                                    name={item.trader.name} number={item.trader.id}
                                    avatar={item.trader.strategy === 'grid' ? imgStrategyGrid : imgStrategyStopLoss}
                                    justifyContent="space-between"/>
                                <Stack sx={{mb: 8}}>
                                    <CustomAreaChart data={item.graph} height={54}
                                                     dataArea={[{dataKey: "uv", stroke: "#6FCF97", fill: "#29312C"}]}/>
                                </Stack>
                                <Grid container columns={4} sx={{mb: 7}}>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{
                                                   p: 2,
                                                   borderRight: `0.5px solid #3C3C3C`,
                                                   borderBottom: `0.5px solid #3C3C3C`
                                               }}>
                                            <span className="subHeaders white-90">Прирост</span>
                                            <span className="subHeadersBold green">+{item.stats.gain}%</span>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{p: 2, borderBottom: `0.5px solid #3C3C3C`}}>
                                            <span className="subHeaders white-90">Просадка</span>
                                            <span className="subHeadersBold green">+{item.stats.dropdown}%</span>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{p: 2, borderRight: `0.5px solid #3C3C3C`}}>
                                            <span className="subHeaders white-90">Баланс</span>
                                            <span className="subHeadersBold green">+{item.stats.balance}%</span>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{p: 2, textAlign: "center"}}>
                                            <span className="subHeaders white-90">Нагр. депозита</span>
                                            <span className="subHeadersBold green">+{item.stats.deposit_load}%</span>
                                        </Stack>
                                    </Grid>
                                </Grid>

                                <Stack direction="row" spacing={7} sx={{mb: 4}}>
                                    <Button color="neutral" sx={{width: 48, height: 48, minWidth: 'unset'}}>
                                        <IconSettings/>
                                    </Button>
                                    <Button fullWidth color="neutral" component={Link} to="/trader-dashboard">Дашборд
                                        трейдера</Button>
                                </Stack>
                                <Button fullWidth variant="contained" color="error">Отключить</Button>
                            </Paper>
                        )
                    }
                </TabsItem>
                <TabsItem value={value} index={1}>
                    {
                        dataSets && dataSets.map((item:any) =>
                            <Paper
                                key={item.set.id}
                                sx={{
                                    flexGrow: 1,
                                    "@media (min-width:1270px)": {
                                        padding: `14px`,
                                    }
                                }}>
                                <NickName
                                    name={item.set.name} number={item.set.id}
                                    justifyContent="space-between"/>
                                <Stack sx={{mb: 8}}>
                                    <CustomAreaChart data={item.graph} height={54}
                                                     dataArea={[{dataKey: "uv", stroke: "#6FCF97", fill: "#29312C"}]}/>
                                </Stack>
                                <Grid container columns={4} sx={{mb: 7}}>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{
                                                   p: 2,
                                                   borderRight: `0.5px solid #3C3C3C`,
                                                   borderBottom: `0.5px solid #3C3C3C`
                                               }}>
                                            <span className="subHeaders white-90">Прирост</span>
                                            <span className="subHeadersBold green">+{item.stats.gain}%</span>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{p: 2, borderBottom: `0.5px solid #3C3C3C`}}>
                                            <span className="subHeaders white-90">Просадка</span>
                                            <span className="subHeadersBold green">+{item.stats.dropdown}%</span>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{p: 2, borderRight: `0.5px solid #3C3C3C`}}>
                                            <span className="subHeaders white-90">Баланс</span>
                                            <span className="subHeadersBold green">+{item.stats.balance}%</span>
                                        </Stack>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Stack alignItems="center" justifyContent="center" spacing={2}
                                               sx={{p: 2, textAlign: "center"}}>
                                            <span className="subHeaders white-90">Нагр. депозита</span>
                                            <span className="subHeadersBold green">+{item.stats.deposit_load}%</span>
                                        </Stack>
                                    </Grid>
                                </Grid>

                                {/*<Stack direction="row" spacing={7} sx={{mb: 4}}>*/}
                                {/*    <Button color="neutral" sx={{width: 48, height: 48, minWidth: 'unset'}}>*/}
                                {/*        <IconSettings/>*/}
                                {/*    </Button>*/}
                                {/*    <Button fullWidth color="neutral" component={Link} to="/trader-dashboard">Дашборд*/}
                                {/*        трейдера</Button>*/}
                                {/*</Stack>*/}
                            </Paper>
                        )
                    }
                </TabsItem>
            </Paper>
            <Button onClick={deleteAcc} fullWidth variant="contained" color="error" sx={{height: 76}}>Удалить
                счет</Button>

        </>
    );
};
export default TradersAndSets;
