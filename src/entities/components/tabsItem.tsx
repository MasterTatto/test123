import React, {FC} from 'react';
import Box from "@mui/material/Box";

interface T {
    children?: any;
    value?: any;
    index?: any;
}

const TabsItem: FC<T> = ({children,value, index,}) => {
    return (

        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (
                <Box>
                    {children}
                </Box>
            )}
        </div>
    );
};

export default TabsItem;