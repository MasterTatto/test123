import React, {FC} from 'react';
import {Divider, Stack, Switch, useMediaQuery} from "@mui/material";
import CustomSwitch from "../../shared/components/customSwitch";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {barChartSlice} from "../../store/slice/barChartSlice";

interface T {
    children?: any
}

const SwitchList: FC<T> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    // const {switchData} = useAppSelector(state => state.barChartReducer)
    const {deleteBarChart, addBarChart} = barChartSlice.actions
    const dispatch = useAppDispatch()
    const switchData = [
        {
            id: 1,
            name: 'EURUSD',
            value: 5.12,
            pv: 3400,
        },
        {
            id: 2,
            name: 'EURUSD',
            value: 5.12,
            pv: 4400,
        },
        {
            id: 3,
            name: 'EURUSD',
            value: 5.12,
            pv: 2400,
        },
    ]
    const handlerSwitch = (e: any) => {

        if (!e.target.checked) dispatch(deleteBarChart(+e.target.id))
        if (e.target.checked) dispatch(addBarChart({id: +e.target.id, pv: e.target.defaultValue}))
    }
    return (
        <Stack sx={{
            padding: `20px 14px`,
            background: `linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, #1F1F1F 100%)`,
            border: `0.5px solid #3C3C3C`,
            borderRadius: 2.5,
            flexGrow: 1,
            maxWidth: mediaQuery ? 220 : `100%`,
            width: `100%`,
            maxHeight: 315,
            overflow: 'hidden',
            overflowY: 'scroll'
        }}
        >

            <Stack mb={8} className="subheaders white-90">168 Инстр.</Stack>
            <Divider/>
            <Stack spacing={6}>

                {
                    switchData && switchData.map((item,index) =>
                        <Stack
                            key={item.id}
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{
                                padding: `12px 8px`,
                                border: `0.5px solid #3C3C3C`,
                                borderRadius: 2.5,
                            }}
                        >
                            <span className="subHeaders">
                                <span className="white-100">{item.name}</span>
                                <span className="green">&nbsp;+{item.value}%</span>
                            </span>
                            <Switch id={`item.id`} value={item.pv} defaultChecked size="small" onChange={(e) => {
                                handlerSwitch(e)
                            }}/>
                        </Stack>
                    )
                }

            </Stack>
        </Stack>
    );
};

export default SwitchList;
