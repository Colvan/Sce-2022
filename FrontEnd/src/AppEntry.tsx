import React, {FC, useState, useRef, useEffect} from "react";
import {View, Text, StyleSheet, Button, Image, TouchableHighlight} from 'react-native'
import {setIsLoggedIn} from "./store/authSlice";
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
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "./store";
import Credentials from "./utils/credentials";
import About from "./screens/about_screen";


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

// const HomeStackScreen: FC<NavigationProps> = ({ navigation, route }) => {
//     const openAddStudent = ()=>{
//         navigation.navigate("AddStudent")
//     }
//     return (
//
//     );
// }

const AppEntry: FC= () => {
    const {isLoggedIn} = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const {access_token, refresh_token} = await Credentials.getCredentials()
                dispatch(setIsLoggedIn(true));
            } catch (e) {
                console.log('restoring token failed');
            }
        }
        checkAuthentication();
    }, []);






    return (

        <NavigationContainer>

            {isLoggedIn ? (
                <UpperTab.Navigator initialRouteName="Home">
                    <UpperTab.Screen name="Home" component={HomeScreen}/>
                    <UpperTab.Screen name="AddPost" component={AddPostScreen}/>
                    <UpperTab.Screen name="MyDetails" component={About}/>
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
                    {/*<Tab.Screen name="HomeStack" component={HomeStackScreen} options={{ headerShown: false }}></Tab.Screen>*/}
                    {/*<Tab.Screen name="About" component={AboutScreen}></Tab.Screen>*/}
                </Tab.Navigator>
            )}

        </NavigationContainer>
    )
}


export default AppEntry;