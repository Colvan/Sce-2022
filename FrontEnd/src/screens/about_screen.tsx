import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from "react-native";

import COLORS from "../constants/colors";
import StudnetModel from "../model/student_model";
import ActivityIndicator from "./component/custom_activity_indicator";
import CustomImagePicker from "./component/custom_image_picker";
import { NavigationProps } from "../AppEntry";
import store from "../store/store";

const About: FC<NavigationProps> = ({ navigation, route }) => {
  const userToken = store.getState().auth.userToken;
  const [sender, setId] = useState<String>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUri, setImageUri] = useState<String>("");
  const [firstName, setfirstname] = useState<String>("");
  const [lastName, setlastname] = useState<String>("");

  const [profile, setProfile] = useState<any>("");

  const getUserData = async (email: String) => {
    const userProfile = StudnetModel.getUserProfile(email);
    return userProfile;
  };
  const waitForDataLoad = async () => {
    let p = await getUserData(userToken!.email);
    setProfile(p);
  };
  React.useEffect(() => {
    waitForDataLoad();
    setfirstname(profile.firstName)
    setlastname(profile.lastName)
  }, []);

  const onSave = async () => {
    setIsLoading(true);
    if (imageUri != "") {
      console.log("saving image");
      const url = await StudnetModel.uploadImage(imageUri);
      console.log("saving image finish url : " + url);
      await StudnetModel.updateUserProfile(firstName,lastName,userToken!.email,url)
    }
   
    setIsLoading(false);

    navigation.goBack();
  };

  const onImageSelected = (uri: String) => {
    console.log("onImageSelected " + uri);
    setImageUri(uri);
  };

  return (
    <ScrollView>
      <View style={styles.conatiner}>
        <View style={styles.image}>
          <CustomImagePicker
            onImageSelected={onImageSelected}
            imageurl={""}
          ></CustomImagePicker>
        </View>
        <Text
          style={{ height: 40, margin: 12, padding: 10, borderColor: "grey" }}
        >
          {" "}
          Email : {profile.email}
        </Text>
        <TextInput
          style={styles.textInput}
          onChangeText={setfirstname}
          placeholder="First Name"
          keyboardType="default"
        >{profile.firstName}</TextInput>
        <TextInput
          style={styles.textInput}
          onChangeText={setlastname}
          placeholder="Last Name"
          keyboardType="default"
        >{profile.lastName}</TextInput>
        <TouchableHighlight
          onPress={onSave}
          underlayColor={COLORS.clickBackground}
          style={styles.button}
        >
          <Text style={styles.button_text}>Save</Text>
        </TouchableHighlight>
        <View style={styles.activity_indicator}>
          <ActivityIndicator visible={isLoading}></ActivityIndicator>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    marginTop: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    padding: 10,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "grey",
  },
  button: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "rgb(33, 150, 243)",
    left: 40,
    bottom:25
  },
  button_text: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginTop: 3,
    marginBottom: 3,
  },
  activity_indicator: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
});

export default About;
