import React, {FC, useState} from 'react';
import TabsHeader from "../entities/components/tabsHeader";
import TabsItem from "../entities/components/tabsItem";
import Box from "@mui/material/Box";
import CopyTradingAccordion from "./copyTradingAccordion";
import Set from "./set";
import IconTraders from "../shared/assets/images/icons/iconTraders";
import IconSet from "../shared/assets/images/icons/iconSet";
import Filter from "../entities/components/filter";
import UserSetsList from "./userSetsList";

interface IType {
    children?: any
}

const CopyTradingTabs: FC<IType> = ({children}) => {
    const [value, setValue] = useState(0);

    return (
        <>
            <Box sx={{width: '100%'}}>
                <TabsHeader
                    tabsName={[{name:'Трейдеры',icon:<IconTraders/>}, {name:'Сеты',icon:<IconSet/>}]}
                    tabsValue={value}
                    onTabsChange={setValue}
                />

                <TabsItem value={value} index={0}>
                    {/*<Filter/>*/}
                    <CopyTradingAccordion/>
                </TabsItem>
                <TabsItem value={value} index={1}>
                    <UserSetsList />
                </TabsItem>
            </Box>
        </>
    );
};

export default CopyTradingTabs;