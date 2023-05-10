import React, {FC, useState} from 'react';
import Paper from "@mui/material/Paper";
import {Button, Skeleton, Stack, useMediaQuery} from '@mui/material';
import {useGetReferralDataQuery} from "../../store/API/referalApi";

interface IType {
    children?: any
}

const PartnerLink: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const {data, error, isLoading} = useGetReferralDataQuery('/main')
    const [textBtn, setTextBtn] = useState('Скопировать')
    const handlerCopy = (copy: string) => {
        navigator.clipboard.writeText(copy)
            .then(() => {
                setTextBtn('Скопировано')
            })
            .then(() => {
                setTimeout(() => {
                    setTextBtn('Скопировать')
                }, 5000)
            })
    }
    return (
        <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={2}>
                {
                    isLoading ?
                        <Skeleton variant="rectangular" width={210} height={43}/>
                        :
                        <>

                            <Stack spacing={4}>
                                <span className="h2 white-90">Ваша партнерская ссылка</span>
                                <Stack className="link green" onClick={() => handlerCopy(data?.ref_link)} sx={{cursor:'pointer'}}>
                                    {data?.ref_link}
                                </Stack>
                            </Stack>
                            {
                                mediaQuery &&
                                <Button

                                    variant="outlined"
                                    color="neutral"
                                >{textBtn}</Button>
                            }

                        </>
                }


            </Stack>
        </Paper>
    );
};

export default PartnerLink;
