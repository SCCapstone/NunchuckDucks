import { View, Image, TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import CameraComponent from "../CameraComponent/CameraComponent";
import { useState } from "react";

const styles = StyleSheet.create({
  container: {
    elevation: 2,
    flex: 1,
    width: 200,
    backgroundColor: "#efefef",
    position: "relative",
    borderWidth: 3,
    overflow: "hidden",
  },
  uploadBtnContainer: {
    //flex: 1,
    position: "absolute",
    flexDirection: "row",
    bottom: 0,
    //opacity: 0.7,
    //alignItems: "center",
    //paddingTop: 5,
    minHeight: 40,
    justifyContent: "center",
    //right: 0,
    //bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
  },
  uploadBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  transparentView: {
    flex: 1,
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    zIndex: -1,
  },
});
/**
 *
 * @param {*} props MUST USE A useState() [image,setImage] FOR THIS FUNCTION TO BE EFFECTIVE
 * @returns
 */
export default function ImageSelector({ image, setImage, setShowCamera }) {
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images /*Only allow image upload */,
      allowsEditing: true /*true= pull up an editing interface after image upload */,
      aspect: [1, 1] /*1:1 image ratio, so it will be a square */,
      quality: 1 /*highest quality image possible, on a scale of 0-1 we want 1 lol */,
    });
    setImage(_image.uri);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: "100%", aspectRatio: 1 }}>
        {image && <Image source={{ uri: image }} style={{ width: "100%", aspectRatio: 1 }} />}
      </View>
      <View style={styles.uploadBtnContainer}>
        <View style={{ flexDirection: "column", width: "50%", justifyContent: "center" }}>
          <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
            <AntDesign name="upload" size={20} color="black" />
            <Text style={{ fontSize: 12 }}>Upload</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column", width: "50%", justifyContent: "center" }}>
          <TouchableOpacity onPress={() => setShowCamera(true)} style={styles.uploadBtn}>
            <AntDesign name="camera" size={20} color="black" />
            <Text style={{ fontSize: 12 }}>Capture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
