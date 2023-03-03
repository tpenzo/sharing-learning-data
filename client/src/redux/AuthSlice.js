import { createSlice } from '@reduxjs/toolkit'

const initialState = {
   token: null,
   user: null,
};

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        authSaveData: (state, actions) => {
            state.user = actions.payload.user
            state.token = actions.payload.accessToken
        },
        updateNewToken: (state, actions) => {
            state.token= actions.payload
        }
    }
})

export const { authSaveData, updateNewToken } = authSlice.actions

export default authSlice.reducer;