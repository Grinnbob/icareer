import React from "react"
import { BrowserRouter as Router, Link } from "react-router-dom"
import { RoutesList } from "./routes"
import "./styles/App.css"
import { GenRoutes } from "./utils/genRoutes"

const App: React.FC = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Register</Link>
                    </li>
                    <li>
                        <Link to="/home">Home</Link>
                    </li>
                    <li>
                        <Link to="/vacancy/create">Create vacancy</Link>
                    </li>
                    <li>
                        <Link to="/resume/create">Create resume</Link>
                    </li>
                </ul>
            </nav>
            {GenRoutes(RoutesList)}
        </Router>
    )
}

export default App
