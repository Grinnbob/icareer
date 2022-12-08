import React, { useEffect, useState } from "react"
import {
    Container,
    Grid,
    Box,
    Typography,
    Stack,
    Link as MuiLink,
    FormControlLabel,
    Checkbox,
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { FC } from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { literal, object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../components/FormInput"
import { ReactComponent as GoogleLogo } from "../assets/images/google.svg"
import { ReactComponent as GitHubLogo } from "../assets/images/github.svg"
import styled from "@emotion/styled"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { login } from "../store/action-creators/authActions"
import { useTypedSelector } from "../hooks/useTypedSelector"

// https://codevoweb.com/react-material-ui-and-react-hook-form-html-forms/
// https://github.com/wpcodevo/Blog_MUI_React-hook-form

// 👇 Styled React Route Dom Link Component
export const LinkItem = styled(Link)(() => ({
    textDecoration: "none",
    color: "#3683dc",
    "&:hover": {
        textDecoration: "underline",
        color: "#5ea1b6",
    },
}))

export const OauthMuiLink = styled(MuiLink)(() => ({
    textDecoration: "none",
    color: "#393e45",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6f7",
    borderRadius: 1,
    padding: "0.6rem 0",
    columnGap: "1rem",
    fontWeight: 500,
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#fff",
        boxShadow: "0 1px 13px 0 rgb(0 0 0 / 15%)",
    },
}))

// 👇 Login Schema with Zod
const loginSchema = object({
    email: string().min(1, "Email is required"),
    // .email("Email is invalid"),
    password: string()
        .min(1, "Password is required")
        // .min(8, "Password must be more than 8 characters")
        .max(32, "Password must be less than 32 characters"),
    persistUser: literal(true).optional(),
})

// 👇 Infer the Schema to get the TS Type
type ILogin = TypeOf<typeof loginSchema>

const LoginPage: FC = () => {
    const { me, error, isLoading, token } = useTypedSelector(
        (state) => state.auth
    ) // TODO: add toast
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isTypedLogin, setIsTypedLogin] = useState(false)

    // 👇 Default Values
    const defaultValues: ILogin = {
        email: "",
        password: "",
    }

    // 👇 The object returned from useForm Hook
    const methods = useForm<ILogin>({
        resolver: zodResolver(loginSchema),
        defaultValues,
    })

    // 👇 Submit Handler
    const onSubmitHandler: SubmitHandler<ILogin> = async (values: ILogin) => {
        dispatch(login(values))
        setIsTypedLogin(true)
        console.log(me)
    }

    useEffect(() => {
        if (isTypedLogin && !error && me && token) {
            setIsTypedLogin(false)
            navigate("/home")
        }
    }, [me, error, token, isTypedLogin])

    // 👇 JSX to be rendered
    return (
        <Container
            maxWidth={false}
            sx={{
                height: "100vh",
                backgroundColor: { xs: "#fff", md: "#f4f4f4" },
            }}
        >
            <Grid
                container
                justifyContent="center"
                alignItems="center"
                sx={{ width: "100%", height: "100%" }}
            >
                <Grid
                    item
                    sx={{
                        maxWidth: "70rem",
                        width: "100%",
                        backgroundColor: "#fff",
                    }}
                >
                    <FormProvider {...methods}>
                        <Grid
                            container
                            sx={{
                                boxShadow: { sm: "0 0 5px #ddd" },
                                py: "6rem",
                                px: "1rem",
                            }}
                        >
                            <Grid
                                item
                                container
                                justifyContent="space-between"
                                rowSpacing={5}
                                sx={{
                                    maxWidth: { sm: "45rem" },
                                    marginInline: "auto",
                                }}
                            >
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    sx={{
                                        borderRight: { sm: "1px solid #ddd" },
                                    }}
                                >
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        component="form"
                                        noValidate
                                        autoComplete="off"
                                        sx={{ paddingRight: { sm: "3rem" } }}
                                        onSubmit={methods.handleSubmit(
                                            onSubmitHandler
                                        )}
                                    >
                                        <Typography
                                            variant="h6"
                                            component="h1"
                                            sx={{
                                                textAlign: "center",
                                                mb: "1.5rem",
                                            }}
                                        >
                                            Log into your account
                                        </Typography>

                                        <FormInput
                                            label="Enter your email"
                                            type="email"
                                            name="email"
                                            focused
                                            required
                                        />
                                        <FormInput
                                            type="password"
                                            label="Password"
                                            name="password"
                                            required
                                            focused
                                        />

                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    size="small"
                                                    aria-label="trust this device checkbox"
                                                    required
                                                    {...methods.register(
                                                        "persistUser"
                                                    )}
                                                />
                                            }
                                            label={
                                                <Typography
                                                    variant="body2"
                                                    sx={{
                                                        fontSize: "0.8rem",
                                                        fontWeight: 400,
                                                        color: "#5e5b5d",
                                                    }}
                                                >
                                                    Trust this device
                                                </Typography>
                                            }
                                        />

                                        <LoadingButton
                                            loading={false}
                                            type="submit"
                                            variant="contained"
                                            sx={{
                                                py: "0.8rem",
                                                mt: 2,
                                                width: "80%",
                                                marginInline: "auto",
                                            }}
                                        >
                                            Login
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography
                                        variant="h6"
                                        component="p"
                                        sx={{
                                            paddingLeft: { sm: "3rem" },
                                            mb: "1.5rem",
                                            textAlign: "center",
                                        }}
                                    >
                                        Log in with another provider:
                                    </Typography>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        sx={{
                                            paddingLeft: { sm: "3rem" },
                                            rowGap: "1rem",
                                        }}
                                    >
                                        <OauthMuiLink href="">
                                            <GoogleLogo
                                                style={{ height: "2rem" }}
                                            />
                                            Google
                                        </OauthMuiLink>
                                        <OauthMuiLink href="">
                                            <GitHubLogo
                                                style={{ height: "2rem" }}
                                            />
                                            GitHub
                                        </OauthMuiLink>
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent="center">
                                <Stack sx={{ mt: "3rem", textAlign: "center" }}>
                                    <Typography
                                        sx={{ fontSize: "0.9rem", mb: "1rem" }}
                                    >
                                        Need an account?{" "}
                                        <LinkItem to="/signup">
                                            Sign up here
                                        </LinkItem>
                                    </Typography>
                                    <Typography sx={{ fontSize: "0.9rem" }}>
                                        Forgot your{" "}
                                        <LinkItem to="/forgotPassword">
                                            password?
                                        </LinkItem>
                                    </Typography>
                                </Stack>
                            </Grid>
                        </Grid>
                    </FormProvider>
                </Grid>
            </Grid>
        </Container>
    )
}

export default LoginPage
