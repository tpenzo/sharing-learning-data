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
      state.postItem = actions.payload.data;
    },
    removeFavoriteList: (state, actions) => {
      state.postItem = actions.payload.data;
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
