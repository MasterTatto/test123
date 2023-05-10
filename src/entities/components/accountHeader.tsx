import React, {FC, useEffect, useState} from 'react';
import {Chip, Stack} from "@mui/material";
import {IBalance} from "../../types";

interface T {
    balance?: IBalance;
    accountType?: number;
    depositLoad?: number;
}


const AccountHeader: FC<T> = ({balance, accountType,depositLoad}) => {
    const [type, setType] = useState('$')
    useEffect(() => {
        if (accountType === 0) {
            setType('Cent')
        }
    }, [])
    return (
        <Stack sx={{mb: 17, padding: `0px 28px`}}>
            <Stack direction="row" alignItems="center" spacing="auto">
                <div className="h2 white-90">Баланс счета</div>
                <div className="h1 white-100">
                    <span>{balance?.value}</span>
                    <span>{type}</span>
                </div>
            </Stack>
            <Stack spacing={4}>
                <Stack direction="row" alignItems="center" spacing="auto">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Chip color="success" sx={{padding: 0, width: 28, height: 8,backgroundColor:'#6FCF97'}}/>
                        <span className="subHeaders white-90">Денежный</span>
                    </Stack>
                    {
                        balance &&
                        <span className={(balance.gain?.value > 0) ? "subHeaders green" : "subHeaders red"}>
                            {
                                (balance.gain?.value > 0) ? `+${balance.gain?.value + type}` : `${balance.gain?.value + type}`
                            }
                        </span>
                    }

                </Stack>
                <Stack direction="row" alignItems="center" spacing="auto">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Chip variant="filled" color="info" sx={{padding: 0, width: 28, height: 8}}/>
                        <span className="subHeaders white-90">В процентах</span>
                    </Stack>
                    <span className="subHeaders blue">{balance && balance.gain?.percent}%</span>
                </Stack>
                <Stack className="subHeaders" direction="row" justifyContent="flex-end">
                    <span className="white-80">Загруженность счета:</span>
                    <span className="yellow">&nbsp;{depositLoad}%</span>
                </Stack>
            </Stack>
        </Stack>
    );
};

export default AccountHeader;