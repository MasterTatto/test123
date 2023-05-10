import React, {FC} from 'react';
import {Stack} from "@mui/material";

interface T {
    data?: any
}


const TransactionsLabel: FC<T> = ({data}) => {
    const dataLabel = [
        {
            title: 'Всего сделок',
            value: data?.all,
            colorText: 'white-100',
            colorBg: '',
        },
        {
            title: 'Доходных сделки',
            value: data?.profitable,
            colorText: 'green',
            colorBg: 'greenBg',
        },
        {
            title: 'Убыточные сделки',
            value: data?.losing,
            colorText: 'red',
            colorBg: 'redBg',
        },
        {
            title: 'За текущий месяц',
            value: `${data?.losing}%`,
            colorText: 'blue',
            colorBg: 'blueBg',
        },

    ]
    return (
        <>
            <Stack direction="row" flexWrap="wrap" gap={7} justifyContent="space-between">
                {
                    dataLabel && dataLabel.map((item) => (
                        <Stack
                            key={item.title}
                            className={item.colorBg}
                            sx={{
                                height: 140,
                                width: 140,
                                padding: 7,
                                border: `0.5px solid #3C3C3C`,
                                borderRadius: 2,
                            }}
                            justifyContent="space-between"
                        >
                            <span className="h2 white-90">{item.title}</span>
                            <span className={item.colorText}>{item.value}</span>
                        </Stack>
                    ))
                }
            </Stack>

        </>
    );
};

export default TransactionsLabel;