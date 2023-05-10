import React, {FC, useEffect, useState} from 'react';
import {useAddAccountMutation, useGetAccountsQuery, useGetServersQuery} from "../../../store/API/userApi";
import {useInput} from "../../../hooks/useInput";
import {Alert, Chip, Divider, Pagination, Skeleton, Snackbar, Stack, useMediaQuery} from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconClose from "../../../shared/assets/images/icons/iconClose";
import CustomInput from "../../../shared/UI/customInput";
import CustomSelect from "../../../shared/UI/customSelect";
import Button from "@mui/material/Button";
import IconPlay from "../../../shared/assets/images/icons/iconPlay";
import Paper from "@mui/material/Paper";
import {
    useCreateNewProductMutation, useGetAllAddValidateProductsQuery,
    useGetPaymentLinkQuery,
    useGetProductsBySlugQuery
} from "../../../store/API/productApi";
import IconPlus from "../../../shared/assets/images/icons/iconPlus";
import {Link} from "react-router-dom";
import SimpleModal from "./simpleModal";
import PaymentModal from "./paymentModal";

interface IType {
    stateModal?: any;
    openModal: boolean;
    closeModal: any;
    isOPenBtn?: boolean
    isError?: boolean
}

const AddProductModal: FC<IType> = ({stateModal, openModal, closeModal}) => {
    const [paymentLinkId, setPaymentLinkId] = useState(-1)
    const [accountPage, setAccountPPage] = useState(1);
    const [productsPage, setProductsPPage] = useState(1);
    console.log(accountPage)
    console.log(productsPage)
    const {data, isLoading, error} = useGetProductsBySlugQuery({slug: stateModal.slug, page:accountPage})
    const {data: accountsData, error: accountsError, isLoading: accountsLoading} = useGetAllAddValidateProductsQuery(productsPage)
    const [createNewProduct, {
        data: dataPayLink,
        error: productError,
        isLoading: productLoading
    }] = useCreateNewProductMutation()
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const [open, setOpen] = useState(false)
    const [openPaymentModal, setOpenPaymentModal] = useState(false)


    // const [userProductId, setUserProductId] = useState('')
    const [forexAccountData, setForexAccountData] = useState({id: -1, login: ''});

    const [step, setStep] = useState(1);

    useEffect((() => {
        setPaymentLinkId(dataPayLink)
        setOpenPaymentModal(true)
        setOpen(openModal)
    }), [open, openModal, dataPayLink])

    const handleChangeAccountPPage = (event: React.ChangeEvent<unknown>, value: number) => {
        setAccountPPage(value);
    };
    const handleChangeProductsPPage = (event: React.ChangeEvent<unknown>, value: number) => {
        setProductsPPage(value);
    };
    const handlerClose = () => {
        closeModal(false)
        setOpen(false)
        setStep(1)
    };
    const createProduct = () => {
        createNewProduct({
            body: {
                forex_account_id: forexAccountData.id
            },
            slug: stateModal.slug
        }).then(() => {

        })
        if (!productLoading && dataPayLink) {
            // setStep(step+1)
            console.log(dataPayLink)
            console.log(paymentLinkId)
            setPaymentLinkId(dataPayLink)
            setOpenPaymentModal(true)
        }
    };


    return (
        <>

            <Modal
                open={open}
                onClose={handlerClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >

                <Box sx={{maxWidth: step === 3 ? 620 : 780}}>
                    <Stack onClick={handlerClose} sx={{position: "absolute", top: 14, right: 28, cursor: "pointer"}}>
                        <IconClose/>
                    </Stack>
                    <Stack className="h2 white-90" sx={{mb: 7}}>Продукт</Stack>

                    <Divider variant="fullWidth" sx={{mb: 7}}/>
                    {


                        (step === 1) ?
                            <>
                                <Stack direction={mediaQuery ? "row" : "column"} spacing={7}
                                       justifyContent="space-between"
                                       sx={{mb: 14}}>
                                    <Stack justifyContent="space-between" spacing={7}>
                                        <Stack justifyContent="space-between" spacing={7}>
                                        <span className={stateModal.id === 3 ? "h1 pink" : "h1 green"}>
                                            {stateModal.name} {stateModal.priceTitle}
                                        </span>
                                            <p className="subHeaders white-90">{stateModal.text}</p>
                                        </Stack>
                                        <Stack direction={mediaQuery ? "row" : "column"} spacing={7}>
                                            <Button color="neutral">Читать подробнее</Button>
                                            <Button color="error" startIcon={<IconPlay/>}>Посмотреть
                                                презентацию</Button>
                                        </Stack>
                                    </Stack>
                                    <Stack alignItems="center" justifyContent="space-between" spacing={7}>
                                        <img src={stateModal.image} alt="Копировальщик"/>
                                        <Chip
                                            icon={<Stack sx={{color: '#BDBDBD !important'}}>Цена:</Stack>}
                                            label={
                                                stateModal.sale?.isSale ?
                                                    stateModal.price + ' ' + stateModal.sale?.priceSale
                                                    : stateModal.price
                                            }
                                            color="warning" variant="outlined"/>
                                    </Stack>

                                </Stack>
                                <Stack spacing={7}>
                                    <Stack className="h2 white-90">Подключенные к продукту счета</Stack>
                                    {
                                        isLoading ?
                                            <Skeleton variant="rectangular" width={`100%`} height={46}/>
                                            : data ?
                                                data.data.map((item: any) =>
                                                    // item.forex_account?.assigned &&
                                                    <Paper key={item.id}>
                                                        <Stack direction={mediaQuery ? "row" : "column"} spacing={7}
                                                               justifyContent="space-between">
                                                            <Stack alignItems="center" spacing={2}>
                                                                    <span className="subHeaders white-90">
                                                                        {item.forex_account?.account_data?.login}
                                                                    </span>
                                                                <span className="subHeadersBold">
                                                                        {
                                                                            item.forex_account?.account_data?.name ?
                                                                                item.forex_account?.account_data?.name
                                                                                : '---'
                                                                        }
                                                                    </span>
                                                            </Stack>
                                                            <Stack alignItems="center" spacing={2}>
                                                                <span className="subHeaders white-90">Статус</span>
                                                                <span className="subHeadersBold green">
                                                                        {
                                                                            item.status === 0 ?
                                                                                <span className="subHeadersBold red">Не активен</span> :
                                                                                item.status === 1 ?
                                                                                    <span
                                                                                        className="subHeadersBold green">Активен</span> :
                                                                                    item.status === 2 ?
                                                                                        <span
                                                                                            className="subHeadersBold red">Требуется продление</span>
                                                                                        : <span
                                                                                            className="subHeadersBold orange">Не привязан</span>
                                                                        }
                                                                    </span>
                                                            </Stack>
                                                            <Divider orientation="vertical" flexItem/>
                                                            <Stack alignItems="center" spacing={2}>
                                                                <span className="subHeaders white-90">Дата валидности</span>
                                                                <span
                                                                    className="subHeadersBold">{item.valid_to ? item.valid_to : '---'}</span>
                                                            </Stack>
                                                            <Button color="neutral">Продлить</Button>
                                                            <Button color="neutral">Настройки</Button>
                                                        </Stack>
                                                    </Paper>
                                                )
                                                :
                                                <Stack>Ошибка при загрузке данных</Stack>
                                    }
                                    <Button
                                        fullWidth
                                        onClick={() => setStep(2)}
                                        color="neutral"
                                        startIcon={<IconPlus/>}
                                        sx={{height: 48, justifyContent: 'flex-start'}}
                                    >
                                        Новый заказ
                                    </Button>
                                </Stack>
                            </>
                            : (step === 2) ?
                                <Stack spacing={7}>

                                    <Stack className="h2 white-100">Выберите счет для продукта</Stack>

                                    {
                                        accountsData && accountsData.data.map((item:any) =>
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
                                                <Stack direction={mediaQuery ? "row" : "column"} justifyContent="space-between"
                                                       spacing={7}>
                                                    <Stack direction="row" justifyContent="space-between" spacing={7}>
                                                        <Stack alignItems="center" spacing={2}>
                                                            <span className="subHeaders white-90">
                                                                {item.login}
                                                            </span>
                                                            <span className="subHeadersBold">
                                                                {item.name ? item.name : '---'}
                                                            </span>
                                                        </Stack>
                                                        {
                                                            item.product?.assigned ?
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

                                </Stack>
                                : (step === 3) ?

                                    productError ? 'ошибка при добавлении'
                                        :

                                        <Stack className="h2 white-100" spacing={28}>
                                        <span>
                                            <span>Вы хотите подключить продукт</span>
                                            <span
                                                className="yellow">&nbsp;{stateModal.name} {stateModal.priceTitle}&nbsp;</span>
                                            <span>на счет</span>
                                            <span className="blue">&nbsp;{forexAccountData.login}</span>
                                        </span>
                                            <span>
                                            <span>Сумма заказа:</span>
                                            <span className="green">&nbsp;{stateModal.price}</span>
                                        </span>
                                        </Stack>
                                    : null
                    }
                    <Stack direction="row" justifyContent="flex-end" spacing={7} sx={{mt: 7}}>
                        {
                            data?.meta?.pagination?.total_pages > 1 &&
                            <Pagination
                                page={step === 1 ? accountPage : productsPage}
                                onChange={step === 1 ? handleChangeAccountPPage : handleChangeProductsPPage}
                                color="primary"
                                count={step === 1 ? data?.meta?.pagination?.total_pages : accountsData?.meta?.pagination?.total_pages}
                                variant="outlined"
                                shape="rounded"
                                sx={{mr: 'auto'}}
                            />

                        }
                        {
                            (step === 1) ?
                                <Button onClick={handlerClose} color="neutral">Отмена</Button>
                                :
                                <Button onClick={() => setStep(step - 1)} color="neutral">Назад</Button>
                        }

                        {
                            (step === 2) ?
                                <Button onClick={createProduct} color="success">Создать заказ</Button>
                                :
                                (step === 3) ?
                                    <Button
                                        onClick={handlerClose}
                                        color="success"
                                        component={Link} target="_blank" to="/trader-dashboard"
                                    >Подтвердить и оплатить</Button>
                                    :
                                    null
                        }
                        {
                            productError && <SimpleModal title="Ошибка при добавлении продукта" openModal={true}/>
                        }

                    </Stack>

                </Box>
            </Modal>

            {
                (openPaymentModal && dataPayLink) &&
                <PaymentModal stateModal={stateModal}  paymentLinkId={paymentLinkId} openModal={openPaymentModal}
                              closeModal={setOpenPaymentModal}/>
            }

        </>
    );
}

export default AddProductModal;