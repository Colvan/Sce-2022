import apiClient from "./ApiClient"

const logIn = async (email:string,password:string) => {
    const res = await apiClient.post("/auth/login", {
        email: email,
        password: password
    })
    if (res.ok) {
        console.log("user loged in");
        return res.data;
    } else {
        console.log("login failed")
    }
}
const register = async (email:string,password:string) => {
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

export default {
    logIn,
    register
}