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
        // User takes action
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

        // socket perform action
        updateFollowerUser(state, action){
            state.user = {
                ...state.user, 
                follower: [...state.user.follower, action.payload]
            }
        },
        updateUnfollowUser(state, action){
            state.user = {
                ...state.user, 
                follower: state.user.follower.filter(item => item !== action.payload)
            }
        },

        updateUser(state, action){
            state.user = {
                ...state.user, 
                ...action.payload
            }
        },

        resetAuthSlice: () => initialState
    }
})

export const { 
    authSaveData, 
    updateNewToken, 
    resetAuthSlice, 
    followUser, 
    unfollowUser, 
    updateFollowerUser,
    updateUnfollowUser,
    updateUser
} = authSlice.actions

export default authSlice.reducer;