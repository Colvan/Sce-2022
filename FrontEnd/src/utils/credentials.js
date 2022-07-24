import * as SecureStore from 'expo-secure-store';

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

export default {
    getCredentials,
    setCredentials
}