

export const customMuiAccordion={
    styleOverrides: {
        root: {
            border: `0.5px solid #3c3c3c`,
            borderRadius: 10,
            "&:first-of-type":{
                borderRadius: 10,
            },
            "&:before":{
                content:'none'
            },
        },
    },
}as object