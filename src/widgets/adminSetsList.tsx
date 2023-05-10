import React, {FC, useState} from 'react';
import Button from "@mui/material/Button";
import IconPlus from "../shared/assets/images/icons/iconPlus";
import Set from "./set";
import {Pagination, Skeleton, Stack, TextField} from "@mui/material";
import {useAddSetMutation, useGetAllAdminSetsQuery} from "../store/API/tradeSetsApi";
import SimpleModal from "../entities/components/modal/simpleModal";
import Paper from "@mui/material/Paper";

interface IType {
    children?: any
}

const AdminSetsList: FC<IType> = ({children}) => {
    const [page, setPage] = useState(1);
    const {data,isLoading,error}=useGetAllAdminSetsQuery(page)
    const [addSet] = useAddSetMutation()

    const[openModal,setOpenModal]=useState(false)
    const [nameSet, setNameSet] = useState('');
    const [textValue, setTextValue] = useState('');

    if(error){
        return (
            <Paper>
                <span className="h1">Не удалось загрузить данные</span>
            </Paper>
        )
    }
    const handleAddSet=()=>{
        addSet({
            name:nameSet,
            description:textValue
        }).then(()=>{
            setOpenModal(false)
            setNameSet('')
            setTextValue('')
        })

    }
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
    return (
        <Stack spacing={7}>
            <Button
                fullWidth
                onClick={()=>setOpenModal(true)}
                startIcon={<IconPlus/>}
                sx={{height: 48, justifyContent: 'flex-start',color:'#BDBDBD'}}
            >
                Добавить сет
            </Button>
            {
                data &&
                data?.data.map((item:any)=>
                    <Set key={item.id} data={item} adminSet/>
                )
            }
            {
                data?.meta?.pagination?.total_pages > 1 &&
                <Pagination
                    page={page}
                    onChange={ handleChangePage}
                    color="primary"
                    count={data?.meta?.pagination?.total_pages}
                    variant="outlined"
                    shape="rounded"
                    sx={{mr: 'auto'}}
                />

            }
            <SimpleModal title="Настройки" openModal={openModal}
                         closeModal={setOpenModal}>
                <Stack spacing={7}>
                    <TextField
                        fullWidth
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={nameSet}
                        onChange={(e) => setNameSet(e.target.value)}
                        label="Название сета"
                        type="text"
                    />
                    <TextField
                        value={textValue}
                        multiline
                        minRows={10}
                        onChange={(e) => setTextValue(e.target.value)}
                    />
                    <Stack direction="row" justifyContent="flex-end" spacing={7}>
                        <Button onClick={()=>setOpenModal(false)} color="error">Отмена</Button>
                        <Button
                            onClick={handleAddSet}
                            color="success">Добавить</Button>
                    </Stack>
                </Stack>
            </SimpleModal>
        </Stack>
    );
};

export default AdminSetsList;