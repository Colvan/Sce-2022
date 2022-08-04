import React, { FC, useEffect } from "react";
import {
  TouchableHighlight,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "./screens/home_screen";
import DetailsScreen from "./screens/details_screen";
import AddPostScreen from "./screens/add_new_post";
import logInScreen from "./screens/log_in_page";
import COLORS from "./constants/colors";
import registerScreen from "./screens/register_page";

import Credentials from "./utils/credentials";
import About from "./screens/about_screen";
import Chat from "./screens/chat_screen";
import MyPostsScreen from "./screens/my_posts_screen";
import { useAppDispatch, useAppSelector } from "./store/storeHooks";
import { AuthActions } from "./store/authSlice";

const Tab = createBottomTabNavigator();
const UpperTab = createMaterialTopTabNavigator();

export type NavigationProps = {
  navigation: any;
  route: any;
};

const AppEntry: FC = () => {
  const authSlice = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const userToken = await Credentials.getVerifiedTokens();
        if (userToken) {
          dispatch(AuthActions.setUserToken(userToken));
          dispatch(AuthActions.setIsLoggedIn(true));
        } else {
          console.log("Need to log in");
        }
      } catch (e) {
        console.log("restoring token failed: " + e);
      }
    };
    checkAuthentication();
  }, []);

  return (
    <NavigationContainer>
      {authSlice.isLoggedIn ? (
        <UpperTab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarIndicatorStyle: {
              backgroundColor: "white",
              height: 2,
            },
            tabBarScrollEnabled: true,
            tabBarLabelStyle: { fontSize: 13 },
            tabBarItemStyle: { width: 80 },
            tabBarStyle: {
              height: 60,
              backgroundColor: "#1f436b",
            },
          }}
        >
          <UpperTab.Screen name="Home" component={HomeScreen} />
          <UpperTab.Screen name="My Posts" component={MyPostsScreen} />
          <UpperTab.Screen name="New Post" component={AddPostScreen} />
          <UpperTab.Screen name="My Details" component={About} />
          <UpperTab.Screen name="Public Chat" component={Chat} />
        </UpperTab.Navigator>
      ) : (
        <Tab.Navigator
          initialRouteName="Log In Page"
          screenOptions={({ route }) => ({
            tabBarIcon: ({  color, size }) => {
              return <Ionicons name="person" size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              height: 60,
              backgroundColor: "#1f436b",
            },
            
            tabBarScrollEnabled: true,
            tabBarLabelStyle: { fontSize: 13 },
            tabBarItemStyle: { width: 80 },
          }
          )}
        >
          <Tab.Screen options={{headerStyle:{backgroundColor:"#1f436b" } ,headerTintColor: 'tomato'}} name="Sign In" component={logInScreen}></Tab.Screen>
          <Tab.Screen options={{headerStyle:{backgroundColor:"#1f436b" } ,headerTintColor: 'tomato'}} name="Register" component={registerScreen}></Tab.Screen>
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppEntry;
