import React, {FC, useState} from 'react';
import {Alert, Pagination, Snackbar, Stack, useMediaQuery} from "@mui/material";
import CustomSelect from "../shared/UI/customSelect";
import CustomInput from "../shared/UI/customInput";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import {useAddServerMutation, useGetAllServersQuery} from "../store/API/serverApi";
import IconConnected from "../shared/assets/images/icons/iconConnected";
import IconPlus from "../shared/assets/images/icons/iconPlus";
import SimpleModal from "../entities/components/modal/simpleModal";
import {useInput} from "../hooks/useInput";
import AccountModal from "../entities/components/modal/accountModal";
import ServerModal from "../entities/components/modal/serverModal";

interface IType {
    children?: any
}

const BrokerServersList: FC<IType> = ({children}) => {
    const {data: isDataServers} = useGetAllServersQuery('/servers')

    const mediaQuery = useMediaQuery('(min-width:1270px)');
    const [openModal, setOpenModal] = useState(false);
    const [openModalUpdate, setOpenModalUpdate] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [serverId, setServerId] = useState(0)
    const [serverName, setServerName] = useState('')

    return (
        <Stack spacing={7}>
            <Button
                fullWidth
                onClick={() => setOpenModal(true)}
                color="neutral"
                startIcon={<IconPlus/>}
                sx={{height: 48, justifyContent: 'flex-start', fontSize:16,color:'#BDBDBD'}}
            >
                Добавить сервер
            </Button>
            {
                isDataServers?.data && isDataServers?.data.map(item =>
                    <Paper key={item.id}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={7}>
                            <span className="subHeadersBold white-100">Сервер {item.title}</span>
                            <Stack direction="row" spacing={7}>
                                <Button onClick={() => {
                                    setOpenModalUpdate(true)
                                    setServerId(item.id)
                                }} color="neutral">Настройки</Button>
                                <Button onClick={() => {
                                    setOpenModalDelete(true)
                                    setServerId(item.id)
                                    setServerName(item.title)
                                }} color="error">Удалить</Button>
                            </Stack>
                        </Stack>
                    </Paper>
                )
            }

            <ServerModal title="Добавить сервер" isAddServer openModal={openModal} closeModal={setOpenModal}/>
            <ServerModal title="Настройки сервера" isUpdateServer updateServerNumber={serverId}
                         openModal={openModalUpdate} closeModal={setOpenModalUpdate}/>
            <ServerModal title="Подтверждение"
                         isDeleteServer
                         updateServerNumber={serverId}
                         serverName={serverName}
                         openModal={openModalDelete}
                         closeModal={setOpenModalDelete}/>

        </Stack>
    );
};

export default BrokerServersList;
