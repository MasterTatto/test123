import React, {FC} from 'react';
import CustomSelect from "../../shared/UI/customSelect";
import {Stack, Switch, useMediaQuery} from "@mui/material";

interface IType {
    children?: any
}

const Filter: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:900px)');
    return (
        <Stack direction={mediaQuery ? "row" : "column"} alignItems="center" justifyContent="space-between"
               spacing={7}
               sx={{mb: 7}}>
            <CustomSelect defaultValue="Фильтры" multiple={true}/>
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{width: mediaQuery ? 310 : `100%`, p: `8px 14px`, border: `0.5px solid #3C3C3C`, borderRadius: 2.5}}
            >
                <span className="subHeaders white-90">Показать подключенных</span>
                <Switch defaultChecked size="small"/>
            </Stack>
        </Stack>
    );
};

export default Filter;