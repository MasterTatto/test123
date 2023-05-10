import React, {FC, useState} from 'react';
import CustomInput from "../../shared/UI/customInput";
import {Chip, IconButton, Stack, TextareaAutosize, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import IconPassword from "../../shared/assets/images/icons/iconPassword";
import SimpleModal from "./modal/simpleModal";
import {useUpdateForexAccountMutation} from "../../store/API/forexAccountsApi";

interface IType {
    id: number | string;
    numberAccount?: number;
    passwordAccount?: number | string;
    login?: string;
    server?: number;
    status?: number;
    rejectReason?: string;
    createdAt: string;
}

const ForexItem: FC<IType> = ({
                                  id,
                                  numberAccount,
                                  passwordAccount,
                                  login,
                                  server,
                                  status,
                                  createdAt
                              }) => {
    const [updateForexAccount] = useUpdateForexAccountMutation()
    const [openModal, setOpenModal] = useState(false);
    const [reasonValue, setReasonValue] = useState('');
    const [textBtn, setTextBtn] = useState('Скопировать')
    const handlerUpdateForexAccount = () => {
        updateForexAccount({
            body: {
                status: -1,
                reject_reason: reasonValue !== '' ? reasonValue : null
            },
            id
        }).then(() => {
            setOpenModal(false)
        })
    }
    const handlerCopy = (copy: any) => {
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
            <Stack spacing={7}>
                <TextField
                    fullWidth
                    value={numberAccount}
                    label="Номер счета"
                    type="text"
                    InputProps={{
                        endAdornment:
                            <IconButton size="small" sx={{height: 15, color: '#828282', fontSize: 12}}
                                        onClick={() => handlerCopy(numberAccount)}
                            >
                                {textBtn}
                            </IconButton>
                    }}
                    sx={{color: '#828282'}}
                />
                <TextField
                    fullWidth
                    value={passwordAccount}
                    label="Пароль от счета"
                    type="text"
                    InputProps={{
                        endAdornment:
                            <IconButton size="small" sx={{height: 15, color: '#828282', fontSize: 12}}
                                        onClick={() => handlerCopy(passwordAccount)}
                            >
                                {textBtn}
                            </IconButton>
                    }}
                />
                {
                    login &&
                    <TextField fullWidth value={login} label="Телеграм" type="text"/>
                }


                <Stack direction="row" justifyContent="space-between">
                    <span className="subHeaders white-90">Сервер счета</span>
                    <Chip label={server} variant="outlined" color="neutral"/>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Stack className="subHeaders" alignItems="center">
                        <span className="white-80">Дата заявки</span>
                        <span className="white-90">{createdAt}</span>
                    </Stack>
                    <Stack direction="row" spacing={7}>
                        {
                            status === -1 ?
                                <Button onClick={() => setOpenModal(true)} color="neutral">Причина</Button>
                                : <Button onClick={() => setOpenModal(true)} variant="contained"
                                          color="error">Отклонить</Button>
                        }
                        {
                            status === -1 ?
                                <Button variant="contained" color="error">Отклонено</Button>
                                : status === 0 ?
                                    <Button onClick={() => {
                                        updateForexAccount({body: {status: 1}, id})
                                    }} variant="contained"
                                            color="success">Подтвердить</Button>
                                    :
                                    <Button variant="contained" color="success">Подтверждено</Button>
                        }

                    </Stack>
                </Stack>
            </Stack>
            <SimpleModal title="Причина отказа" openModal={openModal} closeModal={setOpenModal}>
                <Stack spacing={7}>
                    <Stack className="h2 white-100">
                        Отклонить заявку?
                    </Stack>
                    <Stack>
                        <TextField
                            value={reasonValue}
                            label="Напишите причину отказа"
                            multiline
                            minRows={10}
                            onChange={(e) => setReasonValue(e.target.value)}
                        />

                    </Stack>


                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button color="error" onClick={() => setOpenModal(false)}>Отмена</Button>
                        <Button onClick={handlerUpdateForexAccount} color="success">Подтвердить</Button>
                    </Stack>
                </Stack>
            </SimpleModal>
        </Paper>
    );
};

export default ForexItem;