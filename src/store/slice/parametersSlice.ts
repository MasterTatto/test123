import {createSlice, PayloadAction} from "@reduxjs/toolkit";




interface IType {
    value:string
}
const initialState= {
    excludeSymbols: [],
    excludeDays: [],
    excludeHours: []
}


export const setParametersSlice = createSlice({
    name: 'setParametersSlice',
    initialState,
    reducers: {
        addExcludeSymbols(state:any, action: PayloadAction<string>) {
            state.excludeSymbols=action.payload
        },
        addExcludeDays(state:any, action: PayloadAction<string>) {
            state.excludeDays=action.payload
        },
        addExcludeHours(state:any, action: PayloadAction<string>) {
            state.excludeHours=action.payload
        },
    },
})

export default setParametersSlice.reducer