import React, {FC} from 'react';
import MyProductItem from "../entities/components/myProductItem";
import Paper from "@mui/material/Paper";
import {Chip, Pagination, Stack} from "@mui/material";
import {useGetAllProductsQuery} from "../store/API/productApi";

interface IType {
    children?: any
}

const MyProductsList: FC<IType> = ({children}) => {
    const [page, setPage] = React.useState(1);
    const {data, isLoading, error} = useGetAllProductsQuery(page)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    return (
        <Paper>
            <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{mb: 7}}>
                <span className="h2 white-90">Мои продукты</span>
                <Stack direction="row" spacing={7}>
                    <Chip label="Все" color="neutral"/>
                    <Chip label="Счет 1" color="neutral"/>
                    <Chip label="Счет 2" color="neutral"/>
                </Stack>
            </Stack>
            <Stack spacing={7}>
                {
                    data && data.data.map(item =>
                        <MyProductItem
                            id={item.id}
                            key={item.id}
                            slug={item.slug}
                            sub_title={item.sub_title}
                            status={item.status}
                            valid_to={item.valid_to}
                        />
                    )
                }
            </Stack>
            {
                data?.meta?.pagination?.total_pages > 1 &&
                <Pagination
                    onChange={handleChange}
                    color="primary"
                    count={data?.meta?.pagination?.total_pages}
                    variant="outlined"
                    shape="rounded"/>

            }
        </Paper>
    );
};

export default MyProductsList;