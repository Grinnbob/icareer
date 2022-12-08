import { Container } from "inversify"
import AuthService from "./services/AuthService"
import { TokenStorage } from "./utils/tokenStorage"

export const container = new Container({
    skipBaseClassChecks: true,
})

// Libs
container
    .bind(TokenStorage)
    .toSelf()
    .inSingletonScope()
container
    .bind(AuthService)
    .toSelf()
    .inSingletonScope()
