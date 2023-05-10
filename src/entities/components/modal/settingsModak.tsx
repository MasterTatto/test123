import {FC, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Divider, IconButton, Stack} from "@mui/material";
import IconClose from "../../../shared/assets/images/icons/iconClose";
import CustomRange from "../../../shared/components/customRange";
import CustomSelect from "../../../shared/UI/customSelect";
import CopyTradingModalChild from "./copyTradingModalChild";
import * as React from "react";
import CustomInput from "../../../shared/UI/customInput";




interface IType {
    maxWidth?: number;
    openModal: boolean;
    closeModal?: any;
    isOPenBtn?: boolean
}

const SettingsModak: FC<IType> = ({maxWidth, openModal, closeModal, isOPenBtn}) => {
    const [open, setOpen] = useState(false);
    const [openModalChild, setOpenModalChild] = useState(false);
    const [step, setStep] = useState(1);

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
                    <Stack className="h2 white-90" sx={{mb: 7}}>Вы уверены?</Stack>

                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    {
                        (step === 1) ?
                            <div className="h2">
                                <span>Поменять Telegram</span>
                                <span className="blue">&nbsp;@ryabishin&nbsp;</span>
                                <span>на другой?</span>
                            </div>
                            :
                            (step === 2) ?

                                <Stack spacing={7}>
                                    <div className="h2">
                                        <span>
                                            <span>Введите код отправленный ботом на аккаунт</span>
                                            <span className="blue">&nbsp;@ryabishin&nbsp;</span>
                                        </span>

                                        <span>
                                            <span>Бот:</span>
                                            <a href="https://t.me/+yyCB128FQ1JmYTIy"
                                               className="link">&nbsp;https://t.me/+yyCB128FQ1JmYTIy</a>
                                        </span>
                                    </div>
                                    <Stack spacing={7}>
                                        <CustomInput label="Код"/>
                                        <CustomSelect title="Тип"/>
                                    </Stack>
                                </Stack>
                                :(step === 3) ?

                                <Stack spacing={7}>
                                    <div className="h2">
                                        <Stack>
                                            <span>Введите в бота с нового аккаунта код ниже:</span>
                                            <span>
                                                <span>Бот:</span>
                                                <span className="blue">&nbsp;https://t.me/+yyCB128FQ1JmYTIy</span>
                                            </span>
                                        </Stack>
                                    </div>
                                    <Stack className="h1 green" sx={{textAlign:"center"}}>50342</Stack>
                                </Stack>
                                :
                                (step === 4) ?
                                    <div className="h2">
                                        <span className="green">Успешно!</span>
                                        <span>&nbsp;Новый аккаунт привязан!</span>
                                    </div>
                                    : null

                    }
                    <Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>
                        {
                            step === 2 ?
                                <Button onClick={() => setStep(step - 1)} color="neutral">Назад</Button>
                                :
                                step === 4 ? null
                                    :
                                    <Button onClick={handleClose} color="error">Отклонить</Button>
                        }

                        {

                                step === 4 ?
                                    <Button onClick={() => {
                                        handleClose()
                                        setStep(1)
                                    }
                                    } color="success">Закрыть</Button>
                                    :
                                    <Button onClick={() => setStep(step + 1)} color="success">Продожить</Button>
                        }

                    </Stack>
                </Box>
            </Modal>
            <CopyTradingModalChild step={step} setStep={setStep} openModal={openModalChild}
                                   closeModal={setOpenModalChild}/>
        </>
    );
};

export default SettingsModak;