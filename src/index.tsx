import "@babel/polyfill"
import { connect } from "dva"
import createLoading from "dva-loading"
import React from "react"
import MainLayout from "./layouts/Main"
import dvaApp from "dvaApp"
import "reset-css"
import "./index.scss"
import AppRouter from "./router/Router"
import ReactDOM from "react-dom"

const containerName = "#root"

// @ts-ignore
const modelsReq = require.context("./dvaApp/models", true, /\.ts$/)

modelsReq.keys().forEach((filename: string) => {
    const model = modelsReq(filename).default
    if (!model) return

    dvaApp.model(model)

    if (module.hot) {
        // debugger
        console.log("[HMR] inited with babel-plugin-dva-hmr")
        const modelNamespaceMap: {[key: string]: string} = {}
        modelNamespaceMap[filename] = model.namespace
        const filePath = "./dvaApp/models/" + filename.replace(".ts", "").replace("./", "")
        console.log(filePath)
        module.hot.accept(filePath, () => {
            debugger
            try {
                dvaApp.unmodel(modelNamespaceMap[filename])
                const newModel = modelsReq(filename).default
                if (newModel) {
                    dvaApp.model(newModel)
                }
            } catch(e) { console.error(e) }
        })
    }
})

dvaApp.use({
    onHmr(render) {
        if (module.hot) {
            const renderNormally = render
            const renderException = (error) => {
                const RedBox = require("redbox-react")
                ReactDOM.render(React.createElement(RedBox, { error: error }), document.querySelector(containerName))
            }
            const newRender = (router) => {
                try {
                    renderNormally(router)
                } catch (error) {
                    console.error("error", error)
                    renderException(error)
                }
            }
            module.hot.accept("./router/Router", () => {
                debugger
                const router = require("./router/Router")
                newRender(router.default || router)
            })
        }
    },
})

dvaApp.use(createLoading())

dvaApp.router(AppRouter)

dvaApp.start("#root")
