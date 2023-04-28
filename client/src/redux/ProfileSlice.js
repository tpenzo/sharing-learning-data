import { createSlice } from '@reduxjs/toolkit';

const initialState = {
   user: null,
   posts: [],
   bookmarks: [],
};

export const profileSlice = createSlice({
   name: 'profileSlice',
   initialState,
   reducers: {
      profileGetUser(state, action) {
         state.user = action.payload;
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

      getPostsUser(state, action) {
         state.posts = action.payload;
      },

      getBookmarksUser(state, action) {
         state.bookmarks = action.payload;
      },

      likePostProfile: (state, actions) => {
         const { postId, userId, property } = actions.payload;
         state[`${property}`] = state[`${property}`].map((post) => {
            if (post._id === postId) {
               post?.likes.push(userId);
            }
            return post;
         });
      },

      unLikePostProfile: (state, actions) => {
         const { postId, userId, property } = actions.payload;
         state[`${property}`] = state[`${property}`].map((post) => {
            if (post._id === postId) {
               post.likes = post?.likes?.filter((id) => id !== userId);
            }
            return post;
         });
      },

      addBookmarkProfile: (state, actions) => {
         const { post } = actions.payload;
         state.bookmarks = [post, ...state.bookmarks];
      },

      removeBookmarkProfile: (state, actions) => {
         const { potstId } = actions.payload;
         state.bookmarks = state.bookmarks.filter((item) => item._id !== potstId);
      },

      removePostProfile: (state, actions) => {
         state.posts = state.posts.filter((item) => item._id !== actions.payload);
      },

      resetProfileSlice: () => initialState,
   },
});

export const {
   profileGetUser,
   profileUpdateFollower,
   profileUpdateUnFollower,
   resetProfileSlice,
   getPostsUser,
   likePostProfile,
   unLikePostProfile,
   getBookmarksUser,
   addBookmarkProfile,
   removeBookmarkProfile,
   removePostProfile,
} = profileSlice.actions;

export default profileSlice.reducer;
