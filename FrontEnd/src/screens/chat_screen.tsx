import React, { FC, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  TextInput,
} from "react-native";
import { NavigationProps } from "../AppEntry";
import io, { Socket } from "socket.io-client";
import store from "../store/store";
import COLORS from "../constants/colors";

type messageType = {
  message: string;
  time: string;
  from: string;
};

type MessageListRowProps = {
  message: messageType;
  currentUser: String;
};
const MessageListRow: FC<MessageListRowProps> = ({ message, currentUser }) => {
  return (
    <TouchableHighlight underlayColor={COLORS.clickBackground}>
      <View style={styles.list_row_container}>
        <View style={styles.list_row_text_container}>
          <Text style={styles.list_row_id}>
            {currentUser == message.from && (
              <Text style={styles.from_message_style}>{message.from}</Text>
            )}
            {currentUser != message.from && (
              <Text style={styles.list_row_name}>{message.from}</Text>
            )}
          </Text>
          <Text style={styles.list_row_name}>{message.message}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const Chat: FC<NavigationProps> = ({ navigation, route }) => {
  const [messages, setMessages] = useState<Array<messageType>>([]);
  const [DemoMessages, setDemoMessages] = useState<Array<messageType>>([]);

  const socketRef = useRef<Socket>();
  const userToken = store.getState().auth.userToken;
  const currentUser = userToken!.email;
  const date = new Date();

  var demoConversationArray = [
    { from: "omri biton", message: "hello im omri", time: "today" },
    { from: "ivan@test.com", message: "hello omri", time: "today" },
  ];

  useEffect(() => {
    setDemoMessages(demoConversationArray);
    socketRef.current = io("http://10.0.2.2:3000", {
      auth: {
        token: "bearer " + userToken!.access_token,
      },
    });
    socketRef.current?.on("connect", () => {
      console.log("client connected");
    });
    // socketRef.current?.on('message', (message) => {

    // });

    socketRef.current?.on("ims:message_to_all", (message: messageType) => {
      setMessages([...messages, message]);
      console.log(
        `got this message: ${message.message} on time: ${message.time}, from: ${message.from}`
      );
    });
    // socketRef.current?.emit("message",{message: "hello!", time: date.toLocaleTimeString(), from: userToken!.email})

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const onSendMessage = async () => {};

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Chat</Text>
      <FlatList
        data={DemoMessages}
        keyExtractor={(item) => item.message.toString()}
        renderItem={({ item }) => (
          <MessageListRow message={item} currentUser={currentUser} />
        )}
      ></FlatList>
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={styles.textInput}
          placeholder="Message"
          keyboardType="default"
        ></TextInput>
        <TouchableHighlight
          onPress={onSendMessage}
          underlayColor={COLORS.clickBackground}
          style={styles.button}
        >
          <Text style={styles.button_text}>Send</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "grey",
    width: "70%",
  },
  button: {
    margin: 12,
    backgroundColor: "grey",
    borderRadius: 5,
    width: "20%",
  },
  button_text: {
    fontSize: 30,
    color: "white",
    textAlign: "center",
    marginTop: 3,
    marginBottom: 3,
  },
  touchablebutton: {
    width: 40,
  },
  home_container: {
    flex: 1,
  },
  from_message_style: {
    backgroundColor: "grey",
    fontSize: 16,
    marginBottom: 10,
  },
  list_row_container: {
    height: 100,
    width: "100%",
    backgroundColor: "white",
    flexDirection: "row",
    elevation: 4,
    borderRadius: 3,
    marginLeft: 6,
    marginRight: 8,
  },
  list_row_text_container: {
    justifyContent: "center",
    width: "100%",
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

export default Chat;
