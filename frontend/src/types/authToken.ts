import { IUser } from "../models/IUser"

export interface IAuth {
    token: string | null
    me: IUser | null
    isLoading: boolean
    error: string | null
}
