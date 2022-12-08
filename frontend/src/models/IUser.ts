import { UserRole } from "./Roles"

export interface IUser {
    id: number
    email: string
    role: UserRole
}
