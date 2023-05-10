import React, {FC} from 'react';
import {Chip, Stack, Switch} from "@mui/material";
import CustomLineChart from "../entities/components/chart/customLineChart";


interface IType {
    data?:[];
    description?: 'label' | 'swift';
    additionLabel?: boolean;
    removeLabel?: boolean;
    transactionLabel?: boolean;
}

const BalanceChart: FC<IType> = ({
                                     data,
                                     description,
                                     additionLabel,
                                     removeLabel,
                                     transactionLabel}) => {

    return (
            <Stack sx={{ width: '100%'}}>
                <CustomLineChart data={data} />
                {
                    description === "label" &&
                    <Stack spacing={2} sx={{ pr:14,pl:14}}>
                        {
                            additionLabel &&
                            <Stack direction="row" alignItems="center" spacing={4}>
                                <Chip variant="filled" color="success" sx={{padding: 0, width: 28, height: 8}}/>
                                <span className="subHeaders white-90">Пополнение</span>
                            </Stack>
                        }
                        {
                            removeLabel &&
                            <Stack direction="row" alignItems="center" spacing={4}>
                                <Chip variant="filled" color="error" sx={{padding: 0, width: 28, height: 8}}/>
                                <span className="subHeaders white-90">Снятие</span>
                            </Stack>
                        }
                        {
                            transactionLabel &&
                            <Stack direction="row" alignItems="center" spacing={4}>
                                <Chip variant="filled" color="info" sx={{padding: 0, width: 28, height: 8}}/>
                                <span className="subHeaders white-90">Сделки</span>
                            </Stack>
                        }
                    </Stack>
                }
                {
                    description === "swift" &&
                    <Stack  sx={{ pl:14}}>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4}>
                            <Stack className="subHeaders" direction="row" alignItems="center" spacing={4}>
                                <span className="white-90">Трейдер Nickname_Nickname</span>
                                <span className="green">&nbsp;+5.19%</span>
                            </Stack>
                            <Switch defaultChecked color="secondary"/>
                        </Stack>
                         <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4}>
                            <Stack className="subHeaders" direction="row" alignItems="center" spacing={4}>
                                <span className="white-90">Трейдер Nickname_Nickname</span>
                                <span className="green">&nbsp;+5.19%</span>
                            </Stack>
                            <Switch defaultChecked color="warning"/>
                        </Stack>
                         <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={4}>
                            <Stack className="subHeaders" direction="row" alignItems="center" spacing={4}>
                                <span className="white-90">Трейдер Nickname_Nickname</span>
                                <span className="green">&nbsp;+5.19%</span>
                            </Stack>
                            <Switch defaultChecked />
                        </Stack>
                    </Stack>
                }

            </Stack>
    );
};

export default BalanceChart;