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

}

class Test extends React.Component<IProps, IState> {
    public render() {
        return (
            <div className={ cx("") }>
                ASdaSD!!!!!!!!!!
                asdasd!!!!!!!!!!!
            </div>
        )
    }
}

class MainLayout extends React.Component<IProps, IState> {

    public state = {

    }

    public render() {
        return (
            <div className={ cx("") }>
                Hello!21121111
                <Test/>
            </div>
        )
    }
}

export default connect(({ rooms, config }: IAppState) => {
    return {}
})(MainLayout)
