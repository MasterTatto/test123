import React, {FC} from 'react';
import {IconButton, Stack} from "@mui/material";
import IconClose from "../../shared/assets/images/icons/iconClose";
import CustomSelect from "../../shared/UI/customSelect";
import Button from "@mui/material/Button";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/useRedux";
import {barChartSlice} from "../../store/slice/barChartSlice";
import setParametersReducer, {setParametersSlice} from "../../store/slice/parametersSlice";

interface IType {
    children?: any
}

const Parameters: FC<IType> = ({children}) => {
    const {addExcludeDays,addExcludeHours,addExcludeSymbols} = setParametersSlice.actions
    const dispatch = useAppDispatch()

    const handleExcludeSymbols=(value:any)=>{
        dispatch(addExcludeSymbols(value))
    }
    const handleExcludeHours=(value:any)=>{
        dispatch(addExcludeHours(value))
    }
    const handleExcludeDays=(value:any)=>{
        dispatch(addExcludeDays(value))
    }
    return (
        <Stack spacing={7}
               sx={{p: `12px 8px`, border: `0.5px solid #3C3C3C`, borderRadius: 2.5}}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={4}>
                    <IconButton
                        className="red"
                        size="small"
                        sx={{p: 4, border: `0.5px solid #3C3C3C`, borderRadius: 1}}
                    >
                        <IconClose deleteBtn/>
                    </IconButton>
                    <span className="subHeaders white-90">Символы</span>
                </Stack>
                <CustomSelect
                    optionValue={handleExcludeSymbols}
                    options={[
                        {id:'eur',title:'eur'},
                        {id:'dol',title:'dol'},
                        {id:'rub',title:'rub'}
                    ]}
                    multiple/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={4}>
                    <IconButton
                        className="red"
                        size="small"
                        sx={{p: 4, border: `0.5px solid #3C3C3C`, borderRadius: 1}}
                    >
                        <IconClose deleteBtn/>
                    </IconButton>
                    <span className="subHeaders white-90">Дни</span>
                </Stack>
                <CustomSelect
                    optionValue={handleExcludeDays}
                    options={[
                        {id:'Пн',title:'Пн'},
                        {id:'Вт',title:'Вт'},
                        {id:'Ср',title:'Ср'},
                        {id:'Чт',title:'Чт'},
                        {id:'Пт',title:'Пт'},
                        {id:'Сб',title:'Сб'},
                        {id:'Вс',title:'Вс'},
                    ]}
                    multiple/>
            </Stack>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Stack direction="row" alignItems="center" spacing={4}>
                    <IconButton
                        className="red"
                        size="small"
                        sx={{p: 4, border: `0.5px solid #3C3C3C`, borderRadius: 1}}
                    >
                        <IconClose deleteBtn/>
                    </IconButton>
                    <span className="subHeaders white-90">Часы</span>
                </Stack>
                <CustomSelect
                    optionValue={handleExcludeHours}
                    options={[
                        {id:'1',title:'1'},
                        {id:'2',title:'2'},
                        {id:'3',title:'3'},
                        {id:'4',title:'4'},
                        {id:'5',title:'5'},
                        {id:'6',title:'6'},
                    ]}
                    multiple/>
            </Stack>
            {/*<Button color="success">Оптимизировать</Button>*/}
            {/*<Button color="error">Сброс</Button>*/}
        </Stack>
    );
};

export default Parameters;