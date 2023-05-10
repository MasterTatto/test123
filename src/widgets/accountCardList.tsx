import React, {FC, useState} from 'react';
import AccountCard from "../entities/components/accountCard";
import {Grid, Card, Stack, useMediaQuery, Skeleton, Typography, Pagination} from "@mui/material";
import IconPlus from "../shared/assets/images/icons/iconPlus";
import AccountModal from "../entities/components/modal/accountModal";
import {IUserAccounts} from "../types";
import {useGetAccountsQuery} from "../store/API/userApi";
import Paper from "@mui/material/Paper";

interface T {
}

const AccountCardList: FC<T> = ({}) => {
    const [accountPage, setAccountPPage] = useState(1);
    const {data, error, isLoading} = useGetAccountsQuery(accountPage)
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const [openModal, setOpenModal] = useState(false);

    if (error) {
        return (
            <Paper>
                <span className="h1">Не удалось загрузить данные счета</span>
            </Paper>
        )
    }

    const handleChangeAccountPage = (event: React.ChangeEvent<unknown>, value: number) => {
        setAccountPPage(value);
    };
    return (
        <>
            <Grid container spacing={10} columns={16} wrap="wrap">
                <Grid item xs={16} md={8} onClick={() => setOpenModal(true)} sx={{cursor: "pointer"}}>
                    <Stack sx={{height: mediaQuery ? 400 : 110,  border: ` 0.5px dashed #3C3C3C`, borderRadius: 2.5, overflow: 'hidden'}}>
                        <Stack justifyContent="center" alignItems="center" sx={{height: `100%`}}>
                            <Stack sx={{mb: 7}}>
                                <IconPlus size={20} color="#3C3C3C"/>
                            </Stack>
                            <Stack className="white-80">Добавить счет</Stack>
                        </Stack>
                    </Stack>
                </Grid>
                {
                    isLoading ?
                        <Grid item xs={16} md={8}>
                            <Stack sx={{
                                height: 400,
                                border: ` 0.5px solid #3C3C3C`,
                                borderRadius: 2.5,
                                overflow: 'hidden'
                            }}
                                   spacing={7}>
                                <Skeleton variant="rounded" width={`100%`} height={`100%`}/>
                            </Stack>
                        </Grid>
                        :
                        data?.data.map((item: IUserAccounts) =>
                            <Grid item xs={16} md={8} key={item.login}>
                                <AccountCard
                                    isLoading={isLoading}
                                    accountLogin={item.login}
                                    accountName={item.name}
                                    status={item.status}
                                    productType={item?.product?.product_data?.title}
                                    balance={item?.stats?.balance}
                                    accountNumber={item.id}
                                    accountType={item.server}
                                    addRepeat={setOpenModal}
                                    depositLoad={item?.stats?.balance?.deposit_load}
                                />
                            </Grid>
                        )
                }
            </Grid>
            <AccountModal openModal={openModal} closeModal={setOpenModal}/>
            {
                data?.meta?.pagination?.total_pages > 1 &&
                <Pagination
                    page={accountPage}
                    onChange={handleChangeAccountPage}
                    color="primary"
                    count={data?.meta?.pagination?.total_pages}
                    variant="outlined"
                    shape="rounded"
                    sx={{mr: 'auto', ml:'auto', mt:14,maxWidth: 'max-content'}}
                />

            }
        </>
    );
};

export default AccountCardList;