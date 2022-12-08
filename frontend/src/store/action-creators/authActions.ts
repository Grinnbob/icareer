import { createAsyncThunk } from "@reduxjs/toolkit"
import { IAuthRequest, ISignupRequest } from "../../models/request/AuthRequest"
import AuthService from "../../services/AuthService"

export const login = createAsyncThunk(
    "auth/login",
    async (payload: IAuthRequest, thunkAPI) => {
        try {
            const response = await AuthService.login(
                payload.email,
                payload.password
            )

            return response
        } catch (e) {
            return thunkAPI.rejectWithValue("Login error")
        }
    }
)

export const signup = createAsyncThunk(
    "auth/signup",
    async (payload: ISignupRequest, thunkAPI) => {
        try {
            const response = await AuthService.signup(
                payload.email,
                payload.password,
                payload.role
            )

            // if (!response || response.status == 400)
            //     throw new Error("No response")

            return response.data
        } catch (e) {
            return thunkAPI.rejectWithValue("Signup error")
        }
    }
)

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
    try {
        const response = await AuthService.logout()
        return response
    } catch (e) {
        return thunkAPI.rejectWithValue("Logout error")
    }
})
