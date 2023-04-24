import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";
import BackButton from "../BackButton";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title, style,}) => {
  const containerStyles = { ...styles.container, ...style };
  const navigation = useNavigation();

  return (
    <View style={containerStyles}>
    
      <TouchableOpacity style={styles.logoContainer} onPress={() => {navigation.navigate("Mutuals");}}>
          <Image
            style={styles.logo}
            source={require("../../../assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")}
          />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 125,
    flexDirection: "row",
    display: "flex",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    width: 100,
    height: 50,
    flex: 1,
  },
  logo: {
    width: 100,
    height: 110,
    aspectRatio: 1,
  },
});

export default Header;
