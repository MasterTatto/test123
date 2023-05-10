import React, {FC, useEffect, useMemo, useState} from 'react';
import {useInput} from "../../../hooks/useInput";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Alert, Divider, Snackbar, Stack} from "@mui/material";
import IconClose from "../../../shared/assets/images/icons/iconClose";
import CustomInput from "../../../shared/UI/customInput";
import Button from "@mui/material/Button";
import CustomSelect from "../../../shared/UI/customSelect";
import {
    useAddServerMutation,
    useDeleteServerMutation,
    useGetAllServersQuery,
    useUpdateServerMutation
} from "../../../store/API/serverApi";

interface IType {
    maxWidth?: number;
    openModal: boolean;
    closeModal: any;
    title?: string;
    updateServerNumber?: number;
    serverName?: string;
    isAddServer?: boolean;
    isUpdateServer?: boolean;
    isDeleteServer?: boolean;
}

const ServerModal: FC<IType> = ({
                                       openModal,
                                       closeModal,
                                       title,
                                       maxWidth,
                                       serverName,
                                       updateServerNumber,
                                       isAddServer,
                                       isUpdateServer,
                                       isDeleteServer,
                                   }) => {

    const [addServer, {error, isLoading}] = useAddServerMutation()
    const [updateServer, {error: updateError, isLoading: isLoadingUpdate}] = useUpdateServerMutation()
    const [deleteServer, {error: deleteError, isLoading: isLoadingDelete}] = useDeleteServerMutation()
    const [open, setOpen] = useState(false);
    const [errorInput, setErrorInput] = useState(false);
    const [errorSelect, setErrorSelect] = useState(false);
    const input = useInput('', errorInput)
    const [serverNumber, setServerNumber] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    useEffect((() => {
        setOpen(openModal)
    }), [open, openModal, openSnackbar])

    const handlerAdd = () => {
        if (isDeleteServer) {
            deleteServer(updateServerNumber).then(() => {
                    if (deleteError !== undefined) {
                        setOpenSnackbar(true)
                    } else if (!isLoadingDelete) {
                        closeModal(false)
                        setOpen(false);
                    }
                }
            )
        }

        if (input.value !== '' && serverNumber !== '') {
            if (isAddServer) addServer({title: input.value, type: serverNumber})
                .then(() => {
                    if (!isLoading) {
                        closeModal(false)
                        setOpen(false)
                    }
                })
                .then(() => {
                    if (error !== undefined) setOpenSnackbar(true)
                })
            if (isUpdateServer) updateServer({
                body: {title: input.value, type: serverNumber},
                id: updateServerNumber
            })
                .then(() => {
                    if (!isLoadingUpdate) {
                        closeModal(false)
                        setOpen(false);
                    }
                })
                .then(() => {
                    if (updateError !== undefined) setOpenSnackbar(true)
                })
        }
        if (input.value === '') setErrorInput(true)
        if (serverNumber === '') setErrorSelect(true)

    }
    const handlerClose = () => {
        closeModal(false)
        setOpen(false);
    };
    return (
        <>
            <Snackbar
                anchorOrigin={{vertical: 'top', horizontal: 'center',}}
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert severity="error" icon={false}>Ошибка</Alert>
            </Snackbar>
            <Modal
                open={open}
                onClose={handlerClose}
                aria-describedby="parent-modal-description"
            >
                <Box sx={{maxWidth: maxWidth ? maxWidth : 620}}>
                    <Stack onClick={handlerClose} sx={{position: "absolute", top: 14, right: 28, cursor: "pointer"}}>
                        <IconClose/>
                    </Stack>
                    <Stack className="h2 white-90" sx={{mb: 7}}>{title}</Stack>

                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    {
                        isDeleteServer ?
                            <Stack spacing={7}>
                                <div className="h2">
                                    <span>Удалить</span>
                                    <span className="blue">&nbsp;Сервер {serverName}</span>
                                    <span>?</span>
                                </div>
                            </Stack>
                            :
                            <Stack spacing={7}>
                                <CustomInput dataInput={input} label="Название сервера"/>
                                <CustomSelect
                                    title="Сервер счета"
                                    defaultValue="Выбрать сервер"
                                    optionValue={setServerNumber}
                                    options={[{title: 'Центовый', id: 0}, {title: 'Долларовый', id: 1}]}
                                    isError={errorSelect}
                                />
                            </Stack>
                    }
                    <Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>
                        <Button onClick={() => setOpen(false)} color="neutral">Отмена</Button>
                        <Button onClick={handlerAdd}
                                color="success">{isDeleteServer ? "Подтвердить" : "Добавить"}</Button>
                    </Stack>
                </Box>
            </Modal>
        </>
    );
};

export default ServerModal;