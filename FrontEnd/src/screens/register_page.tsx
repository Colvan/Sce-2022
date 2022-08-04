import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import AuthModel, { User } from "../model/auth_model";
import COLORS from "../constants/colors";
import { NavigationProps } from "../AppEntry";
import StudentModel from "../model/student_model";

const RegisterPage: FC<NavigationProps> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async () => {
    setIsLoading(true);
    let user: User = {
      email: email,
      password: password,
    };
    let register = await AuthModel.register(user.email, user.password);
    if (register) {
      await StudentModel.createUserProfile("", "", user.email, "");
      setIsLoading(false);
      setEmail("");
      setPassword("");
      return register;
    } else {
      setIsLoading(false);
      alert("failed to register");
    }
  };

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={require("../../assets/circle-logo-design-18-removebg-preview.png")}
      />

      <View>
        <TextInput
          style={styles.textInput}
          onChangeText={setEmail}
          placeholder="email"
          placeholderTextColor="#003f5c"
          keyboardType="default"
        ></TextInput>
        <TextInput
          style={styles.textInput}
          onChangeText={setPassword}
          placeholder="password"
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          keyboardType="default"
        ></TextInput>
        <TouchableHighlight
          onPress={onSubmit}
          underlayColor={COLORS.clickBackground}
          style={styles.loginBtn}
        >
          <Text style={styles.button_text}>Register</Text>
        </TouchableHighlight>
        <Text  style={{ textAlign: "center", top: 5 }}>Register Via Google</Text>
        <TouchableHighlight style={styles.google_icon}>
          <Image source={require("../../assets/google.png")}></Image>
        </TouchableHighlight>
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
    padding: 0,
    marginBottom: 0,
    bottom: 25,
  },
  textInput: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "grey",
    backgroundColor: "rgb(33, 150, 243)",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 0,
    flex: 1,
    marginLeft: 60,
    alignItems: "center",
    bottom: 25,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "rgb(33, 150, 243)",
    left: 40,
    bottom: 25,
  },
  button_text: {
    fontSize: 25,
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
  google_icon: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "transparent",
    left: 40,
    bottom:40,
  },
});

export default RegisterPage;
