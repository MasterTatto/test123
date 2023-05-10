import React, {FC} from 'react';
import User from "../entities/components/user";
import {Stack, useMediaQuery} from "@mui/material";
import CustomSelect from "../shared/UI/customSelect";
import CustomInput from "../shared/UI/customInput";

interface IType {
    children?: any
}

const UsersList: FC<IType> = ({children}) => {
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    return (
        <Stack spacing={7}>
            <Stack direction={mediaQuery ? "row" : "column-reverse"} justifyContent="space-between" spacing={7}>
                <CustomSelect defaultValue="По дате"/>
                <Stack direction="row" spacing={7} sx={{maxWidth: mediaQuery ? 240 : null}}>
                    <CustomInput search/>
                </Stack>
            </Stack>
            <User/>
        </Stack>
    );
};

export default UsersList;
