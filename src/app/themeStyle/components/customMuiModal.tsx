

export const customMuiModal={
    styleOverrides: {
        root:{
            "& .MuiBox-root":{
                position: 'absolute' as 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: `100%`,
                backgroundColor: '#1F1F1F',
                border: `0.5px solid #3c3c3c`,
                borderRadius: 10,
                padding: 28,
                outline: 'none',
                maxHeight: `90%`,
                overflow:'hidden',
                overflowY: 'scroll'
            }

        }
    }
}as object