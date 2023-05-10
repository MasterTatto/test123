import React, {FC} from 'react';
import BankRequisitesItem from "../entities/components/bankRequisitesItem";
import {Stack, useMediaQuery} from "@mui/material";
import CustomSelect from "../shared/UI/customSelect";
import CustomInput from "../shared/UI/customInput";

interface IType {
    children?: any
}

const BankRequisitesList: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    return (
            <Stack spacing={7}>
                <Stack direction={mediaQuery ? "row" : "column"} justifyContent="space-between" spacing={7}>
                    <Stack direction={mediaQuery ? "row" : "column"} spacing={7}>
                        <CustomSelect defaultValue="По дате"/>
                        <CustomSelect defaultValue="Подтвержденные"/>
                    </Stack>
                    <Stack sx={{maxWidth: mediaQuery ? 240: null}}>
                        <CustomInput search/>
                    </Stack>
                </Stack>
                <BankRequisitesItem/>
            </Stack>
    );
};

export default BankRequisitesList;
