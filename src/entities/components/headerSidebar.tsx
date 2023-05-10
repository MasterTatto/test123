import React, {FC} from 'react';
import {Avatar, Chip, Stack, useMediaQuery} from "@mui/material";
// @ts-ignore
import img from '../../shared/assets/images/amin-panel.png'
import IconAccount from "../../shared/assets/images/icons/iconAccount";
import {useGetProfileQuery} from "../../store/API/profileApi";

interface T {
    isAdmin?: boolean;
    name: string;
    images?: string;
    balance: string;
    account: string;
}


const HeaderSidebar: FC<T> = ({isAdmin,name, images, balance, account}) => {
    const { data, error, isLoading } = useGetProfileQuery('')
    const mediaQuery = useMediaQuery('(min-width:1270px)');
    return (
        <Stack direction="row" spacing={7}>
            {
                (isAdmin && mediaQuery) ?
                <Stack>
                    <img src={img} alt="image"/>
                </Stack>
                    :  (!isAdmin) ?
                    <>
                        <Avatar
                            alt={data?.data?.telegram?.fullname}
                            src={data?.data?.telegram?.avatar_url && data?.data?.telegram?.avatar_url}
                            sx={{width:mediaQuery ? 74 : 34, height:mediaQuery ? 74 : 34}}
                        />
                        <Stack
                            flexGrow={1}
                            spacing={2}
                            direction={mediaQuery ? "column": "row"}
                            justifyContent={mediaQuery ? "flex-start": "space-between"}
                        >
                            <Stack>
                                <div className="subHeaders white-80">@{data?.data?.telegram?.username}</div>
                                <div className="h2">{data?.data?.telegram?.fullname}</div>
                            </Stack>
                            <Chip label={data?.data?.accounts?.deposit_load} variant="outlined" color={"neutral"} icon={<IconAccount/>}/>
                        </Stack>
                    </>
                    : null
            }

        </Stack>
    );
};

export default HeaderSidebar;
