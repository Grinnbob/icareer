import React, { Suspense } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { useTypedSelector } from "../hooks/useTypedSelector"
import { IRoute } from "../routes"

export const genRoutes = (routes: IRoute[]) => {
    const me = useTypedSelector((state) => state.auth.me)
    const token = useTypedSelector((state) => state.auth.token)
    const isAuthenticated = !!token

    return (
        <Routes>
            {isAuthenticated &&
                routes
                    .filter((route) => route.isPrivate)
                    .map((route) => {
                        const isHasAccess =
                            me &&
                            (route.roles.length === 0 ||
                                route.roles.includes(me.role.value))
                                ? true
                                : false

                        if (!isHasAccess)
                            return (
                                <Route
                                    key={route.path}
                                    path={route.path}
                                    element={
                                        <Suspense>
                                            <Navigate to="/access_denied" />
                                        </Suspense>
                                    }
                                />
                            )

                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    <Suspense>
                                        <route.component />
                                    </Suspense>
                                }
                            />
                        )
                    })}
            {routes
                .filter((route) => !route.isPrivate)
                .map((route) => {
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Suspense>
                                    <route.component />
                                </Suspense>
                            }
                        />
                    )
                })}
            <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
    )
}
