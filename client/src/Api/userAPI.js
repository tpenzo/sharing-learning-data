import { followUser, unfollowUser } from "../redux/AuthSlice.js";
import { profileGetUser, profileUpdateFollower, profileUpdateUnFollower } from "../redux/ProfileSlice.js";
import axiosClient from "./axiosClient.js";
import showToast from "./showToast.js";

export const profileGetUserAPI = async (userId, dispatch) => {
    try {
        // Call API
        const res = await axiosClient.get(`/api/user/${userId}`)
        await dispatch(profileGetUser(res.data))
    } catch (error) {
       showToast(error.data.message, 'error')
    }
}

export const followUserAPI = async(userId, dispatch) => {
    try {
        // Call API
        const res = await axiosClient.post("/api/user/follow", {userId})
        // Update following of user
        await dispatch(followUser(userId))
        // Update follower of user profile
        await dispatch(profileUpdateFollower(userId))
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}

export const unFollowUserAPI = async(userId, dispatch) => {
    try {
        // Call API
        const res = await axiosClient.post("/api/user/unfollow", {userId})
        // Update following of user
        dispatch((unfollowUser(userId)))
        // Update follower of user profile
        dispatch(profileUpdateUnFollower(userId))
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}