import axiosClient from "./axiosClient.js";
import { setStudentList, setTeacherList, setMinistryList } from "../redux/ManageSlice.js";
import showToast from "./showToast.js";

export const getStudentListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/student/all');
        console.log(response.data);
        dispatch(setStudentList(response.data));
    } catch (error) {
        showToast(error.message, 'warning');
    }
}

export const getTeacherListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/teacher/all');
        console.log(response.data);
        dispatch(setTeacherList(response.data));
    } catch (error) {
        showToast(error.message, 'warning');
    }
}

export const getMinistryListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/ministry/all');
        console.log(response.data);
        dispatch(setMinistryList(response.data));
    } catch (error) {
        showToast(error.message, 'warning');
    }
}