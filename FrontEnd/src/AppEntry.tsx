import React, {FC, useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Button, Image, TouchableHighlight} from 'react-native'
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import HomeScreen from "./screens/home_screen";
import DetailsScreen from "./screens/details_screen";
import AddPostScreen from "./screens/add_new_post";
import logInScreen from "./screens/log_in_page";
import COLORS from "./constants/colors"
import registerScreen from "./screens/register_page";

import Credentials from "./utils/credentials";
import About from "./screens/about_screen";
import Chat from "./screens/chat_screen";
import MyPostsScreen from "./screens/my_posts_screen";
import {useAppDispatch, useAppSelector} from "./store/storeHooks";
import {AuthActions} from "./store/authSlice";
import store from "./store/store";



const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

const UpperTab = createMaterialTopTabNavigator();

export type NavigationProps = {
    navigation: any,
    route: any
}

const ToBarAddButton: FC<{ onClick: () => void }> = ({onClick}) => {
    return (
        <TouchableHighlight onPress={() => {
            onClick()
        }}
                            underlayColor={COLORS.clickBackground}>
            <Ionicons name={"add-outline"} size={40} color={'gray'}/>
        </TouchableHighlight>
    )
}

const AppEntry: FC= () => {

    const authSlice = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const userToken = await Credentials.getVerifiedTokens()
                if(userToken) {
                    dispatch(AuthActions.setUserToken(userToken));
                    dispatch(AuthActions.setIsLoggedIn(true));
                } else {
                    console.log("Need to log in");
                }
            } catch (e) {
                console.log('restoring token failed: ' + e);
            }
        }
        checkAuthentication();
    }, []);


    return (

        <NavigationContainer>

            {authSlice.isLoggedIn ? (
                <UpperTab.Navigator initialRouteName="Home">
                    <UpperTab.Screen name="Home" component={HomeScreen}/>
                    <UpperTab.Screen name="My Posts" component={MyPostsScreen}/>
                    <UpperTab.Screen name="Add New Post" component={AddPostScreen}/>
                    <UpperTab.Screen name="My Details" component={About}/>
                    <UpperTab.Screen name="Public Chat" component={Chat}/>

                </UpperTab.Navigator>
            ) : (
                <Tab.Navigator initialRouteName="About" screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        if (route.name === 'About') {
                            iconName = focused ? 'information-circle' : 'information-circle-outline';
                        } else if (route.name === 'HomeStack') {
                            iconName = focused ? 'home' : 'home-outline';
                        }
                        return <Ionicons name={iconName} size={size} color={color}/>;
                    },
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}>
                    <Tab.Screen name="Log In Page" component={logInScreen}></Tab.Screen>
                    <Tab.Screen name="Register" component={registerScreen}></Tab.Screen>
                </Tab.Navigator>
            )}

        </NavigationContainer>
    )
}


export default AppEntry;