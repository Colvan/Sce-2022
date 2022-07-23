import React, { FC, useState,useRef, useEffect } from "react";
import { View, Text, StyleSheet, Button, Image, TouchableHighlight } from 'react-native'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "./screens/home_screen";
import AboutScreen from "./screens/about_screen";
import DetailsScreen from "./screens/details_screen";
import AddPostScreen from "./screens/add_new_post";
import logInScreen from "./screens/log_in_page";
import COLORS from "./constants/colors"
import registerScreen from "./screens/register_page";

const Tab = createBottomTabNavigator();

const HomeStack = createNativeStackNavigator();

export type NavigationProps = {
    navigation: any,
    route: any
}

const ToBarAddButton:FC<{onClick:()=>void}>=({onClick})=>{
    return(
        <TouchableHighlight onPress={()=>{onClick()}}
            underlayColor={COLORS.clickBackground}>
            <Ionicons name={"add-outline"} size={40} color={'gray'} />
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

const App: FC = () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <NavigationContainer>

            {isSignedIn ? (
            <HomeStack.Navigator initialRouteName="AddPost">
                <HomeStack.Screen name="Home" component={HomeScreen}
                                  options={{
                                      // headerRight: ()=><ToBarAddButton onClick={()=>openAddStudent()}></ToBarAddButton>
                                  }} />
                <HomeStack.Screen name="Details" component={DetailsScreen} />
                <HomeStack.Screen name="AddPost" component={AddPostScreen} />
            </HomeStack.Navigator>
                ) : (
            <Tab.Navigator  initialRouteName="About" screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'About') {
                        iconName = focused ? 'information-circle' : 'information-circle-outline';
                    } else if (route.name === 'HomeStack') {
                        iconName = focused ? 'home' : 'home-outline';
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
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
      //   <NavigationContainer>
      //       <Tab.Navigator>

      //       </Tab.Navigator>
      // </NavigationContainer>
    )
}



export default App