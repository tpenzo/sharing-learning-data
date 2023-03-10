import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null,
    posts: []
}

export const profileSlice = createSlice({
    name: "profileSlice",
    initialState,
    reducers: {
        profileGetUser(state, action){
            state.user = action.payload
            // get posts
        },
        profileUpdateFollower: (state, action) => {
            state.user = {
                ...state.user,
                follower: [...state.user.follower, action.payload],
            };
        },
        profileUpdateUnFollower: (state, action) => {
            state.user = {
                ...state.user,
                follower: state.user.follower.filter((item) => item !== action.payload),
            };
      },
    }
})

export const { profileGetUser, profileUpdateFollower, profileUpdateUnFollower } = profileSlice.actions


export default profileSlice.reducer