import axios, { AxiosRequestConfig } from "axios"
import { store } from ".."
import { logout } from "../store/action-creators/authActions"
import { TokenStorage } from "../utils/tokenStorage"

const tokenStorage = new TokenStorage()

const $api = axios.create({
    // withCredentials: true, // add cookie to each request
    baseURL: process.env.REACT_APP_BACKEND_API_URL,
})

// add interceptors = before request
$api.interceptors.request.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        try {
            if (tokenStorage.getToken())
                config.headers!.Authorization = `Bearer ${tokenStorage.getToken()}`
        } catch (e) {
            console.log(e)
        }
        return config
    }
)

$api.interceptors.response.use(
    (config: AxiosRequestConfig): AxiosRequestConfig => {
        return config
    },
    async (error) => {
        // const originalRequest = error.config
        if (error.response.status == 401) {
            try {
                store.dispatch(logout())
                console.log("Anauthorized!") // TODO: add toast here?
                // return $api.request(originalRequest)
            } catch (e) {
                console.log("User unauthorized!", e)
            }
        }
    }
)

export default $api
