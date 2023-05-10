import React, {FC, useState} from 'react';
import Paper from "@mui/material/Paper";
import {Avatar, Divider, Stack, useMediaQuery} from "@mui/material";
import {NavLink} from "react-router-dom";
import Button from "@mui/material/Button";
import IconProduct from "../../shared/assets/images/icons/iconProduct";
import {IProducts} from "../../types";
import SettingProductModal from "./modal/settingProductModal";
import PaymentModal from "./modal/paymentModal";


const MyProductItem: FC<IProducts> = ({id,status, valid_to, sub_title, title, slug}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [openModal, setOpenModal] = useState(false);
    const [openPaymentModal, setOpenPaymentModal] = useState(false)
    const [paymentLinkId, setPaymentLinkId] = useState(-1)
    return (
        <Paper>
            <Stack
                direction={mediaQuery ? "row" : "column"}
                alignItems={mediaQuery ? "center" : "flex-start"}
                justifyContent="space-between"
                spacing={7}>
                <Stack direction="row" alignItems="center" spacing={7}>
                    <IconProduct status={status}/>
                    <Stack>
                        <NavLink className="link" to={'/'}>Счет {slug}</NavLink>
                        <span className="subHeadersBold green">{sub_title}</span>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={7}>
                    <Stack alignItems="center" spacing={2}>
                        <span className="subHeaders white-90">Статус</span>
                        <span className="subHeadersBold green">
                            {
                                status === 0 ? <span className="subHeadersBold red">Не активен</span> :
                                    status === 1 ? <span className="subHeadersBold green">Активен</span> :
                                        status === 2 ? <span className="subHeadersBold red">Требуется продление</span>
                                            : <span className="subHeadersBold orange">Не привязан</span>
                            }
                        </span>
                    </Stack>
                    <Divider orientation="vertical" flexItem/>
                    <Stack alignItems="center" spacing={2}>
                        <span className="subHeaders white-90">Дата валидности</span>
                        <span className="subHeadersBold">{valid_to ? valid_to : '---'}</span>
                    </Stack>
                </Stack>
                <Stack direction="row" alignItems="center" spacing={7}>
                    <Button color="neutral">Продлить</Button>
                    <Button onClick={() => setOpenModal(true)} color="neutral">Настройки</Button>
                </Stack>
            </Stack>
            {
                openModal && <SettingProductModal productId={id} openModal={openModal} closeModal={setOpenModal}/>
            }
            {
                (openPaymentModal) &&
                <PaymentModal paymentLinkId={paymentLinkId} openModal={openPaymentModal}
                              closeModal={setOpenPaymentModal}/>
            }
        </Paper>
    );
};

export default MyProductItem;
