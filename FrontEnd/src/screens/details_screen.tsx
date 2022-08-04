import React,{FC, useState} from "react"
import { View, Text, StyleSheet, TextInput, TouchableHighlight, ScrollView } from "react-native"
import {NavigationProps} from "../AppEntry";
import CustomImagePicker from "./component/custom_image_picker"
import ActivityIndicator from "./component/custom_activity_indicator"
import StudnetModel, { Post } from "../model/student_model"
import COLORS from "../constants/colors"
import store from "../store/store";


const Details: FC<NavigationProps> = ({ navigation, route }) => {
    const userToken = store.getState().auth.userToken

    const [postId, setpostId] = useState<String>("")
    const [sender, setId] = useState<String>("")
    const [message, setName] = useState<String>("")
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [imageUri,setImageUri] = useState<String>("")
    React.useEffect(()=>{
        if (route.params?.id){
            setId(route.params.id)
            setName(route.params.message)
            setImageUri(route.params.imageURL)
            setpostId(route.params.postId)
            
        }
    },[])
    

    const onImageSelected = (uri:String)=>{
        setImageUri(uri)
    }

    const onSave = async () => {
        console.log(postId);
        
        setIsLoading(true)
        var post: Post = {
            id: sender,
            message: message,
            imageUrl: imageUri,
            postId:postId
        }
        if(imageUri != ""){
            console.log("saving image")
            const url = await StudnetModel.uploadImage(imageUri)
            post.imageUrl = url
            console.log("saving image finish url : " + url) 
        }
        await StudnetModel.updatePost(postId,message,post.imageUrl,userToken!.access_token)
        setIsLoading(false)

        navigation.goBack()
    }


    const onDelete = async () => {
        setIsLoading(true)
        await StudnetModel.deletePost(postId,userToken!.access_token)
        navigation.goBack()
    }
    

    return (
        <ScrollView>
        <View style={styles.conatiner}>
            <View style={styles.image} >
                <CustomImagePicker onImageSelected={onImageSelected} imageurl={route.params.imageURL} ></CustomImagePicker>
            </View>
            <View >
            <Text style={{ height: 40,margin: 12, padding: 10, borderColor: 'grey'}}> sender : {sender}</Text>
            </View>
            <TextInput style={styles.textInput}
                onChangeText={setName}
                defaultValue={message.toString()}
                keyboardType="default"></TextInput>
            <TouchableHighlight
                onPress={onSave}
                underlayColor={COLORS.clickBackground}
                style={styles.button}>
                <Text style={styles.button_text}>Update</Text>
            </TouchableHighlight>
            <TouchableHighlight
                onPress={onDelete}
                underlayColor={COLORS.clickBackground}
                style={styles.button}>
                <Text style={styles.button_text}>Delete</Text>
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
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
        backgroundColor: "rgb(33, 150, 243)",
        left: 40,
        bottom:25
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
export default Details