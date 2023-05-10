import {FC, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Alert, Divider, IconButton, Slider, Snackbar, Stack} from "@mui/material";
import IconClose from "../../../shared/assets/images/icons/iconClose";
import CustomInput from "../../../shared/UI/customInput";
import CustomRange from "../../../shared/components/customRange";
import CustomLineChart from "../chart/customLineChart";
import Chart from "../chart/chart";
import IconSettings from "../../../shared/assets/images/icons/iconSettings";


interface IType {
    maxWidth?: number;
    openModal: boolean;
    closeModal?: any;
    isOPenBtn?: boolean;
    setHunterModBtn: (text: string) => void;
    setConnectionHunterMod: (visible: boolean) => void;
}

const HunterModModal: FC<IType> = ({maxWidth,openModal, closeModal, isOPenBtn, setHunterModBtn, setConnectionHunterMod}) => {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [referenceLineData, setReferenceLineData] = useState(1000);

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
    const handleSave = () => {
        closeModal(false)
        setOpen(false);
        setStep(1)
        setHunterModBtn('Hunter Mod - Активен')
        setConnectionHunterMod(false)
    };
   const handleRange = (value:any) => {
       setReferenceLineData(value)
    };

    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={step === 3}
            >
                <Alert severity="success" icon={false}>
                    Успешно!
                </Alert>
            </Snackbar>
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
                    <Stack className="h2 blue" sx={{mb: 7}}>Hunter Mod</Stack>

                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    {
                        (step === 1) ?
                            <Stack className="h2">
                                <Chart title="График" icon="bad">
                                    <CustomLineChart/>
                                </Chart>
                            </Stack>
                            :
                            <Stack spacing={7}>
                                <Chart title="График" icon="bad">
                                    <CustomLineChart referenceLineData={referenceLineData}/>
                                </Chart>
                                <Stack direction="row" spacing={7}>
                                    {/*<CustomInput  label="Значения (%)"/>*/}
                                    <Button fullWidth color="neutral" startIcon={<IconSettings/>}>Автоматическая
                                        настройка</Button>
                                </Stack>
                                <CustomRange minValue={1000} maxValue={5000} title="Риск в процентах" required isSwitch isSliderRange/>
                                <CustomRange title="Мин. лот" required isSwitch/>
                            </Stack>

                    }
                    <Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>

                        {
                            step === 2 ?
                                <Button onClick={() => setStep(step - 1)} color="neutral">Назад</Button>
                                : <Button onClick={handleClose} color="error">Отклонить</Button>
                        }

                        {
                            step === 1 ?
                                <Button onClick={() => setStep(step + 1)} color="success">Продожить</Button>
                                :
                                <Button onClick={handleSave} color="success">Сохранить</Button>
                        }

                    </Stack>
                </Box>
            </Modal>
        </>
    );
}
export default HunterModModal;