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
        },
        followUser(state, action){
            state.user = {
                ...state.user, 
                following: [...state.user.following, action.payload]
            }
        },
        unfollowUser(state, action){
            state.user = {
                ...state.user, 
                following: state.user.following.filter(item => item !== action.payload)
            }
        },

        resetAuthSlice: () => initialState
    }
})

export const { authSaveData, updateNewToken, resetAuthSlice, followUser, unfollowUser } = authSlice.actions

export default authSlice.reducer;