import axiosClient from "./axiosClient";
import { setAllDocument } from "../redux/DocumentSlice";
import showToast from "./showToast";

// params : {courseId,postId}
export const getAllDocument = async (dispatch, params) => {
  try {
    const res = await axiosClient.get("/api/document/", { params });
    if (params?.postId || params?.courseId) {
      return res.data;
    }
    await dispatch(setAllDocument(res));
  } catch (error) {
    console.log(error);
    showToast(error.data?.message, "error");
  }
};
// Get document for author
export const getUserDocument = async (userId) => {
  try {
    const res = await axiosClient.get(`/api/document/${userId}`);
    console.log(res.data);
    return res.data;
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
// remove doc when edit
export const deleteDoc = async (docId) => {
  try {
    await axiosClient.delete(`/api/document/${docId}`);
  } catch (error) {
    showToast(error.data.message, "error");
  }
};
