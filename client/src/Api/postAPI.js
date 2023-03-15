import axiosClient from "./axiosClient";
import {
  createNewPost,
  getPosts,
  getPost,
  addFavoriteList,
  removeFavoriteList,
} from "../redux/PostSlice";
import showToast from "./showToast";

export const createPost = async (payload, dispatch) => {
  try {
    const res = await axiosClient.post("/api/post/newpost", payload);

    console.log(res);

    dispatch(createNewPost(res));

    return res;
  } catch (error) {
    // showToast(error.message, error.status);
  }
};
export const getAllPost = async (params, dispatch) => {
  try {
    const res = await axiosClient.get("/api/post", params);

    dispatch(getPosts(res));
  } catch (error) {
    console.log(error);
    // showToast(error.message, error.status);
  }
};
export const getPostById = async (id, dispatch) => {
  try {
    const res = await axiosClient.get(`/api/post/${id}`);

    console.log(res.data);

    dispatch(getPost(res));
  } catch (error) {
    console.log(error);

    // showToast(error.message, error.status);
  }
};
export const getUserPost = async (params, dispatch) => {
  try {
    const res = await axiosClient.get(`/api/post/me`, params);

    console.log(res.data);

    dispatch(getAllPost(res));
  } catch (error) {
    console.log(error);

    // showToast(error.message, error.status);
  }
};
export const likePost = async (postId, userId, dispatch) => {
  try {
    const res = await axiosClient.post(`/api/post/${postId}/like`);

    dispatch(addFavoriteList({ postId, userId, res }));
  } catch (error) {
    console.log(error);

    // showToast(error.message, error.status);
  }
};
export const unLikePost = async (postId, userId, dispatch) => {
  try {
    const res = await axiosClient.post(`/api/post/${postId}/unlike`);

    dispatch(removeFavoriteList({ postId, userId, res }));
  } catch (error) {
    console.log(error);

    // showToast(error.message, error.status);
  }
};
