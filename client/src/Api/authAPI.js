import axiosClient from "./axiosClient.js";
import { authSaveData } from "../redux/AuthSlice.js";



export const loginAPI = async (email, password, disptach) => {
    try {
        // Call API
        const data = await axiosClient.post('api/auth/login',{email, password})
        console.log(data)
        // Update user, token in authSlice
        disptach(authSaveData(data))
    } catch (error) {
        console.log("ERROR: " + error.message)
    }
}
