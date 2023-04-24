import { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import CustomButton from "../components/CustomButton";
import CreateWorkoutModal from "../components/modals/CreateWorkoutModal";
import { getWorkouts } from "../crud/WorkoutOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import WorkoutMini from "../components/WorkoutMini/WorkoutMini";
import Header from "../components/Header";
import { getAndObserveWorkouts } from "../crud/observeQueries/WorkoutObserveQueries";

export function WorkoutsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [workouts, setWorkouts] = useState([]);
  const [refreshWorkouts, setRefreshWorkouts] = useState(false);
  const [retrieveWorkouts, setRetrieveWorkouts] = useState(0);
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
    const createWorkoutsObserver = async () => {
      const currUsername = await getCurrentUser();
      const sub = await getAndObserveWorkouts(
        currUsername,
        setRetrieveWorkouts
      );
      return sub;
    };

    const subscription = createWorkoutsObserver();
    return () => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    getWorkoutsForScreen();
  }, [refreshWorkouts, retrieveWorkouts]);
  return (
    <>
      <View testID="Workout_Screen_Header">
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
          testID="Create_Workout_Modal"
        />
        <View
          style={styles.stickyHeader}
          testID="Workout_Screen.Create_New_Workout_Button"
        >
          <CustomButton
            style={{ position: "relative" }}
            buttonType={"default"}
            text={"Create new workout"}
            onClick={() => {
              openCreateWorkoutModal();
            }}
            testID="Workout_Screen.Create_New_Workout_Button"
          />
        </View>
        <ScrollView
          style={{ width: "100%" }}
          contentContainerStyle={{ paddingBottom: 125 }}
        >
          {workouts.length !== 0 ? (
            workouts.map((workout) => (
              <WorkoutMini
                key={workout.id}
                workout={workout}
                refreshWorkouts={refreshWorkouts}
                setRefreshWorkouts={setRefreshWorkouts}
                openCreateWorkoutModal={openCreateWorkoutModal}
              />
            ))
          ) : (
            <Text style={{ fontSize: 18, padding: 10, alignSelf: "center" }}>
              No workouts created
            </Text>
          )}
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
