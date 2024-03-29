import React, { FC, useState,useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

import * as ImagePicker from 'expo-image-picker';
import colors from "../../constants/colors";

type CustomImagePickerProps = {
    onImageSelected:(uri:String)=>void;
    imageurl:String;
}

const CustomImagePicker:FC<CustomImagePickerProps> = ({onImageSelected,imageurl})=>{
    const [imageUri,setImageUri] = useState<String | null>("")
    React.useEffect(()=>{
        if (imageurl != ""){
            setImageUri(imageurl)
        }
    },[])

    useEffect(()=>{
        requestPermission()
    },[])

    const requestPermission = async ()=>{
        const res = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!res.granted){
            alert("please give camera permission")
        }
    }

    const openCamera = async ()=>{
        try{
            const res = await ImagePicker.launchCameraAsync()
            if(!res.cancelled){
                setImageUri(res.uri)
                console.log("image = " + res.uri)
                onImageSelected(res.uri)
            }
        }catch (error){
            console.log("camera failed " + error)
        }
    }
    const openGallery = async ()=>{
        try{
            const res = await ImagePicker.launchImageLibraryAsync()
            if(!res.cancelled){
                setImageUri(res.uri)
                console.log("image = " + res.uri)
                onImageSelected(res.uri)
            }
        }catch (error){
            console.log("camera failed " + error)
        }
    }

    return (
        <View>
            { imageUri != "" && <Image style={styles.image_picker_image} source={{uri:imageUri}}></Image>}
            { imageUri == "" && <Image style={styles.image_picker_image} source={require("../../../assets/add-image-icon.png")}></Image>}
            
            <TouchableHighlight underlayColor={colors.clickBackground} onPress={openCamera} style={styles.image_picker_camera_btn}>
                <Ionicons name={"camera"} size={50} color={colors.button_icon} />
            </TouchableHighlight>
            <TouchableHighlight underlayColor={colors.clickBackground} onPress={openGallery} style={styles.image_picker_gallery_btn}>
                <Ionicons name={"images"} size={40} color={colors.button_icon} />
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    image_picker_image:{
        width: "100%",
        height: 250,
        resizeMode: "contain",
        padding: 10,
    },
    image_picker_camera_btn:{
        position: "absolute",
        bottom: -5,
        left: 10
    },
    image_picker_gallery_btn: {
        position: "absolute",
        bottom: -5,
        right: 10
    }
})


export default CustomImagePicker