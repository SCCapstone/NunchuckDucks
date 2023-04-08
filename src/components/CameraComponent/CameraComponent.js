import { Camera, CameraType } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import CustomButton from "../CustomButton";
import { AntDesign } from "@expo/vector-icons";
import { blueThemeColor } from "../../library/constants";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";

export default function CameraComponent({ setImage, setShowCamera }) {
  let cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [pictureSize, setPictureSize] = useState("1088x1088");

  /*useEffect(() => {
    setPicSize();
  }, []);

  //This was my attempt to make a function that would set the
  async function setPicSize() {
    let sizes = await cameraRef.current.getAvailablePictureSizesAsync("1:1");
    let chosenSize = sizes[0];
    console.log("Yay", chosenSize);
    setPictureSize(chosenSize);
  }*/

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    requestPermission();
    return (
      <View /*style={styles.containerA}*/>
        {/*<Text style={{ textAlign: "center" }}>GymBit needs your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />*/}
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    let options = {
      ImageType: "png",
      quality: 1,
      //base64: true,
      //exif: false,
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setImage(newPhoto.uri);
    setShowCamera(false);
  }

  function closeModal() {
    setShowCamera(false);
  }
  if (permission.granted) {
    return (
      <View style={styles.container}>
        <Pressable onPress={closeModal} style={styles.transparentView} />
        <Camera style={styles.camera} type={type} ref={cameraRef} ImageType="png">
          <View style={styles.buttonContainer}>
            <Pressable style={styles.iconA} onPress={toggleCameraType}>
              <AntDesign name="retweet" size={40} color="#FFFFFF" />
            </Pressable>
            <Pressable style={styles.iconB} onPress={takePicture}>
              <AntDesign name="camera" size={40} color="#FFFFFF" />
            </Pressable>
            {/*<CustomButton text="Flip Camera" onClick={toggleCameraType} />
          <CustomButton text="Take Picture" onClick={takePicture} />*/}
          </View>
        </Camera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  iconA: {
    //left: "5%",
    marginRight: 20,
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: blueThemeColor,
    borderRadius: 100,
  },
  iconB: {
    //right: "5%",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: blueThemeColor,
    borderRadius: 100,
  },
  container: {
    alignItems: "center",
    position: "absolute",
    height: "90%",
    width: "100%",
    //flex: 1,
    justifyContent: "center",
    zIndex: 100,
  },
  containerA: {
    position: "absolute",
    width: "100%",
    //height: "100%",
    //flex: 1,
    bottom: "20%",
    justifyContent: "center",
  },
  transparentView: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    //zIndex: 99,
  },
  camera: {
    //flex: 1,
    width: "100%",
    //height: 500,
    aspectRatio: 3 / 4,
  },
  buttonContainer: {
    flex: 1,
    //width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    bottom: "0%",
    backgroundColor: "transparent",
    //margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
