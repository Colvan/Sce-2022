import * as SecureStore from 'expo-secure-store';
import jwtDecode from "jwt-decode";
import AuthModel from "../model/auth_model";

const setCredentials = async tokens => {
    try {
        await SecureStore.setItemAsync('tokens', JSON.stringify(tokens))
    } catch (e) {
        console.log(e)
    }
}

const getCredentials = async () => {
    try {
        let tokens = await SecureStore.getItemAsync('tokens');
        if (tokens != null) {
            return JSON.parse(tokens)
        } else {
            return null
        }
    } catch (e) {
        console.log(e);
    }
    return null
}

const isTokenExpired = (token) => {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp < Date.now() / 1000;
}

const getVerifiedTokens = async () => {
    const tokens = await getCredentials();
    if (tokens) {
        console.log("checking access");
        if (!isTokenExpired(tokens.access_token)) {
            console.log("returning access");
            return tokens;
        } else {
            console.log("access expired, using refresh token:");
            console.log("fetching access using refresh token")
            const response = await AuthModel.renewToken(tokens)
            if (response) {
                let newTokens = {...tokens, ...response}
                return newTokens;
            }
            else {
                throw Error("invalid refresh token, please login.")
            }
        }
    } else {
        console.log("access not available. please login")
        return null;
    }
}

export default {
    getVerifiedTokens,
    setCredentials,
    isTokenExpired
}