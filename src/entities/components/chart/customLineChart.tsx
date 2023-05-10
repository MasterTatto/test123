import React, {FC} from 'react';
import {CartesianGrid, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Stack} from "@mui/material";
import CustomAxisTick from "./customAxisTick";



interface T {
    data?:[];
    colorYAxis?: string;
    colorYAxisRight?: string;
    colorXAxis?: string;
    height?: number;
    referenceLineData?: number;
}

const wrapperTooltipStyle = {
    padding: `8px 14px`,
    background: '#1F1F1F',
    border: `0.5px solid #3C3C3C`,
    borderRadius: `10px`,
    outline: 'none'
}
const contentTooltipStyle = {
    background: '#1F1F1F',
    padding: 0,
    border: 'none'
}

const CustomLineChart: FC<T> = ({data,colorYAxis, colorYAxisRight, colorXAxis, height, referenceLineData}) => {

    return (
        <Stack sx={{height:230}}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart
                    data={data}
                    margin={{
                        top: 15,
                        right: 0,
                        left: -35,
                        bottom: 15,
                    }}
                >
                    {referenceLineData && <ReferenceLine y={referenceLineData}  stroke="#828282" strokeDasharray="3 3"/>}
                    <CartesianGrid stroke="#252525"/>
                    {/*<XAxis dataKey="name" stroke="#252525" tick={<CustomAxisTick color={colorYAxis}/>}/>*/}
                    <YAxis dataKey="uv"stroke="#252525" tick={<CustomAxisTick color={colorYAxis} rotate={-35}/>}/>
                    {/*<YAxis dataKey="uv" stroke="#252525"yAxisId="right" orientation="right"*/}
                    {/*       tick={<CustomAxisTick color={colorYAxis} rotate={-35} x={5}/>} />*/}
                    <Tooltip contentStyle={contentTooltipStyle} wrapperStyle={wrapperTooltipStyle} offset={-50}/>
                    <Line dataKey="uv" stroke="#56CCF2" dot={{r: 0}}/>
                </LineChart>
            </ResponsiveContainer>
        </Stack>
    );
};

export default CustomLineChart;