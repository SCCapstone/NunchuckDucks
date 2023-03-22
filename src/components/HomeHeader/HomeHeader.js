import {
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
  Touchable,
  Text,
  TextInput,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Storage } from "@aws-amplify/storage";
import { Auth } from "aws-amplify";
import { createGoal } from "../../crud/GoalOperations";
import { getDate } from "../../library/getDate";
import getPictureFileName from "../../library/getPictureFileName";
import { createPost } from "../../crud/PostOperations";
import ImageSelector from "../../components/ImageSelector";
import { DataStore } from "@aws-amplify/datastore";

/**
 * Creates the header that will go above the two home screens (Mutual and Explore)
 */
const HomeHeader = ({ handlePress }) => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = useState(false);
  const [blowup, setBlowup] = useState(false);
  const [text, setText] = useState(""); // the caption you write
  const [workoutSelection, setWorkoutSelection] = useState([]); // array of workouts you selected
  const [image, setImage] = useState(null);

  Storage.configure();

  const handleBlowUp = () => {
    setBlowup(!blowup);
  }

  async function savePost() {
    await DataStore.start();
    try {
      // try catch just in case sending the image doesn't work
      const { attributes } = await Auth.currentAuthenticatedUser();
      let username = attributes.preferred_username;
      var fileName = username + "/" + getPictureFileName();
      const response = await fetch(image);
      const blob = await response.blob();
      await createPost(text, fileName, username);
      Storage.put(fileName, blob);
    } catch {
      console.error("Error uploading file");
      // TODO make a UI popup thing that lets the user know that their post wasn't uploaded (please try again later)
    }
    handleBlowUp();
  }

  return (
    <><View style={styles.container}>
      <TouchableOpacity
        style={styles.notiButton}
        onPress={() => {
          navigation.navigate("Notifications");
        }}
      >
        <Image
          style={styles.notification}
          source={require("../../../assets/icons/Gymbit_Icons_Black/Alert_Icon_Black.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoContainer} onPress={handlePress}>
        <Image
          style={styles.logo}
          source={require("../../../assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={handleBlowUp}
      >
        <Image
          style={styles.settings}
          source={require("../../../assets/icons/Gymbit_Icons_Black/Create_Post_Icon_Black.png")}
        />
      </TouchableOpacity>
    </View>
    <View> 
    {blowup ?
    <View style={styles.blowup}>
      <View style={{ flex: 1 }}>
      <View style={styles.header} />
      <View style={{ flexDirection: "row", flex: 1 }}>
        <ImageSelector image={image} setImage={setImage} />
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
        <Text>{workoutSelection.join(", ")}</Text>
        <TouchableOpacity style={styles.submit} onPress={savePost}>
          <Text style={styles.submitText}>Post Gymbit</Text>
        </TouchableOpacity>
      </View>
    </View>
    </View>:<Text></Text>}
  </View></>
  );
};

function WorkoutSelection(props) {
  const workoutSelection = props.workoutSelection;
  const setWorkoutSelection = props.setWorkoutSelection;
  const updateFunction = (text) => {
    setWorkoutSelection([...new Set([...workoutSelection, text])]);
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
        <Text>{workoutSelection.join(", ")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    paddingTop: 30,
    backgroundColor: "white",
    flexDirection: "row",
  },

  notiButton: {
    width: 50,
    height: 50,
    flex: 1,
    paddingLeft: 15,
  },

  notification: {
    width: 50,
    height: 50,
  },

  logoContainer: {
    alignItems: "center",
    width: 100,
    height: 50,
    flex: 1,
  },

  logo: {
    width: 100,
    height: 100,
    aspectRatio: 1,
  },

  settingsButton: {
    width: 50,
    height: 50,
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 15,
  },

  settings: {
    width: 50,
    height: 50,
  },

  blowup: {
    width:"100%",
    height: "75%",
    right:0,
    bottom:0,
    backgroundColor: 'rgba(200,212,225,0.75)',
    borderRightWidth:0,
    borderLeftWidth:0,
    borderWidth: 2,
    borderTopWidth:3,
    borderRightColor:"black",
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

export default HomeHeader;
