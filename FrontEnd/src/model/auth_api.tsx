import apiClient from "./ApiClient"
import {userToken} from "../store/authSlice";
import {ApiResponse} from "apisauce";

const logIn = async (email: string, password: string):Promise<undefined> => {
    const res:ApiResponse<any> = await apiClient.post("/auth/login", {
        email: email,
        password: password
    })
    if (res.ok) {
        console.log("user logged in");
        return res.data;
    } else {
        console.log("login failed")
    }
}
const register = async (email: string, password: string) => {
    const res = await apiClient.post("/auth/register", {
        email: email,
        password: password
    })
    if (res.ok) {
        console.log("user registered ");
        return res.data;
    } else {
        console.log("register failed");
    }
}

const logOut = async (accessToken: string) => {
    const res = await apiClient.post("/auth/logout", {}, {
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        }
    )
    console.log(`this is the access at api`)
    console.log(accessToken)
    if (res.ok) {
        console.log("user logged out");
        return res.data;
    } else {
        console.log("log out failed: " + res.originalError);
    }
}

const renewToken = async (tokens: userToken) => {
    const res = await apiClient.post("/auth/refresh", {_id: tokens._id}, {
        headers: {
            authorization: `Bearer ${tokens.refresh_token}`
        }
    })
    if (res.ok) {
        return res.data;
    } else {
        console.log("renew problem: " + res.originalError.message)
    }
}

export default {
    logIn,
    register,
    logOut,
    renewToken
}