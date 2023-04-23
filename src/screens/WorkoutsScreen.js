import { useEffect, useState } from "react";
import {View,StyleSheet,ScrollView} from "react-native";
import CustomButton from "../components/CustomButton";
import CreateWorkoutModal from "../components/modals/CreateWorkoutModal";
import { getWorkouts } from "../crud/WorkoutOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import WorkoutMini from "../components/WorkoutMini/WorkoutMini";
import Header from "../components/Header";

export function WorkoutsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [refreshWorkouts, setRefreshWorkouts] = useState(false);
  const [workoutForModal, setWorkoutForModal] = useState(null);
  const [exercisesForModal, setExercisesForModal] = useState(null);

  const openCreateWorkoutModal = (workout, exercises) => {
    if (!workout) {
      setModalVisible(true);
      return;
    }
    setWorkoutForModal(workout);
    setExercisesForModal(exercises);
    setModalVisible(true);
  };

  async function getWorkoutsForScreen() {
    let currUser = await getCurrentUser();
    let ejercicios = await getWorkouts(currUser);
    if (!ejercicios || !Array.isArray(ejercicios)) return;
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
          workout={workoutForModal}
          setWorkout={setWorkoutForModal}
          modelExerciseList={exercisesForModal}
          setModelExerciseList={setExercisesForModal}
        />
        <View style={styles.stickyHeader}>
          <CustomButton
            style={{ position: "relative" }}
            buttonType={"default"}
            text={"Create new workout"}
            onClick={() => {
              openCreateWorkoutModal();
            }}
          />
        </View>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 125 }}
        >
          {workouts.map((workout) => (
            <WorkoutMini
              key={workout.id}
              workout={workout}
              refreshWorkouts={refreshWorkouts}
              setRefreshWorkouts={setRefreshWorkouts}
              openCreateWorkoutModal={openCreateWorkoutModal}
            />
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
  },
});
