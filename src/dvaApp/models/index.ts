import {ICountState} from "./count"

export interface IAppStateLoading {
    global: boolean,
    models: {
        count: boolean,
    },
    effects: {
        "count/add": () => void,
    }
}

export default interface IAppState {
    count: ICountState,
}
