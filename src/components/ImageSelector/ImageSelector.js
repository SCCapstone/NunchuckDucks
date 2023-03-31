import { View, Image, TouchableOpacity, Text, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

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
    opacity: 0.7,
    position: "absolute",
    right: 0,
    bottom: 0,
    backgroundColor: "lightgrey",
    width: "100%",
    height: "25%",
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
export default function ImageSelector(props) {
  const image = props.image;
  const setImage = props.setImage;
  function chooseCameraOrUpload() {
    <Pressable onPress={closeModal} style={styles.transparentView} />;
  }
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
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
