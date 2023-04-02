import { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import CreateWorkoutModal from "../components/modals/CreateWorkoutModal";
import { getWorkouts } from "../crud/WorkoutOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import Workout from "../components/Workout/Workout";
import Header from "../components/Header";

export function WorkoutsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [refreshWorkouts, setRefreshWorkouts] = useState(false);

  async function getWorkoutsForScreen() {
    let currUser = await getCurrentUser();
    let ejercicios = await getWorkouts(currUser);
    setWorkouts(ejercicios);
  }
  useEffect(() => {
    getWorkoutsForScreen();
  }, [refreshWorkouts]);
  return (
    <>
      <View>
        <Header title={"Profile"} style={{ backgroundColor: "white" }} />
      </View>
      <View style={styles.container}>
        <CreateWorkoutModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          refreshWorkouts={refreshWorkouts}
          setRefreshWorkouts={setRefreshWorkouts}
        />
        <View style={styles.stickyHeader}>
          <CustomButton
            style={{ position: "relative" }}
            buttonType={"default"}
            text={"Create new workout"}
            onClick={() => setModalVisible(true)}
          />
        </View>
        <ScrollView style={{ width: "100%" }}>
          {workouts.map((workout, index) => (
            <Workout key={index} workout={workout} />
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
  },
  stickyHeader: {
    width: "100%",
    marginBottom: "5%",
    //marginTop: "20%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
  },
});
