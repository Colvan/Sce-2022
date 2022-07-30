import React, {FC, useEffect, useRef, useState} from "react"
import {View, Text} from "react-native"
import {NavigationProps} from "../AppEntry";
import io, {Socket} from 'socket.io-client';
import store from "../store/store";

type messageType = {
    message: string,
    time: string,
    from: string
}

const Chat: FC<NavigationProps> = ({navigation, route}) => {
    const [messages, setMessages] = useState<Array<messageType>>([]);
    const socketRef = useRef<Socket>();
    const userToken = store.getState().auth.userToken
    const date = new Date()

    useEffect(() => {
        socketRef.current = io('http://10.0.2.2:3000', {
            auth: {
                token: 'bearer ' + userToken!.access_token
            }
        });
        socketRef.current?.on('connect', () => {
            console.log("client connected");
        })
        // socketRef.current?.on('message', (message) => {

        // });

        socketRef.current?.on("ims:message_to_all", (message: messageType)  => {
            setMessages([...messages, message]);
            console.log(`got this message: ${message.message} on time: ${message.time}, from: ${message.from}`)
        })
        // socketRef.current?.emit("message",{message: "hello!", time: date.toLocaleTimeString(), from: userToken!.email})


        return () => {
            socketRef.current?.disconnect();
        }
    }, [])



    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Chat</Text>
        </View>
    )
}

export default Chat