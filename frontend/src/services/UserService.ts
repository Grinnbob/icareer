import $api from "../http"
import { AxiosResponse } from "axios"
import { IUser } from "../models/IUser"
import { injectable } from "inversify"

@injectable()
export default class UserService {
    constructor() {}

    static async getMe(): Promise<AxiosResponse<IUser>> {
        return $api.get<IUser>("/me")
    }

    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>("/users")
    }
}
