import React, { lazy } from "react"
import { Roles } from "./models/Roles"

const LoginPage = lazy(() => import("./pages/LoginPage"))
const SignupPage = lazy(() => import("./pages/SignupPage"))
const AccessDeniedPage = lazy(() => import("./pages/AccessDeniedPage"))
const Home = lazy(() => import("./pages/Home"))
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"))

const VacancyCreatePage = lazy(() =>
    import("./pages/recruiter/VacancyCreatePage")
)

const ResumeCreatePage = lazy(() =>
    import("./pages/candidate/ResumeCreatePage")
)

type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export interface IRoute {
    path: string
    component: React.FC
    isPrivate: boolean
    roles: Roles[]
}

const createRoutes = (
    prefix: string,
    defaultRoles: Roles[],
    defaultIsPrivate: boolean,
    routeParams: Array<PartialBy<IRoute, "isPrivate">>
): IRoute[] => {
    return routeParams.reduce((carry, routeParam) => {
        carry.push({
            path: prefix + routeParam.path,
            component: routeParam.component,
            roles: [...routeParam.roles, ...defaultRoles],
            isPrivate: routeParam.isPrivate || defaultIsPrivate,
        })
        return carry
    }, [] as IRoute[])
}

const PublicRoutes: IRoute[] = createRoutes("/", [], false, [
    {
        path: "/login",
        component: LoginPage,
        roles: [],
    },
    {
        path: "/signup",
        component: SignupPage,
        roles: [],
    },
    {
        path: "/access_denied",
        component: AccessDeniedPage,
        roles: [],
    },
    {
        path: "/404",
        component: NotFoundPage,
        roles: [],
    },
])

const PrivateRoutes: IRoute[] = createRoutes("/", [Roles.admin], true, [
    {
        path: "/home",
        component: Home,
        roles: [Roles.candidate, Roles.recruiter],
    },
    {
        path: "/vacancy/create",
        component: VacancyCreatePage,
        roles: [Roles.recruiter],
    },
    {
        path: "/resume/create",
        component: ResumeCreatePage,
        roles: [Roles.candidate],
    },
])

export const RoutesList: IRoute[] = [...PublicRoutes, ...PrivateRoutes]
