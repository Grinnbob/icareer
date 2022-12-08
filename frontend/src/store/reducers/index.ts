import { combineReducers } from "redux"
import authReducer from "./authSlice"
import usersReducer from "./usersSlice"

export const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
})

export type RootState = ReturnType<typeof rootReducer>
