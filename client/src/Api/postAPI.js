import axiosClient from "./axiosClient";
import {
  createNewPost,
  getPosts,
  getPost,
  addFavoriteList,
  removeFavoriteList,
} from "../redux/PostSlice";
import showToast from "./showToast";
import { fetchCmtsAPI } from "./commentAPI";
import { getPostsUser, likePostProfile, unLikePostProfile } from "../redux/ProfileSlice";

export const createPost = async (payload, dispatch) => {
  try {
    const res = await axiosClient.post("/api/post/newpost", payload);

    console.log(res);

    await dispatch(createNewPost(res));
    showToast(res.message, "success");
    return res;
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
export const getAllPost = async (params, dispatch) => {
  try {
    const res = await axiosClient.get("/api/post", params);
    await dispatch(getPosts(res));
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
export const getPostById = async (id, dispatch) => {
  try {
    // get post
    const res = await axiosClient.get(`/api/post/${id}`);
    // get comment of post
    const comments = await fetchCmtsAPI(id);

    await dispatch(getPost({ post: res.data, comments }));
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
export const getUserPost = async (userId, dispatch) => {
  try {
    //get post of user
    const res = await axiosClient.get(`/api/post/${userId}/user`);
    // Update post in profile
    await dispatch(getPostsUser(res.data))
    return res.data;
  } catch (error) {
    showToast(error.data.message, "error");
  }
};

// Post in HomePage
export const likePost = async (postId, userId, dispatch) => {
  try {
    const res = await axiosClient.post(`/api/post/${postId}/like`);

    await dispatch(addFavoriteList({ postId, userId, res }));
  } catch (error) {
    showToast(error.data.message, "error");
  }
};

export const unLikePost = async (postId, userId, dispatch) => {
  try {
    const res = await axiosClient.post(`/api/post/${postId}/unlike`);

    await dispatch(removeFavoriteList({ postId, userId, res }));
  } catch (error) {
    showToast(error.data.message, "error");
  }
};

// Post in ProfilePage
export const likePostInProfile = async (postId, userId, dispatch) => {
  try {
    const res = await axiosClient.post(`/api/post/${postId}/like`);

    await dispatch(likePostProfile({ postId, userId, res }));
  } catch (error) {
    showToast(error.data.message, "error");
  }
};

export const unLikePostInProfile  = async (postId, userId, dispatch) => {
  try {
    const res = await axiosClient.post(`/api/post/${postId}/unlike`);

    await dispatch(unLikePostProfile({ postId, userId, res }));
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
