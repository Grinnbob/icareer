import React, { FC, useState } from "react"
import { useInjection } from "../hooks/useInjection"
import AuthService from "../services/AuthService"

const LoginPage: FC = () => {
    const [email, setEmail] = useState<string>("")
    const [password, setPassord] = useState<string>("")
    // const { getUsers } = useActions()
    const authService = useInjection(AuthService)
    const [loginError, setLoginError] = useState<boolean>(false)
    const [passwordError, setPasswordError] = useState<boolean>(false)

    // const { users, error } = useTypedSelector((state) => state.users)

    const validateCredentials = (): void => {
        if (!email) setLoginError(true)
        if (!password) setPasswordError(true)
    }

    const login = async (): Promise<void> => {
        validateCredentials()
        if (loginError || passwordError) return

        // await authService.login(email, password)
    }

    return (
        <div>
            <input
                type="text"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
            />

            <input
                type="text"
                placeholder="Password"
                onChange={(e) => setPassord(e.target.value)}
                value={password}
            />

            <button onClick={login}>Login</button>
            <button>Registration</button>
        </div>
    )
}

export default LoginPage
