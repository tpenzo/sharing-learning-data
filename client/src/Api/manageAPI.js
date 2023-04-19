import axiosClient from "./axiosClient.js";
import { setStudentList, setTeacherList, setMinistryList, appendStudentList, appendTeacherList, appendMinistryList, setStudentListTotal, setTeacherListTotal, setMinistryListTotal } from "../redux/ManageSlice.js";
import showToast from "./showToast.js";

export const getStudentListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/student/all/1');
        dispatch(setStudentList(response.data.studentList));
        dispatch(setStudentListTotal(response.data?.studentListCount))
        return response.data.studentList
    } catch (error) {
        console.log(error);
    }
}

export const appendStudentListAccountAPI = async (dispatch, page) => {
    try {
        const response = await axiosClient.get(`/api/user/student/all/${page}`);
        if(response.data.studentList.length>0){
            await dispatch(appendStudentList(response.data.studentList))
        } else {
            showToast("Không còn sinh viên nào nữa ok", "warning")
        }
    } catch (error) {
        console.log(error);
    }
}

export const getTeacherListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/teacher/all/1');
        dispatch(setTeacherList(response.data.teacherList));
        dispatch(setTeacherListTotal(response.data?.teacherListCount))
    } catch (error) {
        showToast(error.data.message, 'warning');
    }
}

export const appendTeacherListAccountAPI = async (dispatch, page) => {
    try {
        const response = await axiosClient.get(`/api/user/teacher/all/${page}`);
        if(response.data.teacherList?.length>0){
            await dispatch(appendTeacherList(response.data.teacherList))
        } else {
            showToast("Không còn giảng viên nào nữa", "warning")
        }
    } catch (error) {
        console.log(error);
    }
}

export const getMinistryListAccountAPI = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/user/ministry/all/1');
        dispatch(setMinistryList(response.data.ministryList));
        dispatch(setMinistryListTotal(response.data?.ministryListCount))
    } catch (error) {
        showToast(error.data.message, 'warning');
    }
}

export const appendMinistryListAccountAPI = async (dispatch, page) => {
    try {
        const response = await axiosClient.get(`/api/user/ministry/all/${page}`);
        if(response.data.ministryList?.length>0){
            await dispatch(appendMinistryList(response.data.ministryList))
        } else {
            showToast("Không còn giáo vụ nào nữa", "warning")
        }
    } catch (error) {
        console.log(error);
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

export const createAccountListAPI = async (accounts)=>{
    try {
        const response = await axiosClient.post("/api/auth/register/accounts", {accounts});
        if(response.data?.newAccountList.length > 0){
            showToast(`Thêm mới thành công ${response.data?.newAccountList.length} tài khoản`, 'success');
        }
        if(response.data.rejectAccounts.length > 0){
            showToast(`Thêm mới thất bại ${response.data.rejectAccounts.length} tài khoản`, 'error');
        }
    } catch (error) {
        console.log(error);
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