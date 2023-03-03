import axiosClient from "./axiosClient.js";
import { authSaveData } from "../redux/AuthSlice.js";
import { createStandaloneToast } from '@chakra-ui/toast'

const { toast } = createStandaloneToast()

export const loginAPI = async (email, password, dispatch) => {
    try {
        // Call API
        const data = await axiosClient.post('api/auth/login',{email, password})
        // Update user, token in authSlice
        dispatch(authSaveData(data))
    } catch (error) {
        toast({
            description: error.data.message,
            status: 'error',
            duration: 9000,
            position: 'top-right',
            isClosable: true,
        })
    }
}
