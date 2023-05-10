import React, {FC, useEffect, useState} from 'react';
import {Alert, Chip, Divider, Snackbar, Stack, useMediaQuery} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconClose from "../../../shared/assets/images/icons/iconClose";
import CustomInput from "../../../shared/UI/customInput";
import CustomSelect from "../../../shared/UI/customSelect";
import Button from "@mui/material/Button";
import {useUpdateProductMutation} from "../../../store/API/productApi";
import {useGetAccountsQuery} from "../../../store/API/userApi";
import Paper from "@mui/material/Paper";
import CopyTradingModalChild from "./copyTradingModalChild";
import SettingsProductChildModal from "./settingsProductChildModal";

interface IType {
    openModal: boolean;
    closeModal: any;
    productId: number | string;
}

const SettingProductModal: FC<IType> = ({openModal, closeModal, productId}) => {
    const [updateAccount, {isLoading, error}] = useUpdateProductMutation()
    const {data: accountsData, error: accountsError, isLoading: accountsLoading} = useGetAccountsQuery('/accounts')
    const mediaQuery = useMediaQuery('(min-width:1270px)')
    const [open, setOpen] = useState(false);
    const [openModalChild, setOpenModalChild] = useState(false);
    const [step, setStep] = useState(1);
    const [forexAccountData, setForexAccountData] = useState({id: 0, login: ''});

    useEffect((() => {
        setOpen(openModal)
    }), [open, openModal])

    const handlerClose = () => {
        closeModal(false)
        setOpen(false);
        setStep(1)
    };

    const handleUpdate = () => {
        console.log(productId)
        console.log(forexAccountData.id)
        updateAccount({
            body: {forex_account_id: forexAccountData.id == 0 ? null : forexAccountData.id},
            id: productId
        }).then(() => {
            if (!error && !isLoading) {
                setOpen(false)
            }

        })
    };

    return (
        <>

            <Modal
                open={open}
                onClose={handlerClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{maxWidth: 780}}>
                    <Stack onClick={handlerClose} sx={{position: "absolute", top: 14, right: 28, cursor: "pointer"}}>
                        <IconClose/>
                    </Stack>
                    <Stack className="h2 white-90" sx={{mb: 7}}>Копировальщик до 10.000$</Stack>

                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    <Stack spacing={7}>
                        <Stack className="h2 white-100">Выберите счет для продукта</Stack>
                        {
                            accountsData && accountsData.data.map(item =>
                                <Paper
                                    key={item.id}
                                    onClick={() => setForexAccountData({
                                        id: item.id,
                                        login: item.login ? item.login : ''
                                    })}
                                    sx={{
                                        borderColor: forexAccountData.id === item.id ? '#6FCF97' : '',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Stack direction={mediaQuery ? "row" : "column"} justifyContent="space-between">
                                        <Stack direction="row" justifyContent="space-between" spacing={7}>
                                            <Stack alignItems="center" spacing={2}>
                                                            <span className="subHeaders white-90">
                                                                {item.login}
                                                            </span>
                                                <span className="subHeadersBold">
                                                                {item.name ? item.name : '---'}
                                                            </span>
                                            </Stack>

                                            {/*item.product?.product_data?.id*/}
                                            {
                                                item.product?.product_data?.id == productId ?
                                                    <Button variant="contained" color="info">Уже подключено</Button>
                                                    : item.product?.assigned ?
                                                        <Button color="success">Подключено</Button>
                                                        : <Button color="neutral">Подключить</Button>

                                            }
                                        </Stack>
                                        <Stack direction="row" justifyContent="space-between" spacing={7}>
                                            {
                                                item?.server.type === 0 ?
                                                    <Chip label="Центовый" variant="filled" color="neutral"
                                                          sx={{pr: 0, pl: 0}}/>
                                                    :
                                                    <Chip label="Долларовый" variant="filled" color="warning"
                                                          sx={{pr: 0, pl: 0}}/>
                                            }
                                            <Stack alignItems="center" spacing={2}>
                                                            <span className="subHeaders white-90">
                                                              Прирост
                                                            </span>
                                                <span
                                                    className={
                                                        item.stats?.balance?.gain.percent > 0 ?
                                                            "subHeadersBold green"
                                                            : 'subHeadersBold red'
                                                    }
                                                >
                                                                {item.stats?.balance?.gain.percent}%
                                                            </span>
                                            </Stack>
                                            <Stack alignItems="center" spacing={2}>

                                                            <span className="subHeaders white-90">
                                                                Баланс
                                                            </span>
                                                <span className="subHeaders yellow">
                                                                {item.stats?.balance?.value}
                                                            </span>
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </Paper>
                            )
                        }
                        <Button
                            onClick={()=>{
                                setForexAccountData({id: 0, login: ''})
                            }}
                            fullWidth
                            color="neutral"
                            sx={{height: 68}}>Без счета</Button>
                        <Stack direction="row" spacing={7} justifyContent="flex-end">
                            <Button onClick={handlerClose} color="error">Отмена</Button>
                            <Button onClick={handleUpdate} color="success">Сохранить</Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
            {/*<SettingsProductChildModal accountId={forexAccountData.id} productId={productId} openModal={openModalChild}*/}
            {/*                           closeModal={setOpenModalChild}/>*/}
        </>
    );
}

export default SettingProductModal;
