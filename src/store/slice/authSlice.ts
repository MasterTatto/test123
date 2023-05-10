import {createSlice, PayloadAction} from "@reduxjs/toolkit";




const initialState= {
  isAuth: false
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        auth(state, action: PayloadAction<boolean>) {
            state.isAuth=action.payload
        },
    },
})

export default authSlice.reducer