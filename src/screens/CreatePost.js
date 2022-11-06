import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Text,
  Touchable,
} from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useState } from "react";
import { Post } from "../models";
import { AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

const styles = StyleSheet.create({
  header: {
    height: "10%",
  },
  input: {
    height: 150,
    width: 250,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submit: {
    height: 40,
    backgroundColor: "#2E8CFF",
    color: "#GG1342",
    width: 150,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
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
  submitText: {
    color: "white",
    fontSize: 18,
  },
  workoutSelectionContainer: {
    borderWidth: 3,
    borderLeftWidth: 0,
    alignItems: "center",
    flex: 1,
  },
  what: {
    backgroundColor: "#2E8CFF",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  workoutSelection: {
    flex: 1,
    width: "100%",
  },
});

export function CreatePost() {
  const [text, setText] = useState("");
  const [workoutSelection, setWorkoutSelection] = useState([]);
  const [image, setImage] = useState(null);
  var savePost = async () => {
    await DataStore.save(
      new Post({
        caption: text,
      })
    );
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header} />
      <View style={{ flexDirection: "row", flex: 1 }}>
        <UploadImage image={image} setImage={setImage} />
        <WorkoutSelection
          workoutSelection={workoutSelection}
          setWorkoutSelection={setWorkoutSelection}
        />
      </View>
      <View style={{ alignItems: "center", flex: 2 }}>
        <TextInput
          style={styles.input}
          placeholder="Write your caption here"
          value={text}
          onChangeText={setText}
        />
        <Text>{workoutSelection}</Text>
        <TouchableOpacity style={styles.submit} onPress={savePost}>
          <Text style={styles.submitText}>Post Gymbit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function WorkoutSelection(props) {
  const workoutSelection = props.workoutSelection;
  const setWorkoutSelection = props.setWorkoutSelection;
  const updateFunction = (text) => {
    setWorkoutSelection([...workoutSelection, text]);
  };
  return (
    <View style={styles.workoutSelectionContainer}>
      <View style={styles.what}>
        <Text style={{ color: "white", fontSize: 14 }}>
          What did you do today?
        </Text>
      </View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <TouchableOpacity
          onPress={(event) => updateFunction("Run")}
          style={styles.workoutSelection}
        >
          <Text>Run</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(event) => updateFunction("Leg Day")}
          style={styles.workoutSelection}
        >
          <Text>Leg Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(event) => updateFunction("Back and Biceps")}
          style={styles.workoutSelection}
        >
          <Text>Back and Biceps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(event) => updateFunction("Chest and Triceps")}
          style={styles.workoutSelection}
        >
          <Text>Chest and Triceps</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={(event) => updateFunction("Bike")}
          style={styles.workoutSelection}
        >
          <Text>Bike</Text>
        </TouchableOpacity>
        <Text>{workoutSelection}</Text>
      </View>
    </View>
  );
}

function UploadImage(props) {
  const image = props.image;
  const setImage = props.setImage;
  const addImage = async () => {
    let _image = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:
        ImagePicker.MediaTypeOptions.Images /*Only allow image upload */,
      allowsEditing: true /*true= pull up an editing interface after image upload */,
      aspect: [1, 1] /*1:1 image ratio, so it will be a square */,
      quality: 1 /*highest quality image possible, on a scale of 0-1 we want 1 lol */,
    });
    setImage(_image.uri);
  };
  return (
    <View style={styles.container}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <View style={styles.uploadBtnContainer}>
        <TouchableOpacity onPress={addImage} style={styles.uploadBtn}>
          <Text>{image ? "Edit" : "Upload"} Image</Text>
          <AntDesign name="camera" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
