import React, {FC, useEffect, useState} from 'react';
import Referrals from "../entities/components/referrals";
import {Button, Skeleton, Stack, ToggleButton, ToggleButtonGroup, useMediaQuery} from "@mui/material";
import Paper from "@mui/material/Paper";
import {useGetReferralDataQuery, useGetReferralLineUsersQuery, useGetReferralUsersQuery} from "../store/API/referalApi";
import {useInput} from "../hooks/useInput";

interface IType {
    children?: any
}

const ReferralsList: FC<IType> = ({children}) => {
    const [idLine, setIdLine] = useState(1)
    const {data, error, isLoading} = useGetReferralUsersQuery('/users')
    const {
        data: isDataReferralLine,
        error: isErrorReferralLine,
        isLoading: isLoadingReferralLine
    } = useGetReferralLineUsersQuery(`${idLine}`)
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [alignment, setAlignment] = useState<string | null>('left');
    const [referral, setReferral] = useState([]);
    const [activeBtn, setActiveBtn] = useState(1);


    useEffect(() => {
        if (activeBtn === 1 && !isLoading && !error) {
            setReferral(data?.data)
        }else if (!isLoadingReferralLine) {
            setReferral(isDataReferralLine?.data)
            console.log('activeBtn'+ activeBtn)
            console.log('activeBtn'+ isLoadingReferralLine)
        }
    }, [data,activeBtn,isDataReferralLine])
    console.log(isDataReferralLine)
    const handleAlignment = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setAlignment(newAlignment);
    };
    return (
        <Paper>
            <Stack direction={mediaQuery ? 'row':"column"} alignItems={mediaQuery ? 'center':"flex-start"} justifyContent="space-between" flexWrap="wrap" sx={{mb: 7}}>
                <Stack className="h2 white-90" sx={{mb: 7}}>Приглашенные люди</Stack>
                <Stack direction={mediaQuery ? "row" : "column"} alignItems={mediaQuery ? "center" : "flex-start"}
                       justifyContent="space-between" flexWrap="wrap" spacing={2}>
                    <Button
                        onClick={() => {
                            setReferral(data?.data)
                            setActiveBtn(1)
                        }}
                        color="neutral"
                        sx={{color:'#BDBDBD'}}>Все приглашенные</Button>
                    <Button
                        onClick={() => {
                            setIdLine(1)
                            setActiveBtn(2)
                           if(!isLoadingReferralLine && isDataReferralLine) {
                               setReferral(isDataReferralLine.data)
                           }
                            console.log(referral)
                        }}
                        color="neutral"
                        sx={{color:'#BDBDBD'}}>Первая линия</Button>

                    <Button
                        onClick={() => {
                            setIdLine(2)
                            setActiveBtn(3)
                           if(!isLoadingReferralLine && isDataReferralLine) {
                               setReferral(isDataReferralLine?.data)
                           }
                            console.log(referral)
                        }}
                        color="neutral"
                        sx={{color:'#BDBDBD'}}>Вторая линия</Button>

                </Stack>
            </Stack>
            <Stack spacing={5}>
                {
                    isLoading ?
                        <Skeleton variant="rectangular" width={`100%`} height={63}/>
                        : (data && isDataReferralLine && referral?.length > 0) ?
                            referral.map((item: any, index) =>
                                <Referrals
                                    key={index}
                                    avatar={item.telegram.avatar_url}
                                    name={item.telegram.first_name + ' ' + item.telegram.last_name}
                                    link={item.telegram.username}
                                    lastPayment={item.last_payment_in}
                                    registrationDate={item.reg_date}/>
                            )
                            : <Stack>Ошибка при загрузке данных</Stack>
                }
            </Stack>
        </Paper>
    );
};

export default ReferralsList;
