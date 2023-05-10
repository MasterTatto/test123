import React, {FC, useState} from 'react';
import Paper from "@mui/material/Paper";
import { Chip,  Stack, useMediaQuery} from "@mui/material";
import { useGetProductsBySlugQuery} from "../../store/API/productApi";
import imgCopy from "../../shared/assets/images/tariff-copy.svg";
import imgRobot from "../../shared/assets/images/tariff-robot.svg";
import AddProductModal from "./modal/addProductModal";


interface IType {
    children?: any
}

const state = [
    {
        id: 1,
        name: 'Копировальщик',
        priceTitle: 'До 10.000$',
        image: imgCopy,
        price: '$1000',
        slug:'copier20k',
        text: 'Velit nunc ultrices sit est et varius. Tellus accumsan pretium sollicitudin elit purus morbi.Euismod fames ullamcorper eget eget mi nisi aliquet tortor. Etiam aenean mauris integer maecenas et in. Volutpat dolor id vulputate non sed arcu. Justo ut nisl tincidun',
        sale: {
            isSale: false,
            priceSale: '',
            text: ''
        }
    },
    {
        id: 2,
        name: 'Копировальщик',
        priceTitle: 'До 20.000$',
        image: imgCopy,
        price: '$2000',
        slug:'copier10k',
        text: 'Velit nunc ultrices sit est et varius. Tellus accumsan pretium sollicitudin elit purus morbi.Euismod fames ullamcorper eget eget mi nisi aliquet tortor. Etiam aenean mauris integer maecenas et in. Volutpat dolor id vulputate non sed arcu. Justo ut nisl tincidun',
        sale: {
            isSale: false,
            priceSale: '',
            text: ''
        }
    },
    {
        id: 3,
        name: 'Робот',
        priceTitle: 'До 50.000$',
        image: imgRobot,
        price: '$5000',
        slug:null,
        text: 'Velit nunc ultrices sit est et varius. Tellus accumsan pretium sollicitudin elit purus morbi.Euismod fames ullamcorper eget eget mi nisi aliquet tortor. Etiam aenean mauris integer maecenas et in. Volutpat dolor id vulputate non sed arcu. Justo ut nisl tincidun',
        sale: {
            isSale: false,
            priceSale: '$10 000',
            text: 'Скидка'
        }
    },
]

const ProductItem: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [stateModal, setStateModal] = useState(state[0])
    const [openModal, setOpenModal] = useState(false);

    return (
        <Stack direction={mediaQuery ? "row" : "column"} spacing={7} justifyContent="space-between">
            {
                state.map(item =>
                    <Paper
                        onClick={() => {
                            setStateModal(item)
                            setOpenModal(true)
                        }}
                        key={item.id}
                        sx={{
                            background:
                                item.id === 3 ?
                                    `linear-gradient(180deg, #33223A 0%, rgba(51, 34, 58, 0) 93.75%)`
                                    : `linear-gradient(180deg, #242D28 0%, rgba(36, 45, 40, 0) 93.75%)`,
                            cursor: 'pointer'
                        }}>
                        <Stack spacing={4}>
                            <span className={item.id === 3 ? "h1 pink" : "h1 green"}>{item.name}</span>
                            <span className="h2">{item.priceTitle}</span>
                            <p className="subHeaders white-90">{item.text}</p>
                            <Stack alignItems="center">
                                <img src={item.image} alt="Копировальщик"/>
                            </Stack>
                            <Chip label={item.sale.isSale ? item.price + ' ' + item.sale.priceSale : item.price}
                                  color="warning" variant="outlined" sx={{
                                position: 'absolute',
                                bottom: 14,
                                left: 14,
                            }}/>
                            {
                                item.sale.isSale &&
                                <Chip label={item.sale.text} color="error" variant="outlined" sx={{
                                    position: 'absolute',
                                    bottom: 14,
                                    right: 14,
                                }}/>
                            }
                        </Stack>
                    </Paper>
                )
            }
            {
                openModal && <AddProductModal stateModal={stateModal} openModal={openModal} closeModal={setOpenModal}/>
            }

        </Stack>
    );
};

export default ProductItem;
