import React, {FC, useEffect, useRef, useState} from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    TextInput,
} from "react-native";
import {AutoScrollFlatList} from "react-native-autoscroll-flatlist";
import {NavigationProps} from "../AppEntry";
import io, {Socket} from "socket.io-client";
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
const MessageListRow: FC<MessageListRowProps> = ({message, currentUser}) => {
    return (
        <TouchableHighlight underlayColor={COLORS.clickBackground}>
            <View style={styles.list_row_container}>
                <View
                    style={[(currentUser === message.from) ? styles.self_list_row_text_container : styles.other_list_row_text_container]}>
                    <Text style={styles.list_row_id}>
                        <Text style={styles.list_row_name}>Sender: {currentUser=== message.from ? 'Me' : message.from }</Text>
                    </Text>
                    <Text style={styles.list_row_message}>{message.message}</Text>
                    <Text style={styles.list_row_message}>{message.time}</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
};

let messageInput: string;

const Chat: FC<NavigationProps> = ({navigation, route}) => {
    const [messages, setMessages] = useState<Array<messageType>>([]);
    // const [messageInput, setMessageInput] = useState<string>()

    const socketRef = useRef<Socket>();
    const userToken = store.getState().auth.userToken;
    const currentUser = userToken!.email;
    const date = new Date();



    useEffect(() => {
        socketRef.current = io("http://10.0.2.2:3000", {
            auth: {
                token: "bearer " + userToken!.access_token,
            },
        });
        socketRef.current?.on("connect", () => {
            console.log("client connected");
        });

        socketRef.current?.on("ims:message_to_all", (message: messageType) => {
            setMessages(oldMessages => [...oldMessages, message]);
            console.log(
                `got this message: ${message.message} on time: ${message.time}, from: ${message.from}`
            );
        });

        return () => {
            socketRef.current?.disconnect();
        };
    }, []);


    const onSendMessage = () => {
        if (!messageInput)
            return;
        socketRef.current?.emit('message', {
            message: messageInput,
            time: date.toLocaleTimeString(),
            from: userToken!.email
        })
    };


    return (
        <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
            <Text>Chat</Text>
            <AutoScrollFlatList
                data={messages}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                    <MessageListRow message={item} currentUser={currentUser}/>
                )}
            ></AutoScrollFlatList>
            <View style={{flexDirection: "row"}}>
                <TextInput
                    style={styles.textInput}
                    placeholder="Message"
                    keyboardType="default"
                    onChangeText={text => messageInput = text}
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
        backgroundColor: "green",
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
    self_list_row_text_container: {
        justifyContent: "center",
        width: "100%",
        backgroundColor: '#255C4B',
    },
    other_list_row_text_container: {
        justifyContent: "center",
        width: "100%",
        backgroundColor: 'grey'
    },
    list_row_name: {
        fontSize: 16,
        marginBottom: 10,
    },
    list_row_id: {
        fontSize: 25,
        top:-15
    },
    list_row_message: {
        color: 'white',
        top:-15
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
