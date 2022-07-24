import React,{FC, useState} from "react"
import {View, Text} from "react-native"
import {NavigationProps} from "../AppEntry";


const Details: FC<NavigationProps> = ({ navigation, route }) => {
    const [postId, setId] = useState<String>("")
    React.useEffect(()=>{
        if (route.params?.postId){
            setId(route.params.postId)
        }
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details: {postId}</Text>
        </View>
    )
}

export default Details