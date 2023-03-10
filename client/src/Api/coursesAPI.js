import { setAllCoursesData } from "../redux/AllCoursesSlice";
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

export const createCourse = async (course) => {
    try {
        const response = await axiosClient.post('/api/courses/create', {course});
    } catch (error) {
        showToast(error.data.message, 'error')
    }

}

export const updateCourse = async (course) => {
    try {
        const response = await axiosClient.post('/api/courses/update', {course})
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}