import React from "react"
import "reflect-metadata"
import ReactDOM from "react-dom/client"
import "./styles/index.css"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { Provider as ReduxProvider } from "react-redux"
import { setupStore } from "./store"
import { InversifyContextProvider } from "./hooks/useInjection"
import { container } from "./inversify"

export const store = setupStore()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
    <InversifyContextProvider container={container}>
        <ReduxProvider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ReduxProvider>
    </InversifyContextProvider>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
