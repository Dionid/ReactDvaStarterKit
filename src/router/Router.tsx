import React from "react"
import { Router, Route } from "dva/router"
import MainLayout from "../layouts/Main"
import {RouterAPI, Router as DvaRouter} from "dva"

const AppRouter: DvaRouter = ({ history }) => {
    return (
        <Router history={history}>
            <Route path="/" component={MainLayout} />
        </Router>
    )
}

export default AppRouter
