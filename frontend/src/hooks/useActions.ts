import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import { AppDispatch } from "../store"
import ActionCreators from "../store/action-creators/"

export const useActions = () => {
    const dispatch: AppDispatch = useDispatch()
    return bindActionCreators(ActionCreators, dispatch)
}
