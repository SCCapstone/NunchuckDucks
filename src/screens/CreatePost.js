import { View, TextInput, StyleSheet, TouchableOpacity, Text } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useState } from "react";
import { Post } from "../models";
import { Storage } from "@aws-amplify/storage";
import ImageSelector from "../components/ImageSelector";
import { Auth } from "aws-amplify";
import { useNavigation } from "@react-navigation/native";
import getPictureFileName from "../library/getPictureFileName";
import { createPost } from "../crud/PostOperations";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { getCurrentUser } from "../crud/CacheOperations";

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
  const [text, setText] = useState(""); // the caption you write
  const [workoutSelection, setWorkoutSelection] = useState([]); // array of workouts you selected
  const [image, setImage] = useState(null);
  const navigation = useNavigation();
  //const [username, setUsername] = useState("usernameNotFound");
  Storage.configure(); // protected = you can write and read your posts, others can only read

  const showPostUploadedToast = () => {
    Toast.show({
      type: "success",
      text1: "Successfully uploaded your new post!",
      text2: "Go check it out on your mutuals page 🔥",
      position: "bottom",
      visibilityTime: 6000,
    });
  };
  const showPostNotUploadedToast = (usr) => {
    // username; pass username as prop to all shits?
    if (usr === "") {
      usr = "friend";
    }
    Toast.show({
      type: "error",
      text1: "Uh oh, there was trouble uploading your post...",
      text2: "Try again later. Sorry, " + usr + " 😔",
      position: "bottom",
      visibilityTime: 6000,
    });
  };
  async function savePost() {
    //await DataStore.start();
    let username = await getCurrentUser();
    try {
      // try catch just in case sending the image doesn't work
      //const { attributes } = await getCurrentUser();
      var fileName = username + "/" + getPictureFileName();
      const response = await fetch(image);
      const blob = await response.blob();
      await createPost(text, fileName, username);
      await Storage.put(fileName, blob);
      showPostUploadedToast();
    } catch (error) {
      showPostNotUploadedToast(username);
      console.error("Error uploading file", error);
      // TODO make a UI popup thing that lets the user know that their post wasn't uploaded (please try again later)
    }
    navigation.navigate("Mutuals");
  }
  return (
    <>
      <View style={{ flex: 1 }}>
        <View style={styles.header} />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <ImageSelector image={image} setImage={setImage} />
          <WorkoutSelection workoutSelection={workoutSelection} setWorkoutSelection={setWorkoutSelection} />
        </View>
        <View style={{ alignItems: "center", flex: 2 }}>
          <TextInput style={styles.input} placeholder="Write your caption here" value={text} onChangeText={setText} />
          <Text>{workoutSelection.join(", ")}</Text>
          <TouchableOpacity style={styles.submit} onPress={savePost}>
            <Text style={styles.submitText}>Post Gymbit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

function WorkoutSelection(props) {
  const workoutSelection = props.workoutSelection;
  const setWorkoutSelection = props.setWorkoutSelection;
  const updateFunction = (text) => {
    setWorkoutSelection([...new Set([...workoutSelection, text])]);
  };
  return (
    <View style={styles.workoutSelectionContainer}>
      <View style={styles.what}>
        <Text style={{ color: "white", fontSize: 14 }}>What did you do today?</Text>
      </View>
      <View style={{ alignItems: "center", flex: 1 }}>
        <TouchableOpacity onPress={(event) => updateFunction("Run")} style={styles.workoutSelection}>
          <Text>Run</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(event) => updateFunction("Leg Day")} style={styles.workoutSelection}>
          <Text>Leg Day</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(event) => updateFunction("Back and Biceps")} style={styles.workoutSelection}>
          <Text>Back and Biceps</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(event) => updateFunction("Chest and Triceps")} style={styles.workoutSelection}>
          <Text>Chest and Triceps</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={(event) => updateFunction("Bike")} style={styles.workoutSelection}>
          <Text>Bike</Text>
        </TouchableOpacity>
        <Text>{workoutSelection.join(", ")}</Text>
      </View>
    </View>
  );
}
