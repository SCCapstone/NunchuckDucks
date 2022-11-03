//This file will handle all of the button components of our app including a back button, react button, create post button, and more in the future
import React from 'react';
import {TouchableOpacity, Text, Image, View} from 'react-native';


export const BackButton = ({handlePress}) => {
    return (
        <TouchableOpacity
            style = {{
                backgroundColor: 'green',
                width: 100,
                height: 100
            }}
            onPress = {handlePress}
            >
                <View style={{width: 50, height: 50}}>
                    <Image 
                        source = {'../../assets/icons/Back_Icon.png'}
                        resizeMode='cover'
                        style = {{
                            width: '100%',
                            height: '100%'
                        }}
                    />
                </View>
            </TouchableOpacity>
    );
};