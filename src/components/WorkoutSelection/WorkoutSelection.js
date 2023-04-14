import { View, TouchableOpacity, StyleSheet, Text, ScrollView } from "react-native";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { getCurrentUser } from "../../crud/CacheOperations";
import { getWorkouts } from "../../crud/WorkoutOperations";
import { blueThemeColor } from "../../library/constants";

export default function WorkoutSelection({
  workoutSelection,
  setWorkoutSelection,
  refreshWorkout,
  setShowCreateWorkout,
  scrollToBottom,
  setScrollToBottom,
}) {
  const scrollviewRef = useRef();
  useEffect(() => {
    getWorkoutList();

    doStuff();
  }, [refreshWorkout]);
  const [workouts, setWorkouts] = useState([]);
  async function getWorkoutList() {
    let username = await getCurrentUser();
    let workouts = await getWorkouts(username);
    setWorkouts(workouts);
  }
  async function doStuff() {
    if (scrollToBottom === true) {
      //ScrollView.scrollToEnd
      //setWorkoutSelection(workouts[workouts.length - 1]);
      setWorkoutSelection(workouts[workouts.length - 1]);
      await scrollviewRef.current.scrollToEnd();
      setScrollToBottom(false);
    }
  }
  function handleWorkoutSelectionPress(workout) {
    setWorkoutSelection(workout);
  }
  function handleSelectedWorkoutPress() {
    setWorkoutSelection(null);
  }
  return (
    <View style={styles.workoutSelectionContainer}>
      <View style={styles.what}>
        <Text style={{ color: "white", fontSize: 14 }}>What workout did you do today?</Text>
      </View>
      <ScrollView ref={scrollviewRef} contentContainerStyle={styles.workoutMainContainer} style={{ width: "100%", flex: 1 }}>
        <TouchableOpacity id={-1} onPress={() => setShowCreateWorkout(true)} style={styles.workoutSelection}>
          <Text style={{ color: blueThemeColor, fontWeight: "bold" }}>Create new workout</Text>
        </TouchableOpacity>
        {workouts.map((workout, index) => {
          return (
            <View style={{ width: "100%" }} key={index}>
              {workout === workoutSelection ? (
                //console.log("THEY EQUAL EACH OTHER", workout);
                // This will console.log successfully after creating a new workout, but won't return this. Will figure out later.
                <TouchableOpacity onPress={() => handleSelectedWorkoutPress(workout)} style={styles.workoutSelectionHighlighted}>
                  <Text style={{ color: "#ffffff", fontWeight: "bold" }}>{workout.workoutName}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity id={index} onPress={() => handleWorkoutSelectionPress(workout)} style={styles.workoutSelection}>
                  <Text style={{ color: blueThemeColor, fontWeight: "bold" }}>{workout.workoutName}</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  workoutSelectionContainer: {
    borderWidth: 3,
    borderLeftWidth: 0,
    alignItems: "center",
    flex: 1,
  },
  workoutMainContainer: {
    alignItems: "center",

    width: "100%",
  },

  what: {
    backgroundColor: "#2E8CFF",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  workoutSelection: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
  },
  workoutSelectionHighlighted: {
    backgroundColor: blueThemeColor,
    //overlayColor: blueThemeColor,
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 3,
  },
});
