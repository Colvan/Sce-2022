import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from "react-native"
import StudnetModel, { User } from "../model/student_model"
import COLORS from "../constants/colors"
import ActivityIndicator from "./component/custom_activity_indicator"


const RegisterPage: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<String>("")
    const [password, setPassword] = useState<String>("")

    const onSubmit = async () => {
        setIsLoading(true)
        var user: User = {
            email: email,
            password: password
         
        }
        var register = await StudnetModel.register(user.email , user.password);
        return register;
    }


    return (
        <ScrollView>
        <View >
      
            <TextInput style={styles.textInput}
                onChangeText={setEmail}
                placeholder="email"
                keyboardType="default"></TextInput>
            <TextInput style={styles.textInput}
                onChangeText={setPassword}
                placeholder="password"
                keyboardType="default"></TextInput>
            <TouchableHighlight
                onPress={onSubmit}
                underlayColor={COLORS.clickBackground}
                style={styles.button}>
                <Text style={styles.button_text}>Register</Text>
            </TouchableHighlight>
            <TouchableHighlight
                underlayColor={COLORS.clickBackground}
                style={styles.button}>
                <Text style={styles.button_text}>Register Via Google</Text>
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
    activity_indicator:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",      
        position: "absolute"
    }
})

export default RegisterPage;