import { setAllCoursesData, setTeacherList } from "../redux/AllCoursesSlice";
import axiosClient from "./axiosClient.js";
import showToast from "./showToast";

export const getCoursesList = async (dispatch) => {
    try {
        const response = await axiosClient.get('/api/courses/all');
        await dispatch(setAllCoursesData(response.data))
    } catch (error) {
        console.log(error);
    }
}

export const getCourseAPI = async (courseId, dispatch) => {
    try {
        const response = await axiosClient.get(`/api/courses/${courseId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const createCourseAPI = async (course) => {
    try {
        const response = await axiosClient.post('/api/courses/create', {course});
        showToast("Thêm nhóm học phần thành công", "success")
    } catch (error) {
        showToast(error.data.message, 'error')
    }

}

export const updateCourseAPI = async (course) => {
    try {
        const response = await axiosClient.post('/api/courses/update', {course})
    } catch (error) {
        showToast(error.data.message, 'error')
    }
    
}

export const addStudentIntoCourseAPI = async (course) =>{
    try {
        const response = await axiosClient.post('/api/courses/addStudent', {course})
        showToast("Thêm sinh viên thành công", 'success')
    } catch (error) {
        showToast(error.data, 'error')
    }
}

export const getTeacherListAPI = async (dispatch) => {
    try {
        // Call API
       const response = await axiosClient.get(`/api/user/teacher/all`);
       dispatch(setTeacherList(response.data))
    } catch (error) {
       showToast(error.data.message, 'error')
    }
}

export const getUserInfoAPI = async (userId) => {
    try {
        // Call API
       const response = await axiosClient.get(`/api/user/${userId}`);
       return response.data
    } catch (error) {
       showToast(error.data.message, 'error')
    }
}

export const getInfoByStudentCodeAPI = async (studentCode) => {
    try {
        // Call API
       const response = await axiosClient.get(`/api/user/student/${studentCode}`);
       return response.data
    } catch (error) {
       showToast(error.data.message, 'error')
    }
}
