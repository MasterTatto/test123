import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Divider, Modal, Snackbar, Stack} from "@mui/material";
import IconClose from "../../../shared/assets/images/icons/iconClose";


interface IType {
    children?: any;
    maxWidth?: number;
    title?: string;
    closeModal?: any;
    openModal: boolean;
}

const SimpleModal: FC<IType> = ({children, maxWidth, title, openModal, closeModal}) => {
    const [open, setOpen] = useState(false);

    useEffect((() => {
        setOpen(openModal)
    }), [open, openModal])

    const handleClose = (e:any) => {
        e.preventDefault()
        closeModal(false)
        setOpen(false)
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{maxWidth:maxWidth ? maxWidth :620}}>
                    <Stack onClick={handleClose} sx={{position: "absolute", top: 14, right: 28, cursor: "pointer"}}>
                        <IconClose/>
                    </Stack>
                    <Stack className="h2 white-90" sx={{mb: 7}}>{title}</Stack>
                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    {children}
                    {/*<Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>*/}
                    {/*    <Button onClick={handleClose} color="error">Отклонить</Button>*/}
                    {/*    <Button onClick={handleContinue} color="success">Продожить</Button>*/}
                    {/*</Stack>*/}
                </Box>
            </Modal>
        </>
    );
};

export default SimpleModal;