import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IAuthResponse } from "../../models/response/AuthResponse"
import { IAuth } from "../../types/authToken"
import { TokenStorage } from "../../utils/tokenStorage"
import { login, logout, signup } from "../action-creators/authActions"

const tokenStorage = new TokenStorage()
const me = localStorage.getItem("me")
    ? JSON.parse(localStorage.getItem("me")!)
    : null

const initialState: IAuth = {
    token: tokenStorage.getToken() || null,
    me,
    isLoading: false,
    error: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<IAuth>) => {
            state.token = action.payload.token
            tokenStorage.setToken(action.payload.token)

            state.me = action.payload.me
            localStorage.setItem("me", JSON.stringify(action.payload.me))
        },
        resetToken: (state) => {
            state.token = null
            tokenStorage.removeToken()
            tokenStorage.removeRefreshToken()

            localStorage.removeItem("me")
        },
    },
    extraReducers: {
        // success
        [login.fulfilled.type]: (
            state,
            action: PayloadAction<IAuthResponse>
        ) => {
            if (
                action.payload &&
                action.payload.data &&
                action.payload.data.user &&
                action.payload.data.token
            ) {
                state.me = action.payload.data.user
                state.error = null
                state.token = action.payload.data.token

                tokenStorage.setToken(action.payload.data.token)
                localStorage.setItem(
                    "me",
                    JSON.stringify(action.payload.data.user)
                )
            } else {
                console.log("Empty auth response")
            }
            state.isLoading = false
        },
        // loading
        [login.pending.type]: (state) => {
            state.isLoading = true
        },
        // error
        [login.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

        // success
        [signup.fulfilled.type]: (
            state,
            action: PayloadAction<IAuthResponse>
        ) => {
            if (
                action.payload &&
                action.payload.data &&
                action.payload.data.user &&
                action.payload.data.token
            ) {
                state.me = action.payload.data.user
                state.error = null
                state.token = action.payload.data.token

                tokenStorage.setToken(action.payload.data.token)
                localStorage.setItem(
                    "me",
                    JSON.stringify(action.payload.data.user)
                )
            } else {
                console.log("Empty auth response")
            }
            state.isLoading = false
        },
        // loading
        [signup.pending.type]: (state) => {
            state.isLoading = true
        },
        // error
        [signup.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },

        // success
        [logout.fulfilled.type]: (state) => {
            state.isLoading = false
            state.me = null
            state.error = null

            console.log("--- logout ---")

            tokenStorage.removeToken()
            localStorage.removeItem("me")
        },
        // loading
        [logout.pending.type]: (state) => {
            state.isLoading = true
        },
        // error
        [logout.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false
            state.error = action.payload
        },
    },
})

export const { setToken, resetToken } = authSlice.actions
export default authSlice.reducer
