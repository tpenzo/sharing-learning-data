import { 
    createComment, 
    createReplyComment, 
    deleteComment, 
    deleteReplyComment, 
    likeComment, 
    likeReplyComment, 
    unLikeComment, 
    unLikeReplyComment, 
    updateComment, 
    updateReplyComment 
} from "../redux/PostSlice"
import axiosClient from "./axiosClient"
import showToast from "./showToast"
import { store } from '../redux/store.js'

const state = store.getState()
const { socket } = state.socketInstance

export const fetchCmtsAPI = async ( postId ) => {
    try {
        const res = await axiosClient.get(`/api/comment/${postId}`)
        return res.data
    } catch (error) {
        showToast(error.data.message, 'error')
        return []
    }
}

export const likeCmtAPI = async ( cmtId, userId, cmtDadId = false, dispatch ) => {
    try {
        const res = await axiosClient.patch(`/api/comment/${cmtId}/like`)
        if(cmtDadId){
            await dispatch(likeReplyComment({cmtId, userId, cmtDadId}))
        } else {
            await dispatch(likeComment({cmtId, userId}))
        }
    } catch (error) {
        console.log()
        showToast(error.data.message, 'error')
    }
}

export const unLikeCmtAPI = async ( cmtId, userId, cmtDadId = false, dispatch ) => {
    try {
        const res = await axiosClient.patch(`/api/comment/${cmtId}/unlike`)
        if(cmtDadId){
            dispatch(unLikeReplyComment({cmtId, userId, cmtDadId}))
        } else {
            await dispatch(unLikeComment({cmtId, userId}))
        }
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}


export const createCmtAPI = async ( newCmt, dispatch ) => {
    try {
        const res = await axiosClient.post(`/api/comment/create`, newCmt)
        await dispatch(createComment(res.data))
        // socket
        // socket.emit('createCmt', res.data)
    } catch (error) {
        showToast(error.data.message, 'error')

    }
}

export const replyCmtAPI = async ( newReplyCmt, cmtDadId, dispatch ) => {
    try {
        const res = await axiosClient.post(`/api/comment/reply`, newReplyCmt)
        await dispatch(createReplyComment({newReplyCmt: res.data, cmtDadId}))
    } catch (error) {
        showToast(error.data.message, 'error')

    }
}

export const updateCmtAPI = async ( cmtId, newContent, cmtDadId = false, dispatch ) => {
    try {
        const res = await axiosClient.patch(`/api/comment/${cmtId}`, {content: newContent})
        if(cmtDadId){
            await dispatch(updateReplyComment({cmtId, cmtDadId, newContent}))
        } else{
            await dispatch(updateComment({cmtId, newContent}))
        }
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}

export const deleteCmtAPI = async ( cmtReplyId, cmtDadId = false, dispatch ) => {
    try {
        const res = await axiosClient.delete(`/api/comment/${cmtReplyId}`)
        if(cmtDadId){
            dispatch(deleteReplyComment({cmtReplyId, cmtDadId}))
        }
        else{
            await dispatch(deleteComment(cmtReplyId))
        }   
    } catch (error) {
        console.log(error)
        // showToast(error.data.message, 'error')
    }
}
