import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   token: null,
   user: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    actions: {

    }
})

export const {} = authSlice.actions

export default authSlice.reducer;