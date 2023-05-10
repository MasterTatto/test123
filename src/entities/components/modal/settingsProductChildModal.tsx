import React, {FC, useEffect, useState} from 'react';
import {Alert, Box, Button, Divider, Modal, Snackbar, Stack} from "@mui/material";
import IconClose from "../../../shared/assets/images/icons/iconClose";
import {useUpdateProductMutation} from "../../../store/API/productApi";

interface IType {
    closeModal: any;
    openModal: boolean;
    accountId?: number | string;
    productId?:  number | string;
}

const SettingsProductChildModal: FC<IType> = ({openModal, closeModal,accountId,productId}) => {
    const [updateAccount, {isLoading, error}] = useUpdateProductMutation()
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    console.log(accountId)
    console.log(productId)
    useEffect((() => {
        setOpen(openModal)
    }), [open, openModal])

    const handleClose = () => {
        closeModal(false)
        setOpen(false);
    };
    const handleUpdate = () => {
        updateAccount({body : {forex_account_id:accountId}, id:productId}).then(()=>{
            setStep(step +1)
        })
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={step === 3}
            >
                <Alert severity={error ? "error" : "success"} icon={false}>
                    {error ? 'Ошибка' : 'Успешно!'}
                </Alert>
            </Snackbar>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{maxWidth: 620}}>
                    <Stack onClick={handleClose} sx={{position: "absolute", top: 14, right: 28, cursor: "pointer"}}>
                        <IconClose/>
                    </Stack>
                    <Stack className="h2 white-90" sx={{mb: 7}}>Подключение трейдера</Stack>

                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    {
                        step === 1 ?
                            <Stack className="h2" spacing={14}>
                                <span>
                                    Ваш текущий период для Тарифа до <span className="green">&nbsp;10.000$&nbsp;</span> - 30 дней
                                </span>
                                <span>
                                    Обновленный Тариф <span className="yellow">до 20.000$</span> сократится до 15 дней
                                </span>
                            </Stack>
                            : step === 2 ?
                                <Stack className="h2" spacing={14}>
                                    Вы уверены, что хотите обновить лимит продукта Копитрейдинг до 20.000$?
                                </Stack>
                                :
                                <Stack className="h2" spacing={14}>
                                    Успешно! Тариф обновлен.

                                    Обновленный период: 15 дней
                                </Stack>
                    }


                    <Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>
                        <Button onClick={handleClose} color="error">Отмена</Button>
                        {
                            step === 2 ?
                                <Button onClick={handleUpdate} color="success">Продожить</Button>
                                : <Button onClick={() => setStep(step + 1)} color="success">Продожить</Button>
                        }

                    </Stack>
                </Box>
            </Modal>
        </>
    );
};
export default SettingsProductChildModal;