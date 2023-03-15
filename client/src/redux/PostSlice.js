import { createSlice } from "@reduxjs/toolkit";

const PostSlice = createSlice({
  name: "post",
  initialState: {
    postList: [],
    postItem: {},
  },
  reducers: {
    createNewPost: (state, actions) => {
      state.postList.push(actions.payload.data);
    },
    getPosts: (state, actions) => {
      state.postList = actions.payload.data;
    },
    getPost: (state, actions) => {
      state.postItem = actions.payload.data;
    },
    addFavoriteList: (state, actions) => {
      const { postId, userId, res } = actions.payload;
      state.postList = state.postList.map((post) => {
        if (post._id === postId) {
          post?.likes.push(userId);
        }
        return post;
      });
      state.postItem = res.data;
    },
    removeFavoriteList: (state, actions) => {
      const { postId, userId, res } = actions.payload;
      state.postList = state.postList.map((post) => {
        if (post._id === postId) {
          post?.likes.pop(userId);
        }
        return post;
      });
      console.log(actions.payload);
      state.postItem = res.data;
    },
  },
});

export const {
  createNewPost,
  getPosts,
  getPost,
  addFavoriteList,
  removeFavoriteList,
} = PostSlice.actions;
export default PostSlice.reducer;
