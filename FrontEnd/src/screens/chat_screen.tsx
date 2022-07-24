import React,{FC} from "react"
import {View, Text} from "react-native"
import {NavigationProps} from "../AppEntry";


const Chat: FC<NavigationProps> = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Chat</Text>
        </View>
    )
}

export default Chat