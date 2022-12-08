import { injectable } from "inversify"

const localStorageTokenKey = "tokenStorage_tokenKey"
const localStorageRefreshTokenKey = "tokenStorage_refreshTokenKey"

@injectable()
export class TokenStorage {
    setToken(token: string | null): void {
        localStorage.setItem(localStorageTokenKey, JSON.stringify(token))
    }

    getToken(): string | null {
        const data = localStorage.getItem(localStorageTokenKey)
        if (!data) return null
        return JSON.parse(data)
    }

    removeToken(): void {
        localStorage.removeItem(localStorageTokenKey)
    }

    setRefreshToken(refreshToken: string): void {
        localStorage.setItem(localStorageRefreshTokenKey, refreshToken)
    }
    getRefreshToken(): string | null {
        return localStorage.getItem(localStorageRefreshTokenKey)
    }
    removeRefreshToken(): void {
        localStorage.removeItem(localStorageRefreshTokenKey)
    }
}
