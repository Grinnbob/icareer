import React, { FC } from "react"
import LoadingButton from "@mui/lab/LoadingButton"
import { useAppDispatch } from "../hooks/useAppDispatch"
import { logout } from "../store/action-creators/authActions"

const AccessDenied: FC = () => {
    const dispatch = useAppDispatch()

    const handleLogout = async () => {
        dispatch(logout())
    }

    return (
        <div>
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
                onClick={() => handleLogout()}
            >
                Logout
            </LoadingButton>
        </div>
    )
}

export default AccessDenied
