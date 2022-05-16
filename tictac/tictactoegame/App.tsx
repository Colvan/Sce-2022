import React from "react";
import {StyleSheet,View,StatusBar} from "react-native";
import XmixDrix from "./app/screens/x_mix_drix"

export default function App() {
  console.log("App started");
  const handler = () => {
    console.log("text click");
  };
  return (
    <View style={styles.container}>
      <XmixDrix></XmixDrix>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    alignContent: "center"
  },
});
