import React, {FC, useState} from 'react';
import Paper from "@mui/material/Paper";
import {FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import NickName from "../../shared/components/nickName";
import imgStrategyGrid from "../../shared/assets/images/strategy.png";
import imgStrategyStopLoss from "../../shared/assets/images/strategys-stop-loss.png";
import CustomAreaChart from "./chart/customAreaChart";
import CurrentValues from "./currentValues";
import {Link} from "react-router-dom";
import {useDeleteTraderMutation} from "../../store/API/tradeSetsApi";

interface IType {
    idTrader?: any;
    openModal?: any;
    deleteTrader?: any;
    id: string | number;
    name: string;
    strategy: string;
    stats: any;
    graph: [];
}

const TraderItem: FC<IType> = ({
                                   idTrader,
                                   openModal,
                                   deleteTrader,
                                   id,
                                   name,
                                   strategy,
                                   stats,
                                   graph,
                               }) => {



    return (

        <Paper sx={{height: 68, alignItems: "center"}}>
            <Grid container spacing={10} columns={14} wrap="wrap" alignItems="center">
                <Grid item xs={14} md={3}>
                    <NickName name={name} number={id}
                              direction="row-reverse"
                              avatar={strategy === 'grid' ? imgStrategyGrid : imgStrategyStopLoss}
                              justifyContent="flex-end"/>
                </Grid>
                <Grid item xs={14} md={3}>
                    <CustomAreaChart
                        height={52}
                        data={graph}
                        dataArea={[{
                            dataKey: "uv",
                            stroke: "#6FCF97",
                            fill: "#29312C"
                        },]}/>
                </Grid>
                <Grid item xs={14} md={6}>
                    <CurrentValues stats={stats}/>
                </Grid>
                <Grid item xs={14} md={2}>
                    <FormControl fullWidth>
                        <InputLabel shrink={false} sx={{left: 24, top: -8,}}>
                            Управление
                        </InputLabel>
                        <Select
                            IconComponent={"select"}
                            fullWidth
                        >
                            <MenuItem onClick={() => {
                                if (idTrader) idTrader(id)
                                openModal(true)
                            }}>
                                Настройки
                            </MenuItem>
                            <MenuItem sx={{color: '#56CCF2'}} component={Link} to='/'>
                                Страница
                            </MenuItem>
                            <MenuItem onClick={() => deleteTrader(id)} sx={{color: '#FF8888'}}>
                                Удалить
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Paper>

    );
};

export default TraderItem;