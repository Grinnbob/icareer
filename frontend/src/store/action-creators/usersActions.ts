import { createAsyncThunk } from "@reduxjs/toolkit"
import $api from "../../http"
import { IUser } from "../../models/IUser"

export const getUsers = createAsyncThunk("users", async (_, thunkAPI) => {
    try {
        const response = await $api.get<IUser[]>("/users")
        return response.data
    } catch (e) {
        return thunkAPI.rejectWithValue("Error loading users")
    }
})
