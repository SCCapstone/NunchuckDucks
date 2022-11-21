import { Text, View, StyleSheet } from "react-native";
import React from "react";
import BackButton from "../BackButton";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, style }) => {
  const containerStyles = { ...styles.container, ...style };
  const navigation = useNavigation();

  return (
    <View style={containerStyles}>
      <BackButton handlePress={navigation.goBack}></BackButton>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  text: {
    height: "100%",
    width: "100%",
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 20,
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: -1,
  },
});

export default Header;
