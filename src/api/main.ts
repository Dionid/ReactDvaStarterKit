import {getToken} from "./mainToken"
import axios, {AxiosError, AxiosResponse, AxiosRequestConfig} from "axios"

const ROOT_URL = ""

interface IRequestSettings extends AxiosRequestConfig {
    needAuth: boolean,
    headers: {[key: string]: string}
    responseType: string
    method: string
    data: string | FormData
}

interface IRequestDataBeforeSerialization {
    [key: string]: any
}

const CONFIG: IRequestSettings = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
    responseType: "json",
    needAuth: true,
    data: "",
    method: "get",
}

const makeUrl = (uri: string) => ROOT_URL + (uri[0] === "/" ? uri : "/" + uri)

const request = async (url: string, settings: IRequestSettings) => {
    if (settings.needAuth) {
        settings.headers.Authorization = "Bearer " + await getToken()
    }
    delete settings.auth
    return axios({
            url: makeUrl(url),
            ...settings,
        })
        .then((resp: AxiosResponse) => {
            return [ null, resp.data ]
        })
        .catch(async (err: AxiosError) => {
            if (!err) {
                return [ new Error(), null ]
            }
            if (err.response && err.response.status && err.response.status === 401) {
                // This place to logout user
                // store.dispatch(handleLogout())
            }
            if (err.response) {
                return [ err.response, null ]
            } else {
                return [ err, null ]
            }
        })
}

const get = (uri: string, config: IRequestSettings) => request(uri, {
    ...CONFIG,
    ...config,
    method: "get",
})

const post = (uri: string, data: IRequestDataBeforeSerialization = {}, config: IRequestSettings) => request(uri, {
    ...CONFIG,
    ...config,
    method: "post",
    data: JSON.stringify(data),
})

const put = (uri: string, data: IRequestDataBeforeSerialization = {}, config: IRequestSettings) => request(uri, {
    ...CONFIG,
    ...config,
    method: "put",
    data: JSON.stringify(data),
})

const del = (uri: string, config: IRequestSettings) => request(uri, {
    ...CONFIG,
    ...config,
    method: "delete",
})

const postMultipart = (uri: string, data: IRequestDataBeforeSerialization = {}, config: IRequestSettings) => {
    const req = {
        ...CONFIG,
        ...config,
        method: "post",
    }

    req.headers = {
        "Content-Type": "multipart/form-data",
    }

    req.data = new FormData()

    for (const item in data) {
        if (!item) {
            continue
        }
        req.data.append(item, data[item])
    }

    return request(uri, req)
}

export {
    get,
    post,
    put,
    del,
    postMultipart,
}
