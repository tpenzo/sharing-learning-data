import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    chats: [],
    selectedChat: null
}

const chatSlice = createSlice({
    name: "chatSlice",
    initialState,
    reducers: {
        fetchChats: (state, action) => {
            state.chats = action.payload
        },
        setSelectedChat: (state, action) => {
            state.selectedChat = action.payload
        },
        resetChatSlice: () => initialState
    }
})

export const { fetchChats, setSelectedChat, resetChatSlice }  = chatSlice.actions

export default chatSlice.reducer