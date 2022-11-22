//This file will handle all of the button components of our app including a back button, react button, create post button, and more in the future
import React from "react";
import { TouchableOpacity, Image } from "react-native";

//Call BackButton on another file by importing BackButton from 'file_path/Buttons' and to call use <BackButton navigation={() => navigation.goBack()}/>
const BackButton = ({ handlePress }) => {
  return (
    <TouchableOpacity
      style={{
        width: 100,
        height: 100,
      }}
      onPress={handlePress}
    >
      <Image
        source={require("../../../assets/icons/Gymbit_Icons_Black/Back_Icon_Black.png")}
        resizeMode="cover"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </TouchableOpacity>
  );
};

export default BackButton;
