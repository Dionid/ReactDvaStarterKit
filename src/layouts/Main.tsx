import {Action, Dispatch} from "redux"
import React from "react"
import {connect} from "dva"
import IAppState from "models"
import styles from "./Main.scss"
import classnamesBind from "classnames/bind"

const cx = classnamesBind.bind(styles)

interface IProps {
    dispatch: Dispatch<Action>,
}

interface IState {
    test: boolean
}

class MainLayout extends React.Component<IProps, IState> {

    public state = {
        test: true,
    }

    public render() {
        return (
            <div className={ cx("") }>
                Hello!
            </div>
        )
    }
}

export default connect(({}: IAppState) => {
    return {}
})(MainLayout)
