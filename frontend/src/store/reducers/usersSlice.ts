import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUser } from "../../models/IUser"
import { IUsersState } from "../../types/users"
import { getUsers } from "../action-creators/usersActions"

const initialState: IUsersState = {
    users: [],
    loading: false,
    error: null,
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: {
        // success
        [getUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
            state.loading = false
            state.users = action.payload
            state.error = ""
        },
        // loading
        [getUsers.pending.type]: (state) => {
            state.loading = true
        },
        // error
        [getUsers.rejected.type]: (state, action: PayloadAction<string>) => {
            state.loading = false
            state.error = action.payload
        },
    },
})

export default userSlice.reducer
