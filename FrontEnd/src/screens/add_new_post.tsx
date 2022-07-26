import React, { FC, useState } from "react"
import { View, Text, StyleSheet, Image, TextInput, TouchableHighlight, ScrollView } from "react-native"

import COLORS from "../constants/colors"
import StudnetModel, { Post } from "../model/student_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import CustomImagePicker from "./component/custom_image_picker"
import {NavigationProps} from "../AppEntry";


const AddPost: FC<NavigationProps> = ({ navigation, route }) => {
    var [sender,setId] = useState<String>("")
    var [message, setMessage] = useState<String>("")
    var [isLoading, setIsLoading] = useState<boolean>(false)
    var [imageUri,setImageUri] = useState<String>("")
    var [userID,setUserId] = useState<String>("")
    var [token,setUserToken] = useState<String>("")

    
    const onSave = async () => {
        sender ="ivan@test.com"
        userID = "62e017c74a1c86866135664e"
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MmUwMTdjNzRhMWM4Njg2NjEzNTY2NGUiLCJpYXQiOjE2NTg4NTM5MjEsImV4cCI6MTY1ODg1NDIyMX0.aOd0kka35w9uxAlFWV85aSfz5gqWyZ6deV8qEvx1MyU"
        setIsLoading(true)
        var student: Post = {
            id: sender,
            message: message,
            imageUrl: imageUri,
            //neeed to get user id here
            postId:userID
        }
        if(imageUri != ""){
            console.log("saving image")
            const url = await StudnetModel.uploadImage(imageUri)
            student.imageUrl = url
            console.log("saving image finish url : " + url) 
        }
        await StudnetModel.addNewPost(student,token)
        setIsLoading(false)
        navigation.goBack()
    }

    const onImageSelected = (uri:String)=>{
        console.log("onImageSelected " + uri)
        setImageUri(uri)
    }

    return (
        <ScrollView>
            <View style={styles.conatiner}>
                <View style={styles.image} >
                    <CustomImagePicker onImageSelected={onImageSelected}></CustomImagePicker>
                </View>
                <Text style={{ height: 40,margin: 12, padding: 10, borderColor: 'grey'}}> Email : {sender}</Text>

                <TextInput style={styles.textInput}
                    onChangeText={setMessage}
                    placeholder="Message"
                    keyboardType="default"></TextInput>
                <TouchableHighlight
                    onPress={onSave}
                    underlayColor={COLORS.clickBackground}
                    style={styles.button}>
                    <Text style={styles.button_text}>Save</Text>
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

export default AddPost