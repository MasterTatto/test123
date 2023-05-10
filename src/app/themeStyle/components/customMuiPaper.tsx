export const customMuiPaper = {
    styleOverrides: {
        root: {
            borderRadius: 10,
            padding: 14,
            boxShadow: "none",
            border: ` 0.5px solid #3C3C3C`,
            background: `linear-gradient(180deg, rgba(31, 31, 31, 0) 0%, #1F1F1F 100%)`,
            position: 'relative',
            "@media (min-width:1270px)":{
                padding: `14px 28px`,
            }
        }
    }
} as object
