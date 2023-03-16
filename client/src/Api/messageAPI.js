import { store } from "../redux/store";
import axiosClient from "./axiosClient";
import showToast from "./showToast.js";

export const fetchMessagesAPI = async ( chatId ) => {
   try {
    const res = await axiosClient.post('/api/message/', {chatId});
    return res.data
  } catch (error) {
    showToast(error.message, error.status);
    return []
  }
}

export const sendMessageAPI = async (message) => {
  try {
      const res = await axiosClient.post('/api/message/send', message)
      return res.data
  } catch (error) {
    showToast(error.message, error.status);
    return null
  }
}