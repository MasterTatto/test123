import React, {FC} from 'react';
import {Stack, Switch} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {barChartSlice} from "../../store/slice/barChartSlice";

interface T {
    children?: any
}

const CustomSwitch: FC<T> = ({children}) => {
    // const {barChartData} = useAppSelector(state => state.barChartReducer)
    // const {filterBarChart} = barChartSlice.actions
    // const dispatch = useAppDispatch()
    // const handlerSwitch = (e: any) => {
    //     console.log(e.target.id)
    //     dispatch(filterBarChart(e.target.id))
    // }
    return (
<></>
    );
};

export default CustomSwitch;