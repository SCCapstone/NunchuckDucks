import { View, StyleSheet, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header/Header";
import CustomButton from "../components/CustomButton/CustomButton";
import GoalMini from "../components/GoalMini/GoalMini";

export function GoalsScreen() {
  const nav = useNavigation();
  return (
    <View>
      <Header title={"Goals"} />

      <View style={styles.container}>
        <CustomButton
          text = "Create Goal"
          onClick = {() => nav.navigate("CreateGoal")}
          style = {styles.button}
        />
      </View>
      <ScrollView
        contentContainerStyle={styles.list}
      >

      </ScrollView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  },
  button: {
    margin: 20
  },
  lst: {
    alignItems: "center",
    display: "flex",
    backgroundColor: "white",
  },
})
