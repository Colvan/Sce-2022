import React, { FC, useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import COLORS from "../constants/colors";
import StudentModel, { Post } from "../model/student_model";
import ActivityIndicator from "./component/custom_activity_indicator";
import { NavigationProps } from "../AppEntry";
import { AuthActions } from "../store/authSlice";

import Credentials from "../utils/credentials";
import { useAppDispatch } from "../store/storeHooks";
import store from "../store/store";

type StudentListRowProps = {
  post: Post;
};

const StudentListRow: FC<StudentListRowProps> = ({ post }) => {
  return (
    <TouchableHighlight underlayColor={COLORS.clickBackground}>
      <View style={styles.list_row_container}>
        {post.imageUrl != "" && (
          <Image
            source={{ uri: post.imageUrl.toString() }}
            style={styles.list_row_image}
          ></Image>
        )}
        {post.imageUrl == "" && (
          <Image
            source={require("../../assets/avatar.jpeg")}
            style={styles.list_row_image}
          ></Image>
        )}
        <View style={styles.list_row_text_container}>
          <Text style={styles.list_row_id}>{post.id}</Text>
          <Text style={styles.list_row_name}>{post.message}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const LogOutButton: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <TouchableHighlight
      style={styles.touchablebutton}
      onPress={() => {
        onClick();
      }}
      underlayColor={COLORS.clickBackground}
    >
      <Ionicons name={"log-out-outline"} size={40} color={"gray"} />
    </TouchableHighlight>
    
  );
};

const Home: FC<NavigationProps> = ({ navigation, route }) => {
  const [data, setData] = useState<Array<Post>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    navigation.addListener("focus", () => {
      reloadData();
    });
  }, [navigation]);

  const reloadData = async () => {
    setIsLoading(true);
    const studentData = await StudentModel.getAllPosts();
    setData(studentData);
    setIsLoading(false);
  };

  const logOut = async () => {
    await Credentials.setCredentials(null);
    dispatch(AuthActions.logOut());
  };

  return (
    <View style={styles.home_container}>
      <LogOutButton onClick={logOut}></LogOutButton>
      <FlatList
        data={data}
        keyExtractor={(item) => item.postId.toString()}
        renderItem={({ item }) => <StudentListRow post={item} />}
      ></FlatList>
      <View style={styles.activity_indicator}>
        <ActivityIndicator visible={isLoading}></ActivityIndicator>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  touchablebutton: {
    width: 40,
    left:370
  },
  home_container: {
    flex: 1,
  },
  list_row_container: {
    height: 150,
    flexDirection: "row",
    elevation: 4,
    borderRadius: 3,
    marginLeft: 6,
    marginRight: 8,
  },
  list_row_image: {
    height: 130,
    width: 100,
    margin: 10,
    borderRadius: 15,
  },
  list_row_text_container: {
    justifyContent: "center",
  },
  list_row_name: {
    fontSize: 16,
    marginBottom: 10,
  },
  list_row_id: {
    fontSize: 25,
  },
  activity_indicator: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});
export default Home;
