import { IUser } from "../IUser"

export interface IAuthResponse {
    data: {
        token: string
        user: IUser
    }
}
