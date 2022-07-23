import React, { FC, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet, FlatList, TouchableHighlight } from "react-native"

import COLORS from "../constants/colors"
import StudentModel,{Post} from "../model/student_model"
import ActivityIndicator from "./component/custom_activity_indicator"
import {NavigationProps} from "../App";

type StudentListRowProps = {
    post: Post,
    onItemClick: (id: String) => void
}

const StudentListRow: FC<StudentListRowProps> = ({ post, onItemClick }) => {
    return (
        <TouchableHighlight
            onPress={()=>{onItemClick(post.id)}}
            underlayColor={COLORS.clickBackground}>
            <View style={styles.list_row_container}>
                { post.imageUrl != "" &&  <Image source={{uri: post.imageUrl.toString()}} style={styles.list_row_image}></Image>}
                { post.imageUrl == "" &&  <Image source={require("../assets/avatar.jpeg")} style={styles.list_row_image}></Image>}
                <View style={styles.list_row_text_container}>
                    <Text style={styles.list_row_id}>{post.id}</Text>
                    <Text style={styles.list_row_name}>{post.message}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}


const Home: FC<NavigationProps> = ({ navigation, route }) => {
    const [data, setData] = useState<Array<Post>>()
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const openDetails = (id:String)=>{
        console.log("on press " + id)
        navigation.navigate('Details', {id: id})
    }

    useEffect(()=>{
        navigation.addListener('focus',()=>{
            reloadData()
        })
    },[navigation])

    const reloadData = async ()=>{
        setIsLoading(true)
        const studentData = await StudentModel.getAllPosts()
        setData(studentData)
        setIsLoading(false)
    }

    return (
        <View style={styles.home_container}>
            <FlatList
                data={data}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (<StudentListRow post={item}
                            onItemClick={openDetails} />)}
            ></FlatList>
            <View style={styles.activity_indicator}>
                <ActivityIndicator visible={isLoading}></ActivityIndicator>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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
export default Home