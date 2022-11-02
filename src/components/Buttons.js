//This file will handle all of the button components of our app including a back button, react button, create post button, and more in the future
import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';
import assets from '../constants';
import { useNavigation } from "@react-navigation/native";


export const BackButton = ({handlePress}) => {
    return (
        <TouchableOpacity
            style = {{
                backgroundColor: 'green',
                height: 100,
                width: 100
            }}
            onPress = {handlePress}
            >
                <Image 
                    source = {'../../assets/images/backArrow.jpg'}
                    style= {{
                        width: 100,
                        height: 100,
                        flex: 1
                    }}
                    resizeMode = {'cover'}
                />
            </TouchableOpacity>
    );
};