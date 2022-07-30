import React, {FC, useState} from "react"
import {View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView, TouchableOpacity} from "react-native"
import AuthModel, {User} from "../model/auth_model"
import COLORS from "../constants/colors"
import ActivityIndicator from "./component/custom_activity_indicator"
import {NavigationProps} from "../AppEntry";
import StudentModel from "../model/student_model"

const RegisterPage: FC<NavigationProps> = ({navigation, route}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onSubmit = async () => {
        setIsLoading(true)
        let user: User = {
            email: email,
            password: password

        }
        let register = await AuthModel.register(user.email, user.password);
        if (register) {
            await StudentModel.createUserProfile("","",user.email,"");
            setIsLoading(false)
            setEmail("");
            setPassword("")
            return register;
        } else {
            setIsLoading(false)
            alert("failed to register")
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
                    <Text style={styles.button_text}>Register</Text>
                </TouchableHighlight>
                <Text>Register Via Google</Text>
                <TouchableHighlight
                    style={styles.google_icon}>
                    <Image source={require('../../assets/google.png')}></Image>
                </TouchableHighlight>

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
    },
    google_icon: {
        justifyContent: "center",
        margin: 12,
        backgroundColor: 'transparent',
        textAlign: "center"

    }
})

export default RegisterPage;