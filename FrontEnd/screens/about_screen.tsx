import React,{FC} from "react"
import {View, Text} from "react-native"
import {NavigationProps} from "../App";


const About: FC<NavigationProps> = ({ navigation, route }) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>About</Text>
        </View>
    )
}

export default About