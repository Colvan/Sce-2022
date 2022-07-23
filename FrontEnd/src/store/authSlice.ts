import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const AuthSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        userToken: ""
    },
    reducers: {
        setIsLoggedIn(state, action: PayloadAction<boolean>) {
            state.isLoggedIn = action.payload;
        },
        setUserToken(state, action: PayloadAction<string>) {
            state.userToken = action.payload;
        }
    }
})

export const {setIsLoggedIn, setUserToken} = AuthSlice.actions;
export default AuthSlice.reducer;