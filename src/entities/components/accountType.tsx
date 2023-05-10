import React, {FC, useState} from 'react';
import {Button, Chip, Divider, IconButton, Stack, useMediaQuery} from "@mui/material";
import IconEdit from "../../shared/assets/images/icons/iconEdit";
import SimpleModal from "./modal/simpleModal";
import CustomInput from "../../shared/UI/customInput";
import {useInput} from "../../hooks/useInput";
import {useUpdateAccountMutation} from "../../store/API/userApi";
import {Server} from "../../types";

interface T {
    accountType?: Server;
    accountLogin?: number | string;
    status?: number | string;
    accountNumber?: number | string;
    accountName?: string;
    productType?: string;
}


const AccountType: FC<T> = ({
                                accountType,
                                accountLogin,
                                status,
                                accountNumber,
                                productType,
                                accountName,
                            }) => {
    const [updateAccount] = useUpdateAccountMutation()
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [openModal, setOpenModal] = useState(false);
    const nameAccount = useInput('',false,true)

    const handlerEdit = () => {
        setOpenModal(false)
        updateAccount({
            body: {
                name: nameAccount.value,
                login: accountLogin,
                server_id: accountType?.id
            },
            id: accountNumber
        })

    }
    return (
        <Stack
            direction={mediaQuery ? "row" :  "column"}
            alignItems="center"
            spacing="auto"
            sx={{padding: `14px 28px`}}
        >
            <Stack spacing={2} sx={{mb: mediaQuery ? 0 : 4}}>
                <span className="subHeaders white-80">{accountLogin}</span>
                <Stack direction="row" spacing={4}>
                    <Stack className="h2 white-100" sx={{
                        maxWidth: 90,
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                    }}>{accountName ? accountName : 'Имя счета'}</Stack>
                    <Stack
                        onClick={() => {
                            setOpenModal(true)
                        }}
                        sx={{zIndex: 100, cursor: 'pointer'}}>
                        <IconEdit/>
                    </Stack>
                </Stack>
            </Stack>
            {
                status === 1 &&
                <Stack direction="row" spacing={4}>
                    {
                        productType === "Копировальщик"
                            ? <Chip label="Копитрейдер" variant="outlined" color="success" sx={{pr: 0, pl: 0}}/>
                            : <Chip label="Робот" color="secondary" sx={{pr: 0, pl: 0}}/>
                    }
                    {
                        accountType?.type === 0 ?
                            <Chip label="Центовый" variant="filled" color="neutral" sx={{pr: 0, pl: 0}}/>
                            :
                            <Chip label="Долларовый" variant="filled" color="warning" sx={{pr: 0, pl: 0}}/>
                    }

                </Stack>
            }

            <SimpleModal maxWidth={460} title="Имя счета" openModal={openModal} closeModal={setOpenModal}>
                <Stack spacing={7}>
                    <CustomInput dataInput={nameAccount} label="Имя счета" inputType="text"/>
                </Stack>
                <Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>
                    <Button onClick={() => setOpenModal(false)} color="error">Отмена</Button>
                    <Button onClick={handlerEdit} color="success">Сохранить</Button>
                </Stack>
            </SimpleModal>
        </Stack>
    );
};

export default AccountType;
