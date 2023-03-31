import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Camera, CameraType } from "expo-camera";

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
    flexDirection: "row",
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
});
/**
 *
 * @param {*} props MUST USE A useState() [image,setImage] FOR THIS FUNCTION TO BE EFFECTIVE
 * @returns
 */
export default function ImageSelector(props) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  const image = props.image;
  const setImage = props.setImage;
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images /*Only allow image upload */,
      allowsEditing: true /*true= pull up an editing interface after image upload */,
      aspect: [1, 1] /*1:1 image ratio, so it will be a square */,
      quality: 1 /*highest quality image possible, on a scale of 0-1 we want 1 lol */,
    });
    setImage(_image.uri);
  };
  async function takePicture() {}
  return (
    <View style={styles.container}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <View style={styles.uploadBtnContainer}>
        <View style={{ flexDirection: "column", width: "50%" }}>
          <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
            <AntDesign name="camera" size={20} color="black" />
            <Text>{image ? "Edit" : "Upload"} Image</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "column" }}>
          <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
            <AntDesign name="upload" size={20} color="black" />
            <Text>Take a picture</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
