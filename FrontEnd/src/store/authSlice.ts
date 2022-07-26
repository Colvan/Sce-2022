import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type userToken = {
    _id: string
    access_token: string,
    refresh_token: string,
    email: string
} | null

type InitialState = {
    isLoggedIn: boolean,
    userToken: userToken
}

const initialState: InitialState = {
    isLoggedIn: false,
    userToken: null
}

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setUserToken(state, action: PayloadAction<userToken>) {
            state.userToken = action.payload;
        },
        logOut(state) {
            state.userToken = null;
            state.isLoggedIn = false;
        }
    }
})

export const AuthActions = AuthSlice.actions;
export default AuthSlice;