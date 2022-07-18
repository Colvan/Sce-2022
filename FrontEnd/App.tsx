import React, { FC, useState,useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'
import 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack';

import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./screens/home_screen";
import AboutScreen from "./screens/about_screen";
import DetailsScreen from "./screens/details_screen";
import AddStudentScreen from "./screens/add_student_screen";
import logInScreen from "./screens/log_in_page";
import COLORS from "./constants/colors"
import registerScreen from "./screens/register_page";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const Stack = createStackNavigator();

const ToBarAddButton:FC<{onClick:()=>void}>=({onClick})=>{
    return(
        <TouchableHighlight onPress={()=>{onClick()}}
            underlayColor={COLORS.clickBackground}>
            <Ionicons name={"add-outline"} size={40} color={'gray'} />
        </TouchableHighlight>
    )
}

const HomeStackScreen: FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
    const openAddStudent = ()=>{
        navigation.navigate("AddStudent")
    }
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={HomeScreen} 
                options={{
                    headerRight: ()=><ToBarAddButton onClick={()=>openAddStudent()}></ToBarAddButton>
                }} />
            <HomeStack.Screen name="Details" component={DetailsScreen} />
            <HomeStack.Screen name="AddStudent" component={AddStudentScreen} />
        </HomeStack.Navigator>
    );
}

const App: FC = () => {
    return (
        // <NavigationContainer>
        //     <Tab.Navigator screenOptions={({ route }) => ({
        //         tabBarIcon: ({ focused, color, size }) => {
        //             let iconName;
        //             if (route.name === 'About') {
        //                 iconName = focused ? 'information-circle' : 'information-circle-outline';
        //             } else if (route.name === 'HomeStack') {
        //                 iconName = focused ? 'home' : 'home-outline';
        //             }
        //             return <Ionicons name={iconName} size={size} color={color} />;
        //         },
        //         tabBarActiveTintColor: 'tomato',
        //         tabBarInactiveTintColor: 'gray',
        //     })}>
        //         <Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false }}></Tab.Screen>
        //         <Tab.Screen name="About" component={AboutScreen}></Tab.Screen>
        //     </Tab.Navigator>
        // </NavigationContainer>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Log In Page" component={logInScreen} />
            </Stack.Navigator>
      </NavigationContainer>
    )
}



export default App