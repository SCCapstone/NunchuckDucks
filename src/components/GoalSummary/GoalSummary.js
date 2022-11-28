import { View, Text, StyleSheet} from "react-native";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import React from "react";


const GoalSummary = ({goal}) => {
    return (
            <View style={styles.container}>
                <View style={styles.title}>
                  <Text style= {styles.title}>Your Goals</Text>
                </View>

                <View style = {styles.goaltextcontainer}>
                  <Text style = {styles.goaltitle}>Goal 1: </Text>
                  <Text style = {styles.goaltext}>@{goal}This is a placeholder</Text>
                </View>

                <View style = {styles.goaltextcontainer}>
                  <Text style = {styles.goaltitle}>Goal 2: </Text>
                  <Text style = {styles.goaltext}>@{goal}This is a placeholder to show expansion and overflow with text </Text>
                </View>
                
                <View style = {styles.goaltextcontainer}>
                  <Text style = {styles.goaltitle}>Goal 3: </Text>
                  <Text style = {styles.goaltext}>@{goal}This is a placeholder to easily visualize the box</Text>
                </View>
            </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      width: 310,
      backgroundColor: "white",
      borderColor: blueThemeColor,
      borderWidth: 4.5,
      minHeight: "auto",
      borderRadius: 10,
      flexDirection: "column",
    },
    goaltext: {
      fontSize: 19,
      maxWidth: 229
    },
    goaltextcontainer: {
      paddingTop: 5,
      flexDirection:"row",
      textAlign: "left"
    },
    goaltitle:{
      fontSize:19,
      paddingLeft:5,
      fontWeight: "600"
    },
    title: {
        textAlign: "center",
        width: "auto", //this changes length of line/ box the text exits on
        fontSize: 22,
        paddingTop: 2,
        height: 33,
        borderTopRightRadius:7,//curves top right
        borderTopLeftRadius:7,//curves top left
        color: blueThemeColor,
        fontWeight: "bold",
        backgroundColor: grayThemeColor,
    },
  });

export default GoalSummary;