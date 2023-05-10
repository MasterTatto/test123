import React, {FC} from 'react';
import PersonalData from "../entities/components/personalData";
import {Chip, Grid} from "@mui/material";
import SelfEmployment from "../entities/components/selfEmployment";
import IconAccount from "../shared/assets/images/icons/iconAccount";

interface IType {
    children?: any
}

const PersonalSetting: FC<IType> = ({children}) => {
    return (
        <>
            <Chip
                label="Основное"
                variant="outlined"
                color={"neutral"}
                icon={<IconAccount/>}
                sx={{
                    mb:14,
                    height:'unset',
                    padding:`14px 28px`,
                    fontWeight: 600,
                    fontSize: 16,
                    lineHeight: `20px`,
                }}
            />
            <Grid container spacing={10} columns={12} wrap="wrap" alignItems="stretch">
                <Grid item xs={12} md={6}>
                    <PersonalData/>
                </Grid>
                <Grid item xs={12} md={6}>
                    <SelfEmployment/>
                </Grid>
            </Grid>
        </>
    );
};

export default PersonalSetting;