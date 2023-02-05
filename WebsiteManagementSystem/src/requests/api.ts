import request from "./request";

interface loginResponse {
    code: string
    config: any
    message: string
    name: string
    request: any
    response: any
    stack: string
    status: number
    data: any
}
export const login = async (username: string, password: string) => {
    const res: loginResponse = await request.post('/admin/login', {
        username, password
    })
    return res
}