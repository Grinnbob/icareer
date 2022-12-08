import { IUser } from "../models/IUser"

// states
export interface IUsersState {
    users: IUser[]
    loading: boolean
    error?: null | string
}

export interface IState {
    user: IUser | null
    loading: boolean
    error?: null | string
}

// actions
export enum UserActionTypes {
    FETCH_USERS = "FETCH_USERS",
    FETCH_USERS_SUCCESS = "FETCH_USERS",
    FETCH_USERS_ERROR = "FETCH_USERS",
}

interface IFetchUsersAction {
    type: UserActionTypes.FETCH_USERS
}

interface IFetchUsersSuccessAction {
    type: UserActionTypes.FETCH_USERS_SUCCESS
    payload: IUser[]
}

interface IFetchUsersErrorAction {
    type: UserActionTypes.FETCH_USERS_ERROR
    payload: string
}

export type UserAction =
    | IFetchUsersAction
    | IFetchUsersErrorAction
    | IFetchUsersSuccessAction

// export type UserAction = {
//     type: UserActionTypes
//     payload?: IUser[] | string
// }
