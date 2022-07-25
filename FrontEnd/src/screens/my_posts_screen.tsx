import React, { FC, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight } from "react-native"

import COLORS from "../constants/colors"
import StudentModel,{Post} from "../model/student_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import {NavigationProps} from "../AppEntry";
import DetailsScreen from "./details_screen";
import {createNativeStackNavigator} from "@react-navigation/native-stack";



type StudentListRowProps = {
    post: Post,
    onItemClick: (postId:String , id:String,message:String,imageURL:String) => void
}

const HomeStack = createNativeStackNavigator();


const StudentListRow: FC<StudentListRowProps> = ({ post, onItemClick }) => {
    return (
        <TouchableHighlight
            onPress={()=>{onItemClick(post.postId,post.id,post.message,post.imageUrl)}}
            underlayColor={COLORS.clickBackground}>
            <View style={styles.list_row_container}>
                { post.imageUrl != "" &&  <Image source={{uri: post.imageUrl.toString()}} style={styles.list_row_image}></Image>}
                { post.imageUrl == "" &&  <Image source={require("../../assets/avatar.jpeg")} style={styles.list_row_image}></Image>}
                <View style={styles.list_row_text_container}>
                    <Text style={styles.list_row_id}>{post.id}</Text>
                    <Text style={styles.list_row_name}>{post.message}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const MyPosts: FC<NavigationProps> = ({ navigation, route }) => {
    const [data, setData] = useState<Array<Post>>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const openDetails = (postId:String , id:String,message:String,imageURL:String)=>{
        console.log("on press " + postId + id + message + imageURL)
        navigation.navigate('Details', {postId: postId,id:id,message:message,imageURL:imageURL})
    }
 


    useEffect(()=>{
        navigation.addListener('focus',()=>{
            reloadData()
        })
    },[navigation])

    const reloadData = async ()=>{
        setIsLoading(true)
        //here will be dynamic array of users posts
        const studentData = await StudentModel.getPostsByUser("t2t@t.com")
        setData(studentData)
        setIsLoading(false)
    }



    return (
        <View style={styles.home_container}>
            <FlatList
                data={data}
                keyExtractor={item => item.postId.toString()}
                renderItem={({ item }) => (<StudentListRow post={item}
                            onItemClick={openDetails} />)}
            ></FlatList>
            <View style={styles.activity_indicator}>
                <ActivityIndicator visible={isLoading}></ActivityIndicator>
            </View>
        </View>
    )
}


const MyPostsNavigatorComponent: FC<StudentListRowProps> = () => {
    return (
            <HomeStack.Navigator initialRouteName="MyPosts">
            <HomeStack.Screen name="MyPosts" component={MyPosts}/>
            <HomeStack.Screen name="Details" component={DetailsScreen}/>
            </HomeStack.Navigator>
   
    )
}



const styles = StyleSheet.create({
    touchablebutton:{
        paddingLeft:"90%"
    },
    home_container: {
        flex: 1
    },
    list_row_container: {
        height: 150,
        // width: "100%",
        // backgroundColor: "grey",
        flexDirection: "row",
        elevation: 4,
        borderRadius: 3,
        marginLeft: 6,
        marginRight: 8
    },
    list_row_image: {
        height: 130,
        width: 100,
        margin: 10,
        borderRadius: 15
    },
    list_row_text_container: {
        justifyContent: "center"
    },
    list_row_name: {
        fontSize: 16,
        marginBottom: 10
    },
    list_row_id: {
        fontSize: 25
    },
    activity_indicator:{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute"
    }
})
export default MyPostsNavigatorComponent