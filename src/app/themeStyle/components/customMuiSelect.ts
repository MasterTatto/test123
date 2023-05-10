export const customMuiSelect = {
    styleOverrides: {
        root: (({theme}: any) => ({
            padding: `7px`,
            minHeight: 31,
            color: theme.palette.neutral.contrastText,
            fontWeight: 600,
            fontSize: 12,
            lineHeight: `15px`,
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            "@media (min-width:1270px)":{
                maxWidth: 160,
            }
        })),
        select: {
            "&.MuiInputBase-input": {
                paddingRight: 14,
                paddingLeft: 32
            },
        },
        icon: (({theme}: any) => ({
            right: 'unset',
            left: 14,
            top: `50%`,
            transform: `translateY(-50%)`,
            color: theme.palette.neutral.main
        }))
    },
} as object
