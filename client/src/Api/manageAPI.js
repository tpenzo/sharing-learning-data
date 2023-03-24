import axiosClient from "./axiosClient.js";
import { setStudentList, setTeacherList, setMinistryList } from "../redux/ManageSlice.js";
import showToast from "./showToast.js";

export const getStudentListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/student/all');
        dispatch(setStudentList(response.data));
        return response.data
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
        showToast("Tài khoản được thêm thành công", "success");
    } catch (error) {
        // showToast(error.data.message, 'error');
        showToast(`Tài khoản ${user.email} đã tồn tại`, 'error');
    }
}

export const removeAccountAPI = async (accountId) =>{
    try {
        const response = await axiosClient.post('/api/auth/account/remove', {accountId})
        showToast("Xoá tài khoản thành công", "success");
    } catch (error) {
        showToast(error.data.message, 'error');
        showToast("Không thể tìm thông tin tài khoản để xoá", 'error');
    }
}

export const updateAccountAPI = async (account) =>{
    try {
        console.log(account);
        const response = await axiosClient.post('/api/auth/account/update', account)
        showToast("Thông tin tài khoản được cập nhật thành công", "success")
    } catch (error) {
        showToast(error.data.message, 'error');
    }
}