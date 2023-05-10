import React, {FC} from 'react';
import AccountType from "./accountType";
import {Button, Divider, Skeleton, Stack, Typography} from "@mui/material";
import {Area, AreaChart, ResponsiveContainer} from "recharts";
import AccountHeader from "./accountHeader";
import IconAddAccount from "../../shared/assets/images/icons/iconAddAccount";
import {IBalance, Server} from "../../types";
import {NavLink} from "react-router-dom";
import {useDeleteAccountMutation, useGetAccountsQuery} from "../../store/API/userApi";

interface T {
    isLoading?: boolean;
    accountLogin?: number | string;
    status: number;
    productType?: string;
    balance?: IBalance;
    accountType?: Server;
    accountNumber?: number | string;
    accountName?: string;
    addRepeat: (open: boolean) => void;
    depositLoad?: any
}

const AccountCard: FC<T> = ({
                                isLoading,
                                accountLogin,
                                status,
                                productType,
                                accountNumber,
                                balance,
                                accountType,
                                accountName,
                                addRepeat,
                                depositLoad,
                            }) => {
    const [deleteAccount] = useDeleteAccountMutation()
    const handleDeleteAccount = () => {
        deleteAccount(accountNumber)
    }


    return (
        <Stack sx={{height: 400, border: ` 0.5px solid #3C3C3C`,background: `linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, #1F1F1F 100%)`, borderRadius: 2.5, overflow: 'hidden'}}>
            <AccountType
                accountLogin={accountLogin}
                productType={productType}
                accountType={accountType}
                accountNumber={accountNumber}
                accountName={accountName}
                status={status}
            />
            <Divider variant="fullWidth" sx={{mb: 14, ml: 14}}/>

            {
                status === -1 ?
                    <Stack alignItems="center" sx={{height: `100%`, mt: 23}}>
                        <IconAddAccount/>
                        <Stack className="h2 red" sx={{mb: 7, mt: 7}} textAlign="center">Заявка на добавление счета
                            отклонена</Stack>
                        <Stack className="subHeaders white-90" textAlign="center">
                            Здравствуйте! В заявке вы указали недействительный счет. Пожалуйста, проверьте
                            корректность введенных данных
                        </Stack>
                        <Stack direction="row" spacing={7} sx={{mt: 'auto', mb: 7, mr: 7, ml: 'auto'}}>
                            <Button color="error" onClick={handleDeleteAccount}>Удалить</Button>
                            <Button color="success" onClick={() => addRepeat(true)}>Повторить</Button>
                        </Stack>
                    </Stack>
                    : status === 0 ?
                        <Stack alignItems="center" sx={{height: `100%`, mt: 45}}>
                            <IconAddAccount success/>
                            <Stack className="h2 blue" sx={{mb: 7, mt: 12}} textAlign="center">
                                Ожидание рассмотрения заявки <br/> на добавление счета
                            </Stack>
                        </Stack>
                        :
                        <NavLink to={`/exchange-account/${accountNumber}`}>
                            <AccountHeader depositLoad={depositLoad} balance={balance} accountType={accountType?.type}/>
                            <Stack sx={{width: '100%', height: 210}}>
                                <ResponsiveContainer>
                                    <AreaChart data={balance?.graph} margin={{right: 0, bottom: 0, left: 0}}>
                                        <Area dataKey="uv" stroke="#6FCF97" fill="#29312C" width={2}/>
                                        <Area dataKey="pv" stroke="#56CCF2" fill="transparent"/>
                                    </AreaChart>
                                </ResponsiveContainer>
                            </Stack>
                        </NavLink>

            }

        </Stack>
    );
};

export default AccountCard;