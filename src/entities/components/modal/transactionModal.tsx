import {FC, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Chip, Divider, IconButton, Slider, Stack} from "@mui/material";
import IconClose from "../../../shared/assets/images/icons/iconClose";
import CustomInput from "../../../shared/UI/customInput";
import * as React from "react";
import CustomRange from "../../../shared/components/customRange";
import CustomSelect from "../../../shared/UI/customSelect";
import CopyTradingModalChild from "./copyTradingModalChild";
import Paper from "@mui/material/Paper";
import TransactionHistory from "../../transactionHistory";
import {useInput} from "../../../hooks/useInput";


interface IType {
    maxWidth?: number;
    openModal: boolean;
    closeModal?: any;
    isOPenBtn?: boolean
}

const TransactionModal: FC<IType> = ({maxWidth, openModal, closeModal, isOPenBtn}) => {
    const [open, setOpen] = useState(false);
    const [openModalChild, setOpenModalChild] = useState(false);
    const [step, setStep] = useState(1);
    const [errorInput, setErrorInput] = useState(false);
    const input = useInput('',errorInput)

    useEffect((() => {
        setOpen(openModal)
    }), [open, openModal])
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        closeModal(false)
        setOpen(false);
        setStep(1)
    };

    return (
        <>
            {/*<Snackbar*/}
            {/*    anchorOrigin={{  vertical: 'top', horizontal: 'center',}}*/}
            {/*    open={true}*/}
            {/*    message="I love snacks"*/}
            {/*/>*/}
            {isOPenBtn && <Button onClick={handleOpen}>Open modal</Button>}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{maxWidth:maxWidth ? maxWidth :620}}>
                    <Stack onClick={handleClose} sx={{position: "absolute", top: 14, right: 28, cursor: "pointer"}}>
                        <IconClose/>
                    </Stack>
                    <Stack className="h2 white-90" sx={{mb: 7}}>Вывод средств</Stack>
                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    {
                        (step === 1) ?
                            <>
                                <CustomInput label="Сумма на вывод" dataInput={input}/>
                                <Stack direction="row" justifyContent="flex-end" sx={{mt: 7}}>
                                    <span className="subHeaders white-90">У Вас на счету 573.23₽</span>
                                </Stack>
                             </>
                            :
                            (step === 2) ?
                                <Paper>
                                    <Stack spacing={7}>
                                        <span className="red">У вас не прикреплена</span>
                                        <span className="blue">&nbsp;Самозанятость!</span>
                                        <p className="subHeaders white-90">
                                            Самоза́нятость — форма получения вознаграждения за свой труд непосредственно
                                            от заказчиков, в отличие от наёмной работы. Оформите ее, чтобы не получать
                                            комиссий и других издержек альтернативных способов сотрудничества
                                        </p>
                                    </Stack>
                                    <Button fullWidth variant="outlined" color="success" sx={{mt:43}}>Внести данные</Button>
                                </Paper>
                                :
                                (step === 3) ?
                                    <div className="h2">

                                    </div>
                                    : null

                    }
                    <Stack direction="row" justifyContent="flex-end" sx={{mt: 7, mb: 7}}>
                        <Button color="neutral">На карту</Button>
                        <Button onClick={() => setStep(step + 1)} color="success">Продожить</Button>
                    </Stack>
                    <Stack className="h2 white-90" sx={{mb: 7}}>История</Stack>
                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    <Stack spacing={7} sx={{maxHeight: 300, overflow: 'hidden', overflowY: 'scroll',}}>
                        <TransactionHistory/>
                        <TransactionHistory/>
                        <TransactionHistory/>
                    </Stack>
                    {/*<Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>*/}
                    {/*    {*/}
                    {/*        step === 2 ?*/}
                    {/*            <Button onClick={() => setStep(step - 1)} color="neutral">Назад</Button>*/}
                    {/*            :*/}
                    {/*            step === 3 ? null*/}
                    {/*                :*/}
                    {/*                <Button onClick={handleClose} color="error">Отклонить</Button>*/}
                    {/*    }*/}

                    {/*    {*/}
                    {/*        step === 2 ?*/}
                    {/*            <Button onClick={() => setOpenModalChild(true)} color="success">Продожить</Button>*/}
                    {/*            :*/}
                    {/*            step === 3 ?*/}
                    {/*                <Button onClick={() => {*/}
                    {/*                    handleClose()*/}
                    {/*                    setStep(1)*/}
                    {/*                }*/}
                    {/*                } color="success">Закрыть</Button>*/}
                    {/*                :*/}
                    {/*                <Button onClick={() => setStep(step + 1)} color="success">Продожить</Button>*/}
                    {/*    }*/}

                    {/*</Stack>*/}
                </Box>
            </Modal>
            <CopyTradingModalChild step={step} setStep={setStep} openModal={openModalChild}
                                   closeModal={setOpenModalChild}/>
        </>
    );
}
export default TransactionModal;