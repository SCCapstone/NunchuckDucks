import { Camera, CameraType } from "expo-camera";
import { useState, useRef } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View, Pressable } from "react-native";
import CustomButton from "../CustomButton";

export default function CameraComponent({ setImage, setShowCamera }) {
  let cameraRef = useRef();
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.containerA}>
        <Text style={{ textAlign: "center" }}>GymBit needs your permission to use the camera</Text>
        <Button onPress={requestPermission} title="Grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  async function takePicture() {
    let options = {
      quality: 1,
      base64: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setImage(newPhoto);
    setShowCamera(false);
  }

  function closeModal() {
    setShowCamera(false);
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={closeModal} style={styles.transparentView} />
      <Camera style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <CustomButton text="Flip Camera" onClick={toggleCameraType} />
          <CustomButton text="Take Picture" onClick={takePicture} />
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "absolute",
    //height: "100%",
    //flex: 1,
    justifyContent: "center",
    zIndex: 100,
  },
  containerA: {
    //position: "absolute",
    //height: "100%",
    //flex: 1,
    justifyContent: "center",
    zIndex: 100,
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
    width: 400,
    height: 400,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
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
