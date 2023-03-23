import axiosClient from "./axiosClient.js";
import { authSaveData, resetAuthSlice } from "../redux/AuthSlice.js";
import showToast from "./showToast.js";
import { resetProfileSlice } from "../redux/ProfileSlice.js";

export const loginAPI = async (email, password, dispatch) => {
    try {
        // Call API
        const res = await axiosClient.post('/api/auth/login',{email, password})
        // Update user, token in authSlice
        await dispatch(authSaveData(res))
        // show
        showToast('Đăng nhập thành công', 'success')
        return res.user
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}

export const logoutAPI = async (dispatch) => {
    try {
        // Call API
        const res = await axiosClient.get('/api/auth/logout')
        // Resert user, token in authSlice
        await dispatch(resetAuthSlice())
        await dispatch(resetProfileSlice())
        // show
        showToast('Đăng xuất thành công', 'success')
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}
