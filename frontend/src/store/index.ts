import { rootReducer } from "./reducers"
import { configureStore } from "@reduxjs/toolkit"

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    })
}
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore["dispatch"]
