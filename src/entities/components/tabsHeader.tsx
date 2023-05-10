import React, {FC, useState} from 'react';
import Box from "@mui/material/Box";
import {styled, Tabs, useMediaQuery} from "@mui/material";
import Tab from "@mui/material/Tab";

interface ITabsName{
    name: string;
    icon?: React.ReactElement;
}

interface IType {
    tabsName: ITabsName[];
    onTabsChange:(value:number)=>void;
    tabsValue: number;
    variant?: 'standard' | 'scrollable' | 'fullWidth' | undefined;
    size?:'sizeSmall';
}

const AntTab = styled((props: any) => <Tab disableRipple {...props} />)(
    ({theme}) => ({
        flexDirection: 'row',
        gap: 22,
        padding:`14px 28px`,
        border: ` 0.5px solid #3C3C3C`,
        borderRadius: 10,
        fontWeight: 600,
        fontSize: 16,

        '&.Mui-selected': {
            color: '#fff',
        },
        '&.sizeSmall': {
            padding:`8px `,
            fontSize: 12,
            borderRadius: 5
        },

    }),
);
const TabsHeader: FC<IType> = ({tabsName,onTabsChange,variant,size}) => {
    const [value, setValue] = useState(0);
    const mediaQuery = useMediaQuery('(min-width:900px)');
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        onTabsChange(newValue)
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    return (
        <Box sx={{ mb:7}}>
            <Tabs value={value} onChange={handleChange} variant={ variant && variant} >
                {
                    tabsName && tabsName.map((item, index) =>
                        <AntTab className={size && size} key={item.name} icon={item.icon && item.icon} label={item.name} {...a11yProps(index)} />
                    )
                }
            </Tabs>
        </Box>
    );
};

export default TabsHeader;