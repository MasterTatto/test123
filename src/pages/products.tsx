import MainLayout from "../widgets/mainLayout";
import ProductItem from "../entities/components/productItem";
import MyProductsList from "../widgets/myProductsList";
import {Stack} from "@mui/material";


const Products = () => {
    return (
        <MainLayout>
            <Stack spacing={7}>
                <ProductItem/>
                <MyProductsList/>
            </Stack>
        </MainLayout>
    );
};

export default Products;