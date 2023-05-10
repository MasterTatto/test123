import {themeColors} from "../themeColors";


const settingsBtn = (variantBtn: string, colorBtn: string) => {
    const colorType = {
        props: {variant: variantBtn, color: colorBtn} as object,
        style: (({theme}: any) => ({
            background:
                (variantBtn === 'gardient' && colorBtn === 'warning') ? themeColors.yellowGr :
                    (variantBtn === 'gardient' && colorBtn === 'success') ? themeColors.greenGr :
                    (variantBtn === 'gardient' && colorBtn === 'info') ? themeColors.blueGr :
                        undefined,
            backgroundColor:
                (variantBtn === 'outlined') ? 'transparent' :
                    (variantBtn === 'contained' && colorBtn === 'success') ? theme.palette.success.dark :
                        (variantBtn === 'contained' && colorBtn === 'error') ? theme.palette.error.dark :
                            (variantBtn === 'contained' && colorBtn === 'warning') ? theme.palette.warning.dark :
                            (variantBtn === 'contained' && colorBtn === 'info') ? theme.palette.info.dark :
                                null,
            color:
                (colorBtn === 'neutral') ? theme.palette.neutral.contrastText :
                    (variantBtn === 'gardient' && colorBtn === 'warning') ? theme.palette.warning.main :
                        (variantBtn === 'gardient' && colorBtn === 'success') ? theme.palette.success.main :
                            null,
            "&:hover": {
                color: (colorBtn === 'neutral') ? theme.palette.neutral.light : null,
                borderColor: (colorBtn === 'neutral') ? theme.palette.neutral.main : null,
            },
            "&:active": {
                backgroundColor:
                    (colorBtn === 'success') ? theme.palette.success.dark :
                        (colorBtn === 'error') ? theme.palette.error.dark :
                            (colorBtn === 'warning') ? theme.palette.warning.dark :
                                (colorBtn === 'neutral') ? theme.palette.neutral.dark :
                                    null,
                color:
                    (colorBtn === 'neutral') ? theme.palette.neutral.contrastText :
                        null
            }
        }))
    }
    return colorType

}
export const customMuiButton = {
    variants: [
        settingsBtn("contained", 'success'),
        settingsBtn("outlined", 'success'),
        settingsBtn("contained", 'error'),
        settingsBtn("outlined", 'error'),
        settingsBtn("contained", 'warning'),
        settingsBtn("outlined", 'warning'),
        settingsBtn("contained", 'info'),
        settingsBtn("outlined", 'neutral'),
        settingsBtn("gardient", 'warning'),
        settingsBtn("gardient", 'success'),
        settingsBtn("gardient", 'info'),
        {
            props: {variant: 'gardient'} as object,
            style: (({theme}: any) => ({

                padding: `10px 30px`,
                gap: `10px`,
                fontWeight: 600,
                fontSize: 16,
                lineHeight: `20px`
            }))
        },


    ],
    defaultProps: {
        disableRipple: true,
    },

    styleOverrides: {
        root: ({ownerState}: any) =>
            ({
                padding: 8 + 'px' + ' ' + 14 + 'px',
                borderRadius: 5,
                borderStyle: 'solid',
                borderWidth: 0.5,
                borderColor: '#3C3C3C',

                "&:hover": {
                    backgroundColor: 'transparent',
                    borderStyle: 'solid',
                    borderWidth: 0.5,
                    borderColor: 'inherit',
                }
            })

    },
}