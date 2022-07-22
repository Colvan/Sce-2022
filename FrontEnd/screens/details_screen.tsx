import React,{FC, useState} from "react"
import {View, Text} from "react-native"
import {NavigationProps} from "../App";


const Details: FC<NavigationProps> = ({ navigation, route }) => {
    const [id, setId] = useState<String>("")
    React.useEffect(()=>{
        if (route.params?.id){
            setId(route.params.id)
        }
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details: {id}</Text>
        </View>
    )
}

export default Details