import mockserver from "./mockserver";

export const getData = () => {
    return mockserver({
        url: '/data',
        method: 'GET'
    })
}

export const getDatas = () => {
    return mockserver({
        url: '/datas',
        method: 'GET'
    })
}