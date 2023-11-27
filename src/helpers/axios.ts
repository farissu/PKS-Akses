import axios from 'axios';

interface Options {
    method: string
    url: string
    params: string
    token: string
    formData: any
    cancelToken: any
}
export default async function axiosHandler({ method, url, params, token, formData, cancelToken }: Options) {
    // method, params, accessToken, data, cancelToken
    // example params /program?pages=2&offsets=2
    // const URL = process.env.API_URL + params;
    let cancel = cancelToken;
    let header: any = {
        'Accept': "application/json"
    };
    if (token) {
        header.Authorization = `Bearer ${token ? token : ""}`;
    }
    // console.log("REQ", header, URL, formData);
    //@ts-ignore

    return axios({
        method: method,
        url: `${url}${params ? params : ""}`,
        headers: header,
        cancelToken: new axios.CancelToken((c) => cancel = c),
        data: formData ? formData : "",
    }).then((res) => {
        return res;
    }).catch((error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log("Error 1 AXIOS", error.response);
            console.log("Error 1 AXIOS", error.response.status);
            console.log("Error 1 AXIOS", error.response.headers);
            return error.response;
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log("Error 2 AXIOS", error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error 3 AXIOS", error.message);
        }
        console.log("Error AXIOS Config", error.config);
        return null;
    });
}
