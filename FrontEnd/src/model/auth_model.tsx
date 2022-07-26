import AuthApi from "./auth_api"
import {userToken} from "../store/authSlice";

export type User = {
    email: string,
    password: string
}

const logIn = async (email: string, password: string): Promise<undefined> => {
    const login: undefined = await AuthApi.logIn(email, password)
    return login;
}
const register = async (email: string, password: string) => {
    const register = await AuthApi.register(email, password);
    return register;

}

const logOut = async (accessToken: string) => {
    const logOut = await AuthApi.logOut(accessToken);
    return logOut;
}

const renewToken = async (tokens: userToken) => {
    const renew = await AuthApi.renewToken(tokens);
    return renew;
}

export default {
    logIn,
    register,
    logOut,
    renewToken
}