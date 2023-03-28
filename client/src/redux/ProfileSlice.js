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
        // POST
        getPostsUser(state, action){
            state.posts = action.payload   
        },

        likePostProfile: (state, actions) => {
            const { postId, userId  } = actions.payload;
            state.posts = state.posts.map((post) => {
                if (post._id === postId) {
                    post?.likes.push(userId);
                }
                return post;
            });
        },

        unLikePostProfile: (state, actions) => {
            const { postId, userId } = actions.payload;
            state.posts = state.posts.map((post) => {
                if (post._id === postId) {
                    post?.likes.pop(userId);
                }
                return post;
            });
        },

        resetProfileSlice: () => initialState
    }
})

export const { 
    profileGetUser, 
    profileUpdateFollower, 
    profileUpdateUnFollower,
    resetProfileSlice,
    getPostsUser,
    likePostProfile,
    unLikePostProfile
} = profileSlice.actions


export default profileSlice.reducer