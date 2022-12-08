import React, { useEffect, useState } from "react"
import {
    Container,
    Grid,
    Box,
    Typography,
    FormControlLabel,
    TextField,
    RadioGroup,
    Radio,
    FormLabel,
    FormControl,
} from "@mui/material"
import LoadingButton from "@mui/lab/LoadingButton"
import { FC } from "react"
import {
    useForm,
    SubmitHandler,
    FormProvider,
    useController,
    Controller,
} from "react-hook-form"
import { nativeEnum, date, object, string, TypeOf, preprocess } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "../../components/FormInput"
import { useAppDispatch } from "../../hooks/useAppDispatch"
import { useTypedSelector } from "../../hooks/useTypedSelector"
import { useNavigate } from "react-router-dom"
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker"
import moment, { Moment } from "moment"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment"

export enum UserGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    OTHER = "OTHER",
}

const dateSchema = preprocess(
    (arg) => {
        console.log(arg)
        console.log(typeof arg)

        if (typeof arg == "string" || arg instanceof Date) return new Date(arg)
        try {
            const date = arg as Moment
            return date.toDate()
        } catch (e) {}
    },
    date()
        .min(new Date("1920-01-01"), "Похоже, вы староваты для работы!")
        .max(new Date("2004-01-01"), "Похоже, вы ещё молоды для работы!")
)

// 👇 Login Schema with Zod
const loginSchema = object({
    firstName: string()
        .min(1, "Введите имя")
        .max(32, "Похоже, что у Вас слишком длинное имя!"),
    lastName: string()
        .min(1, "Введите фамилию")
        .max(32, "Похоже, что у Вас слишком длинная фамилия!"),
    phone: string()
        .min(10, "Слишком коротко для телефона!")
        .max(20, "Слишком много символов для телефона!")
        .startsWith("+7", "Должен начинаться с +7")
        .optional(),
    location: string()
        .min(1, "Введите город")
        .max(100, "Слишком подробно, укажите город"),
    // birthDate: date()
    //     .min(new Date("1920-01-01"), "Похоже, вы староваты для работы!")
    //     .max(new Date("2004-01-01"), "Похоже, вы ещё молоды для работы!"),
    birthDate: dateSchema,
    gender: nativeEnum(UserGender),
})

// 👇 Infer the Schema to get the TS Type
type ILogin = TypeOf<typeof loginSchema>

const ResumeCreatePage: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    // 👇 Default Values
    const defaultValues: ILogin = {
        firstName: "",
        lastName: "",
        phone: "",
        location: "",
        birthDate: new Date("1990-01-01"),
        gender: UserGender.OTHER,
    }

    // 👇 The object returned from useForm Hook
    const methods = useForm<ILogin>({
        resolver: zodResolver(loginSchema),
        defaultValues,
    })

    const [birthDate, setBirthDate] = useState<Date | null>(null)
    const value = methods.getValues("birthDate") as Date
    const { handleSubmit, reset, control } = useForm()

    useEffect(() => {
        methods.register("birthDate")
    }, [methods.register])

    useEffect(() => {
        if (value) setBirthDate(value)
    }, [setBirthDate, value])

    // 👇 Submit Handler
    const onSubmitHandler: SubmitHandler<ILogin> = async (values: ILogin) => {}

    // const handleChangeDate = (newValue: Moment | null) => {
    //     // setBirthDate(newValue)
    // }

    // 👇 JSX to be rendered
    return (
        <Container
            maxWidth={false}
            sx={{
                height: "100vh",
                backgroundColor: { xs: "#fff", md: "#f4f4f4" },
            }}
        >
            <LocalizationProvider dateAdapter={AdapterMoment}>
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
                                justifyContent="center"
                            >
                                <Grid item xs={12} sm={6}>
                                    <Box
                                        display="flex"
                                        flexDirection="column"
                                        component="form"
                                        noValidate
                                        autoComplete="off"
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
                                            Создание резюме
                                        </Typography>

                                        <FormInput
                                            label="Имя"
                                            type="firstName"
                                            name="firstName"
                                            focused
                                            required
                                        />
                                        <FormInput
                                            type="lastName"
                                            label="Фамилия"
                                            name="lastName"
                                            required
                                        />
                                        <FormInput
                                            type="phone"
                                            label="Телефон"
                                            name="phone"
                                            required
                                        />
                                        <FormInput
                                            type="location"
                                            label="Город"
                                            name="location"
                                            required
                                        />

                                        {/* <Controller
                                            name={""}
                                            control={control}
                                            render={({
                                                field: { onChange, value },
                                            }) => (
                                                <DesktopDatePicker
                                                    onChange={onChange}
                                                    value={value}
                                                    label="Дата рождения"
                                                    inputFormat="DD/MM/YYYY"
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                        />
                                                    )}
                                                />
                                            )}
                                        /> */}

                                        <DesktopDatePicker
                                            label="Дата рождения"
                                            inputFormat="DD/MM/YYYY"
                                            value={birthDate}
                                            onChange={(date) => {
                                                if (date)
                                                    methods.setValue(
                                                        "birthDate",
                                                        date,
                                                        {
                                                            shouldValidate: true,
                                                            shouldDirty: true,
                                                        }
                                                    )
                                            }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    {...methods.register(
                                                        "birthDate"
                                                    )}
                                                />
                                            )}
                                        />
                                        {/* 
                                        <FormControlLabel
                                            control={
                                                <DesktopDatePicker
                                                    label="Дата рождения"
                                                    inputFormat="DD/MM/YYYY"
                                                    value={birthDate}
                                                    onChange={(date) => {
                                                        if (date)
                                                            methods.setValue(
                                                                "birthDate",
                                                                date,
                                                                {
                                                                    shouldValidate: true,
                                                                    shouldDirty: true,
                                                                }
                                                            )
                                                    }}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                        />
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
                                        /> */}

                                        <FormControl
                                            sx={{
                                                textAlign: "center",
                                                mt: "1.5rem",
                                            }}
                                        >
                                            <FormLabel id="sex-radio-buttons-group-label">
                                                Пол
                                            </FormLabel>

                                            <RadioGroup
                                                aria-labelledby="sex-radio-buttons-group-label"
                                                defaultValue="other"
                                                {...methods.register("gender")}
                                            >
                                                <FormControlLabel
                                                    value="male"
                                                    control={<Radio />}
                                                    label="Мужской"
                                                />
                                                <FormControlLabel
                                                    value="female"
                                                    control={<Radio />}
                                                    label="Женский"
                                                />
                                                <FormControlLabel
                                                    value="other"
                                                    control={<Radio />}
                                                    label="Другой"
                                                />
                                            </RadioGroup>
                                        </FormControl>

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
                                            Сохранить
                                        </LoadingButton>
                                    </Box>
                                </Grid>
                            </Grid>
                        </FormProvider>
                    </Grid>
                </Grid>
            </LocalizationProvider>
        </Container>
    )
}

export default ResumeCreatePage
