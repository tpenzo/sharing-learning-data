import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    socket: null
}

export const socketSlice = createSlice({
    name: "socketSlice",
    initialState,
    reducers: {
        setSocket(state, action){
            state.socket = action.payload
        }
    }
})

export const { setSocket } = socketSlice.actions


export default socketSlice.reducer