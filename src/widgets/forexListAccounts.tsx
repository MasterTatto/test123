import React, {FC, useEffect, useState} from 'react';
import ForexItem from "../entities/components/ForexItem";
import {IconButton, Pagination, Skeleton, Stack, TextField, useMediaQuery} from "@mui/material";
import CustomSelect from "../shared/UI/customSelect";
import CustomInput from "../shared/UI/customInput";
import {useGetForexAccountsQuery} from "../store/API/forexAccountsApi";
import IconSearch from "../shared/assets/images/icons/iconSearch";

interface IType {
    children?: any
}

const ForexListAccounts: FC<IType> = ({children}) => {
    const [page, setPage] = React.useState(1);
    const [sortValue, setSortValue] = useState('')
    const [validatedValue, setValidatedValue] = useState('null')
    const {data, isLoading, error} = useGetForexAccountsQuery({page, sort:sortValue, search:validatedValue})
    const mediaQuery = useMediaQuery('(min-width:900px)');

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    const handleSearch =(e:any)=>{

    }
    return (
        <Stack spacing={7}>
            <Stack direction={mediaQuery ? "row" : "column"} justifyContent="space-between" spacing={7}>
                <Stack direction={mediaQuery ? "row" : "column"} spacing={7}>
                    <CustomSelect
                        width={130}
                        defaultValue="По дате"
                        options={[
                            {title: 'Сначала старые', id: 'asc'},
                            {title: 'Сначала новые', id: 'desc'}
                        ]}
                        optionValue={setSortValue}
                    />
                    <CustomSelect
                        width={162}
                        defaultValue="По статусу"
                        options={[
                            {title: 'Все', id: "null"},
                            {title: 'Подтвержден', id: '1'},
                            {title: 'Ожидает', id: '0'},
                            {title: 'Отклонен', id: '-1'},
                        ]}
                        optionValue={setValidatedValue}
                    />
                </Stack>
                <Stack sx={{maxWidth: mediaQuery ? 240 : null}}>
                    <TextField
                        fullWidth
                        size="small"
                        type="search"
                        // value={searchValue}
                        onChange={handleSearch}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        InputProps={{
                            startAdornment:
                                <IconButton size="small"
                                >
                                    <IconSearch/>
                                </IconButton>
                        }}
                    />
                </Stack>
            </Stack>
            {
                isLoading ?
                    <Skeleton variant="rectangular" width={`100%`} height={210}/>
                    : data ?
                        data?.data.map((item: any) =>
                            <ForexItem
                                key={item.id}
                                id={item.id}
                                numberAccount={item.id}
                                login={item.telegram.username}
                                passwordAccount={item.password}
                                server={item.server.title}
                                status={item.status}
                                createdAt={item.created_at}
                            />
                        )
                        :
                        <Stack>Ошибка при загрузке данных</Stack>
            }

            {
                data?.meta?.pagination?.total_pages > 1 &&
                <Pagination
                    onChange={handleChange}
                    color="primary"
                    count={data?.meta?.pagination?.total_pages}
                    variant="outlined"
                    shape="rounded"/>

            }
        </Stack>

    );
};

export default ForexListAccounts;