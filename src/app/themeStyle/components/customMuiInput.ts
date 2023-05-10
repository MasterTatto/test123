import {themeColors} from "../themeColors";


export const customMuiInput = {
    variants: [
        {
            props: {size: 'small'} as object,
            style: {
                height:31,
                padding: `7px 16px`,
                width: `100%`,
            },
        },
        {
            props: {size: 'medium'} as object,
            style: {
                padding: `10px 16px`,
                width: `100%`,

            },
        },
    ],
    styleOverrides: {
        input:{
            padding: 0,
        },
        multiline:{
            "&:hover": {
                borderColor: themeColors.white80,
            }
        },
        root: {
            padding: `10px 16px`,
            fontSize: 12,
            "&:hover": {
                borderColor: themeColors.white90,
            }
        }
    },

}