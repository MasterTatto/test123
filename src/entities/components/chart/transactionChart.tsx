import React, {FC} from 'react';
import {Line} from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface IType {
    children?: any
}

const TransactionChart: FC<IType> = ({children}) => {
    const skipped = (ctx: any) => {

        return ctx.p0.raw.type == 0 ? '#6FCF97' : ctx.p0.raw.type == 1 ? '#56CCF2' : ctx.p0.raw.type == -1 ? '#FF8888' : undefined
    };
    return (
        <>
            <Line
                options={{
                    plugins: {
                        legend: {
                            display: false
                        },

                    },


                    scales: {
                        x: {

                            position: 'left' as const,
                            ticks: {
                                maxRotation: 0,
                            }
                        },
                        y: {
                            display: true,
                            position: 'left' as const,
                            ticks: {
                                color: '#6FCF97',
                                minRotation: 25
                            }
                        },
                        y1: {
                            type: 'linear' as const,
                            display: true,
                            position: 'right' as const,
                            ticks: {
                                color: '#56CCF2',
                                minRotation: -25,
                                padding:14

                            }
                        },
                    },
                }}

                data={{
                    labels: [],

                    datasets: [{

                        data: [
                            {x: 'Октябр1111', type: -1, value: 50},
                            {x: ' ', type: 0, value: 75},
                            {x: '   ', type: 1, value: 105},
                            {x: '    ', type: -1, value: 435},
                            {x: '      ', type: -1, value: 435},
                            {x: '       ', type: -1, value: 435},
                            {x: '        ', type: -1, value: 2435},
                            {x: '         ', type: -1, value: 1435},
                            {x: '          ', type: -1, value: 3435},
                            {x: '           ', type: -1, value: 4435},
                            {x: '            ', type: -1, value: 5435},
                            {x: '             ', type: -1, value: 6435},
                            {x: 'Октябрь 2222', type: 0, value: 335},
                        ],
                        borderColor: '#FF8888',
                        pointBorderColor: 'transparent',
                        segment: {
                            borderColor: ctx => skipped(ctx),
                            borderWidth: 1,
                        },
                        spanGaps: false,
                        parsing: {
                            yAxisKey: 'value'
                        }
                    }],
                }}
            />
        </>
    );
};

export default TransactionChart;