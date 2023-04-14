import { View, Text, StyleSheet } from "react-native";
import { blueThemeColor } from "../../library/constants";
export default function Exercise(exercise, index) {
  const name = exercise.exercise.exerciseName;
  const notes = exercise.exercise.exerciseNotes;
  return (
    <View style={styles.exerciseContainer} id={index}>
      <View style={styles.exerciseNameContainer}>
        <Text style={styles.exerciseName}>{name}</Text>
      </View>
      <View>
        <Text style={styles.exerciseNotes}>{notes}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  exerciseName: {
    fontSize: 20,
    // fontWeight: "bold",
    marginTop: 2,
    marginLeft: 10,
  },
  exerciseContainer: {
    flexDirection: "column",
    width: "90%",
  },
  exerciseNotes: {
    marginLeft: 20,
  },
});
