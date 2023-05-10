import React, {FC} from 'react';
import {styled, Tooltip, tooltipClasses, TooltipProps} from "@mui/material";

interface IType {
    children?: any;
    title?: any;
}

const HtmlTooltip = styled(({className, ...props}: TooltipProps) => (
    <Tooltip arrow placement="top" {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#1F1F1F',
         border: ` 0.5px solid #3C3C3C`
    },
    "& .MuiTooltip-arrow":{
        color:'#1F1F1F',
        "&:before":{
            border: ` 0.5px solid #3C3C3C`
        }
    }  ,

}));
const CustomTooltip: FC<IType> = ({children, title}) => {
    return (
        <HtmlTooltip
            title={
                <>
                    {title}

                </>
            }
        >
            {children}
        </HtmlTooltip>
    );
};

export default CustomTooltip;