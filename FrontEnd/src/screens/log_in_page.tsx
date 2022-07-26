import React, {FC, useState} from "react"
import {View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView} from "react-native"
import AuthModel, {User} from "../model/auth_model"
import COLORS from "../constants/colors"
import ActivityIndicator from "./component/custom_activity_indicator"
import {NavigationProps} from "../AppEntry";
import Credentials from "../utils/credentials";
import {AuthActions} from "../store/authSlice";
import {useAppDispatch} from "../store/storeHooks";





const OpeningPage: FC<NavigationProps> = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const dispatch = useAppDispatch();



    const onSubmit = async () => {

        setIsLoading(true)
        let user: User = {
            email: email,
            password: password

        }
        let result = await AuthModel.logIn(user.email, user.password);
        if (result) {

            console.log(`i just logged in`);
            console.log(result);
            setIsLoading(false);
            await Credentials.setCredentials(result);
            dispatch(AuthActions.setUserToken(result));
            dispatch(AuthActions.setIsLoggedIn(true));



        } else {
            setIsLoading(false)
            alert("No Such User")
        }
    }
    return (

        <ScrollView>
            <View>
                <TextInput style={styles.textInput}
                           onChangeText={setEmail}
                           placeholder="email"
                           keyboardType="default"></TextInput>
                <TextInput style={styles.textInput}
                           onChangeText={setPassword}
                           placeholder="password"
                           secureTextEntry={true}
                           keyboardType="default"></TextInput>
                <TouchableHighlight
                    onPress={onSubmit}
                    underlayColor={COLORS.clickBackground}
                    style={styles.button}>
                    <Text style={styles.button_text}>Sign In</Text>
                </TouchableHighlight>
                <View style={styles.activity_indicator}>
                    <ActivityIndicator visible={isLoading}></ActivityIndicator>
                </View>
            </View>
        </ScrollView>


    )
}
const styles = StyleSheet.create({
    conatiner: {
        marginTop: 10,
        flex: 1
    },
    image: {
        width: "100%",
        height: 250,
        resizeMode: "contain",
        padding: 10,
        marginBottom: 10
    },
    textInput: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderColor: 'grey'
    },
    button: {
        margin: 12,
        backgroundColor: 'grey',
        borderRadius: 5
    },
    button_text: {
        fontSize: 30,
        color: 'white',
        textAlign: "center",
        marginTop: 3,
        marginBottom: 3,
    },
    activity_indicator: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute"
    }

})

export default OpeningPage;