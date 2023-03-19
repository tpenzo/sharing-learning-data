import axiosClient from "./axiosClient.js";
import { setStudentList, setTeacherList, setMinistryList } from "../redux/ManageSlice.js";
import showToast from "./showToast.js";

export const getStudentListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/student/all');
        dispatch(setStudentList(response.data));
    } catch (error) {
        showToast(error.data.message, 'warning');
    }
}

export const getTeacherListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/teacher/all');
        dispatch(setTeacherList(response.data));
    } catch (error) {
        showToast(error.data.message, 'warning');
    }
}

export const getMinistryListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/ministry/all');
        dispatch(setMinistryList(response.data));
    } catch (error) {
        showToast(error.data.message, 'warning');
    }
}

export const createAccountAPI = async (role, user)=>{
    try {
        const response = await axiosClient.post(`/api/auth/register/${role}`, user)
        console.log(response.data);
        showToast("Thêm tài khoản thành công", "success");
    } catch (error) {
        showToast(error.data.message, 'error');
        showToast("Tài khoản đã tồn tại", 'error');
    }
}