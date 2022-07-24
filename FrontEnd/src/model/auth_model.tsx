import AuthApi from "./auth_api"

type AuthToken = {
    _id: string,
    access_token: string,
    refresh_token: string
}

export type User = {
    email: string,
    password: string
}

const logIn = async (email: string, password: string) => {
    const login = await AuthApi.logIn(email, password)
    return login;
}
const register = async (email: string, password: string) => {
    const register = await AuthApi.register(email, password);
    return register;

}

export default {
    logIn,
    register
}