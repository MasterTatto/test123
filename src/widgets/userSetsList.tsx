import React, {FC, useState} from 'react';
import Paper from "@mui/material/Paper";
import {Divider, Grid, Pagination, Skeleton, Stack, TextField, useMediaQuery} from "@mui/material";
import IconSet from "../shared/assets/images/icons/iconSet";
import Chart from "../entities/components/chart/chart";
import BalanceChart from "./balanceChart";
import Button from "@mui/material/Button";
import IconConnected from "../shared/assets/images/icons/iconConnected";
import IconTraders from "../shared/assets/images/icons/iconTraders";
import {useAddAccountSubscribeMutation, useGetSetQuery} from "../store/API/userApi";
import SimpleModal from "../entities/components/modal/simpleModal";


interface IType {
    children?: any
}

const UserSetsList: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [page, setPage] = useState(1);
    const {data, isLoading, error} = useGetSetQuery(page)
    const [addAccountSubscribe] = useAddAccountSubscribeMutation()

    const [openModalConnection, setOpenModalConnection] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    if (isLoading) {
        return (
            <Paper>
                <Skeleton variant="rounded" width={`100%`} height={433}/>
            </Paper>
        )
    }
    const closeModal = () => {
        setOpenModalConnection(false)
        setOpenModal(false)
    }
    const handleConnection = () => {
        addAccountSubscribe({
            idSet: '',
            traderId: '',
        })
    }
    return (
        <Stack spacing={7}>
            {
                data &&
                data?.data?.map((item:any)=>
                    <Paper key={item?.id}>
                        <Stack direction="row" spacing={7} alignItems="center" sx={{mb: 7}}>
                            <IconSet/>
                            <span className="h2 white-90">Сет {item?.name}</span>
                        </Stack>
                        <Divider variant="fullWidth" sx={{mb: 7, width: `103%`}}/>
                        <Grid
                            direction={!mediaQuery ? "column-reverse" : "row"}
                            container
                            spacing={10}
                            columns={12}
                            wrap="wrap"
                            sx={{mb: 7}}
                        >
                            <Grid item xs={12} md={5}>
                                <Chart
                                    title="Доходность"
                                >
                                    <BalanceChart data={item?.graph}/>
                                </Chart>
                            </Grid>
                            <Grid item xs={12} md={7}>
                                <Stack className="subHeaders white-80" spacing={7}>
                                    <p>
                                        {item?.description}
                                    </p>
                                </Stack>
                            </Grid>
                        </Grid>
                        <Grid container spacing={10} columns={12} wrap="wrap" alignItems="stretch">
                            <Grid item xs={16} md={5}>

                                <Button
                                    onClick={() => setOpenModalConnection(true)}
                                    fullWidth
                                    variant="gardient"
                                    color="warning"
                                    startIcon={<IconConnected/>}
                                    sx={{height: 48}}
                                >Подключиться</Button>

                            </Grid>
                            <Grid item xs={16} md={7}>
                                <Button fullWidth color="neutral" startIcon={<IconTraders/>} sx={{height: 48}}
                                        onClick={() => setOpenModal(true)}>
                                    Подключенные трейдеры
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                )
            }
            {
                data?.meta?.pagination?.total_pages > 1 &&
                <Pagination
                    page={page}
                    onChange={handleChangePage}
                    color="primary"
                    count={data?.meta?.pagination?.total_pages}
                    variant="outlined"
                    shape="rounded"
                    sx={{mr: 'auto'}}
                />

            }
            <SimpleModal title="Настройки" openModal={openModalConnection}
                         closeModal={setOpenModalConnection}>
                <Stack spacing={7}>

                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button onClick={closeModal} color="error">Отмена</Button>
                        <Button
                            onClick={handleConnection}
                            color="success">Подключить</Button>
                    </Stack>
                </Stack>
            </SimpleModal>
        </Stack>
    );
};

export default UserSetsList;
