import React, {FC, useState} from 'react';
import {Button, Skeleton, Stack, useMediaQuery} from "@mui/material";
import Paper from "@mui/material/Paper";
import TransactionModal from "./modal/transactionModal";
import {useGetReferralDataQuery} from "../../store/API/referalApi";

interface IType {
    children?: any
}

const PartnerBalance: FC<IType> = ({children}) => {
    const { data, error, isLoading }=useGetReferralDataQuery('/main')
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (event: React.SyntheticEvent) => {
        event.stopPropagation()
        setOpenModal(true)
    };
    return (
        <>
            <Paper>
                <Stack direction={mediaQuery ? "row" : "column"} alignItems={mediaQuery ? "center" : "flex-start"} justifyContent="space-between"
                       spacing={4}>
                    {
                        isLoading ?
                            <Skeleton variant="rectangular" width={210} height={46} />
                            :
                            <Stack>
                                <span className="h2 white-90">Баланс партнерского счета</span>
                                <span className="h1">${data?.balance}</span>
                            </Stack>
                    }

                    <Stack direction="row" alignItems="center" spacing={4}>
                        <Button disabled variant="outlined" color="neutral">История начислений</Button>
                        <Button disabled onClick={handleOpenModal} variant="outlined" color="warning">Вывод</Button>
                    </Stack>
                </Stack>
            </Paper>
            <TransactionModal openModal={openModal} closeModal={setOpenModal}/>
        </>

    );
};

export default PartnerBalance;