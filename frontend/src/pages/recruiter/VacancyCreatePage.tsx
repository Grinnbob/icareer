import React, { useEffect, useState } from "react"
import {
    Container,
    Grid,
    Box,
    Typography,
    Stack,
    Checkbox,
    FormControlLabel,
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { FC } from "react"
import { useForm, SubmitHandler, FormProvider } from "react-hook-form"
import { boolean, object, string, TypeOf } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../../components/FormInput"
import { ReactComponent as GoogleLogo } from "../assets/images/google.svg"
import { ReactComponent as GitHubLogo } from "../assets/images/github.svg"
import { LinkItem, OauthMuiLink } from "./../LoginPage"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { signup } from "../../store/action-creators/authActions"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useNavigate } from "react-router-dom"
import { Roles } from "../../models/Roles"

const VacancyCreatePage: FC = () => {
    return <></>
}

export default VacancyCreatePage
