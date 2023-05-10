import {Button, Divider, Stack} from "@mui/material";
import CustomInput from "../../shared/UI/customInput";
import SettingsItem from "./settingsItem";
import React, {useState} from "react";
import Paper from "@mui/material/Paper";
import SettingsModak from "./modal/settingsModak";


const PersonalData = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = (event: React.SyntheticEvent) => {
        event.stopPropagation()
        setOpenModal(true)
    };
    return (
           <Paper sx={{height:`100%`}}>
               <Stack className="h2 white-90" sx={{mb: 14}}>Личные данные</Stack>
               <Divider/>
               <Stack spacing={7}>
                   <CustomInput label="Имя"/>
                   <CustomInput label="Фамилия"/>
                   <Stack direction="row" alignItems="center" justifyContent="space-between">
                       <span className="subHeadersBold white-90">Привязка Telegram</span>
                       <Stack direction="row" alignItems="center" spacing={11}>
                           <span className="subHeaders white-80">@ryabishin</span>
                           <Button  onClick={(e) => handleOpenModal(e)} variant="contained" color="success">Привязано</Button>
                       </Stack>
                   </Stack>
               </Stack>
               <SettingsModak openModal={openModal} closeModal={setOpenModal}/>
           </Paper>

    );
};

export default PersonalData;