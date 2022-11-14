import { View, Text, StyleSheet, SafeAreaView} from "react-native";
import { blueThemeColor, grayThemeColor } from "../../library/constants";

const GoalSummary = () => {
    return (
        
        <SafeAreaView style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "white",
            justifyContent: "center",
          }}
          >
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Text style = {styles.title}>Your Goals</Text>
                </View>
                <Text style = {styles.goaltext}>Goal 1: Go to the bathroom andlllll be allowed.</Text>
                <Text style = {styles.goaltext}>Goal 2: Lose 28 pounds by December 31st in 2022.</Text>
                <Text style = {styles.goaltext}>Goal 3: Lose 28 pounds by December 31st in 2022.</Text>
            </View>
        </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: "80%",
      backgroundColor: "white",
      borderColor: blueThemeColor,
      borderWidth: 3,
      padding: 0, // inside border before content
      minHeight: 175,
      borderRadius: 10,
      flexDirection: "column",
    },
    container2:
    {  
        width: "100%",
        backgroundColor: grayThemeColor,
        paddingTop: 4,
        height: 35,
        borderTopRightRadius:7,//curves top right
        borderTopLeftRadius: 7,//curves top left
        alignContent: "center",
    },
    goaltext: {
      textAlign: "center",
      paddingLeft:17,
      paddingRight:21,
      textAlignVertical: "auto",
      width: "100%",
      fontSize: 19,
    },
    title: {
        textAlign: "center",
        textAlignVertical: "center",
        width: "100%", //this changes length of line/ box the text exits on
        fontSize: 22,
        color: blueThemeColor,
        fontWeight: "bold",
    },
  });


export default GoalSummary;
