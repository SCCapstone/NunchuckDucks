import { TouchableOpacity, Text, Image, View } from "react-native";
import React from 'react';
import { Header } from "react-native/Libraries/NewAppScreen";

const HomeHeader = ({handlePress}) => {
    return (
        <View style={{
            width: '100%',
            height: 75,
            backgroundColor: "grey",
            marginTop: 30,
            flex: 0
        }}>
            <Image
                source={require('../../assets/icons/Alert_Icon.png')}
                style={{
                    width: 75,
                    height: 75,
                    resizeMode: 'cover'
                }} />
        </View>
    );
}

export default HomeHeader;