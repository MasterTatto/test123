import React, {FC} from 'react';
import {Divider, Stack, useMediaQuery} from "@mui/material";

interface IType {
    stats?: any
}

const CurrentValues: FC<IType> = ({stats}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    console.log(stats)
    return (
        <Stack direction={"row"} alignItems="center" justifyContent="space-between" spacing={7}>
            <Stack>
                <span className="subHeaders white-90">Просадка</span>
                <span className="subHeadersBold green">+{stats.deposit_load}%</span>
            </Stack>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Stack>
                <span className="subHeaders white-90">Все время</span>
                {/*<span className="subHeadersBold green">+{stats.balance.gain.all}%</span>*/}
            </Stack>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Stack>
                <span className="subHeaders white-90">Тек. месяц</span>
                <span className="subHeadersBold green">+{stats.balance.gain.current_month}%</span>
            </Stack>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Stack>
                <span className="subHeaders white-90">Значение</span>
                <span className="subHeadersBold green">+{stats.balance.value}%</span>
            </Stack>
            <Stack
                className="subHeaders yellow"
                alignItems="center"
                justifyContent="center"
                sx={{
                    width: 34,
                    height: 34,
                    border: ` 0.5px solid #3C3C3C`,
                    borderRadius: `50%`,
                    position: !mediaQuery ?'absolute':'static',
                    right:14,
                    top:14,
                }}
            >{stats.deposit_load}%</Stack>
        </Stack>
    );
};

export default CurrentValues;
