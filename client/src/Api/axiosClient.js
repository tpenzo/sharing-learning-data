import axios from 'axios'
import { store } from '../redux/store.js'
import jwtDecode from 'jwt-decode'
import { updateNewToken } from '../redux/AuthSlice.js'

const axiosClient = axios.create({
    headers: {
        "content-type": "application/json",
    }
})


axiosClient.interceptors.request.use(async req => {
    const state = store.getState()
    let token = state.auth.token
    if(token){
        const decodedToken = jwtDecode(token)
        let date = new Date()
        if(decodedToken.exp < date.getTime() / 1000){
            try {
                const { data } = await axios.get('/api/auth/refresh')
                store.dispatch(updateNewToken(data.accessToken))
                req.headers.authorization = `Bearer ${data.accessToken}`
            } catch (error) {
                console.log("Refresh token error: " +  error)
            }
        } else{
            req.headers.authorization = `Bearer ${token}`
        }
    }
    return req
})

axiosClient.interceptors.response.use(
   (response) => {
      if (response && response.data) {
         return response.data;
      }
      return response;
   },
   (error) => {
      throw error.response;
   }
);

export default axiosClient