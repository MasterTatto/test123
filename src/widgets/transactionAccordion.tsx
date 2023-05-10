import React, {FC, useState} from 'react';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    Stack,
    useMediaQuery
} from "@mui/material";

import CopyTradingModal from "../entities/components/modal/copyTradingModal";
import CustomInput from "../shared/UI/customInput";

interface IType {
    children?: any
}

const TransactionAccordion: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const [expanded, setExpanded] = useState<string | false>('panel1');
    const [openModal, setOpenModal] = useState(false);

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    return (
        <div>
            <Accordion
                sx={{p: `0 28px`, mb: 7}}
                expanded={!mediaQuery ? expanded === 'panel1' : false}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Stack direction={mediaQuery ? "row" : "column"} justifyContent="space-between"  flexGrow={1} spacing={14}>
                        <Stack className="subHeaders" direction="row" justifyContent="space-between" spacing={7}>
                            <Stack alignItems="center" spacing={2} textAlign="center">
                                <span className="white-90">Данные</span>
                                <span className="white-80">(1) Васильев Василий</span>
                            </Stack>
                            {mediaQuery &&<Divider orientation="vertical"/> }
                            <Stack alignItems="center" spacing={2} textAlign="center">
                                <span className="white-90">Номер транзакции</span>
                                <span className="white-80">238239</span>
                            </Stack>
                            {mediaQuery &&<Divider orientation="vertical"/> }
                            <Stack alignItems="center" spacing={2} textAlign="center">
                                <span className="white-90">Тип транзакции</span>
                                <span className="green">Реферальный</span>
                            </Stack>
                        </Stack>
                        <Stack className="subHeaders" direction="row" justifyContent="space-between" spacing={7}>
                            <Stack alignItems="center" spacing={2} textAlign="center">
                                <span className="white-90">Дата транзакции</span>
                                <span className="white-80">25.04.2022</span>
                            </Stack>
                            <Divider orientation="vertical"/>
                            <Stack alignItems="center" spacing={2} textAlign="center">
                                <span className="white-90">Сумма</span>
                                <span className="green">+102 394₽</span>
                            </Stack>
                        </Stack>
                    </Stack>
                </AccordionSummary>
                <AccordionDetails sx={{mb: 7}}>
                    {mediaQuery &&  <Divider sx={{mb:7}}/> }
                    <Stack spacing={7}>
                        <CustomInput label="ФИО"/>
                        <CustomInput label="Номер счета"/>
                        <Stack direction="row" justifyContent="space-between" flexGrow={1}>
                            <Stack className="subHeaders" direction={mediaQuery ? "row" : "column"} spacing={7}>
                                <Stack alignItems={mediaQuery ?"center" : "flex-start"} spacing={2}>
                                    <span className="white-90">Сумма</span>
                                    <span className="yellow">102 394₽</span>
                                </Stack>
                                {mediaQuery &&<Divider orientation="vertical"/> }

                                <Stack alignItems={mediaQuery ?"center" : "flex-start"} spacing={2}>
                                    <span className="white-90">С комиссией</span>
                                    <span className="red">91 239₽</span>
                                </Stack>
                            </Stack>
                            <Stack className="subHeaders" direction={mediaQuery ? "row" : "column"} spacing={7}>
                                <Button variant="contained" color="error">Отклонить</Button>
                                <Button variant="contained" color="success">Подтвердить</Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </AccordionDetails>
            </Accordion>


            <CopyTradingModal openModal={openModal} closeModal={setOpenModal}/>
        </div>
    );
};

export default TransactionAccordion;