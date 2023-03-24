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
import { getAllDocument } from "./documentAPI";

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
    await getAllDocument(dispatch);
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
    // get document of post
    const documents = await getAllDocument(dispatch, { postId: id });
    console.log(res.data);
    await dispatch(getPost({ post: res.data, comments, documents }));
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
export const getUserPost = async (userId) => {
  try {
    //get post of user
    const res = await axiosClient.get(`/api/post/${userId}/user`);
    return res.data;
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
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
