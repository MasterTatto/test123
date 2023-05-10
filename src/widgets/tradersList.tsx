import React, {FC, useState} from 'react';
import {Button, Divider, Grid, Stack, TextField, useMediaQuery} from "@mui/material";

import TraderItem from "../entities/components/TraderItem";
import {
    useAddTraderMutation,
    useDeleteTraderMutation,
    useGetAllAdminTradersQuery,
    useUpdateTraderMutation
} from "../store/API/tradersAdminApi";
import IconPlus from "../shared/assets/images/icons/iconPlus";
import SimpleModal from "../entities/components/modal/simpleModal";
import CustomSelect from "../shared/UI/customSelect";

interface IType {
    children?: any
}

const TradersList: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const {data} = useGetAllAdminTradersQuery(1)
    const [deleteTrader] = useDeleteTraderMutation()
    const [addTrader] = useAddTraderMutation()
    const [updateTrader] = useUpdateTraderMutation()

    const [openModalAddTrader, setOpenModalAddTrader] = useState(false);
    const [openModalSettingsTrader, setOpenModalSettingsTrader] = useState(false);

    const [idTrader, setIdTrader] = useState('');
    const [textValue, setTextValue] = useState('');
    const [nameTrader, setNameTrader] = useState('');
    const [linkTrader, setLinkTrader] = useState('');
    const [strategy, setStrategy] = useState('');

    const closeModal = () => {
        setOpenModalAddTrader(false)
        setOpenModalSettingsTrader(false)
        setTextValue('')
        setNameTrader('')
        setLinkTrader('')
    }
    const handleAddTrader = () => {
        addTrader({
            name: nameTrader,
            description: textValue,
            url: linkTrader,
            strategy: strategy
        }).then(() => {
            closeModal()
        })
    }
    const handleUpdateTrader = () => {
        updateTrader({
            id:idTrader,
            body: {
                name: nameTrader,
                description: textValue,
                url: linkTrader,
                strategy: strategy
            }
        }).then(() => {
            closeModal()
        })
    }
    return (
        <Stack spacing={7}>
            {/*<Stack direction={mediaQuery ? "row" : "column"} justifyContent="space-between" spacing={7}>*/}
            {/*    <Stack direction={mediaQuery ? "row" : "column"} spacing={7}>*/}
            {/*        <CustomSelect defaultValue="По дате"/>*/}
            {/*        <CustomSelect defaultValue="По сумме"/>*/}
            {/*    </Stack>*/}
            {/*    <Stack direction="row" spacing={7} sx={{maxWidth: mediaQuery ? 240 : null}}>*/}
            {/*        <CustomInput search/>*/}
            {/*    </Stack>*/}
            {/*</Stack>*/}
            <Button
                fullWidth
                onClick={() => setOpenModalAddTrader(true)}
                startIcon={<IconPlus/>}
                sx={{height: 48, justifyContent: 'flex-start', color: '#BDBDBD'}}
            >
                Добавить трейдера
            </Button>
            {
                data &&
                data?.data.map((item: any) =>

                    <TraderItem
                        id={item.id}
                        name={item.name}
                        graph={item.graph}
                        strategy={item.strategy}
                        stats={item.stats}
                        deleteTrader={deleteTrader}
                        openModal={setOpenModalSettingsTrader}
                        idTrader={setIdTrader}
                    />
                )
            }
            <SimpleModal maxWidth={780} title="Добавить трейдера" openModal={openModalAddTrader}
                         closeModal={setOpenModalAddTrader}>
                <Stack spacing={7}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={nameTrader}
                        onChange={(e) => setNameTrader(e.target.value)}
                        label="Название трейдера"
                        type="text"
                    />
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={linkTrader}
                        onChange={(e) => setLinkTrader(e.target.value)}
                        label="Ссылка на трейдера"
                        type="text"
                    />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <span className="subHeaders white-90">Стратегия</span>
                        <CustomSelect
                            width={112}
                            defaultValue="Стратегия"
                            options={[{id: 'grid', title: 'grid'}, {id: 'stoploss', title: 'stoploss'}]}
                            optionValue={setStrategy}
                        />
                    </Stack>
                    <TextField
                        value={textValue}
                        multiline
                        minRows={10}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button onClick={closeModal} color="error">Отмена</Button>
                        <Button
                            onClick={handleAddTrader}
                            color="success">Подтвердить</Button>
                    </Stack>
                </Stack>
            </SimpleModal>
            <SimpleModal maxWidth={780} title="Настройки трейдера" openModal={openModalSettingsTrader}
                         closeModal={setOpenModalSettingsTrader}>
                <Stack spacing={7}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={nameTrader}
                        onChange={(e) => setNameTrader(e.target.value)}
                        label="Название трейдера"
                        type="text"
                    />
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={linkTrader}
                        onChange={(e) => setLinkTrader(e.target.value)}
                        label="Ссылка на трейдера"
                        type="text"
                    />
                    <Stack direction="row" alignItems="center" justifyContent="space-between">
                        <span className="subHeaders white-90">Стратегия</span>
                        <CustomSelect
                            width={112}
                            defaultValue="Стратегия"
                            options={[{id: 'grid', title: 'grid'}, {id: 'stoploss', title: 'stoploss'}]}
                            optionValue={setStrategy}
                        />
                    </Stack>
                    <TextField
                        value={textValue}
                        multiline
                        minRows={10}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button onClick={closeModal} color="error">Отмена</Button>
                        <Button
                            onClick={handleUpdateTrader}
                            color="success">Подтвердить</Button>
                    </Stack>
                </Stack>
            </SimpleModal>
        </Stack>
    );
};

export default TradersList;
