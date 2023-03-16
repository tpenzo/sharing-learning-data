import { fetchChats } from "../redux/ChatSlice"
import axiosClient from "./axiosClient"
import { store } from "../redux/store"
import showToast from "./showToast"

export const fetchChatsAPI = async (dispatch) => {
    try {

        const res = await axiosClient.get('/api/chat/')
        const { chat } = store.getState()
        
        // When you want to message someone, the chat is brought to the top
        if(chat.selectedChat){
            res.data.sort((a, b) => {
                if (a._id === chat.selectedChat?._id) {
                    return -1;
                }
                return 0;
            });
            await dispatch(fetchChats(res.data))
        } else{
            await dispatch(fetchChats(res.data))
        }
        
    } catch (error) {
        showToast(error.data.message, 'error')
    }
}
