import { Image, View, TouchableOpacity, StyleSheet, Touchable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

/**
 * Creates the header that will go above the two home screens (Mutual and Explore)
 */
const HomeHeader = ({handlePress}) => {
  const navigation = useNavigation();
  const [refresh, setRefresh] = React.useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.notiButton}
        onPress={() => {
          navigation.navigate("Goals");
        }}
      >
        <Image
          style={styles.notification}
          source={require("../../../assets/icons/Gymbit_Icons_Black/Alert_Icon_Black.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.logoContainer}
        onPress={handlePress}  
      >
        <Image
          style={styles.logo}
          source={require("../../../assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.settingsButton}
        onPress={() => {
          navigation.navigate("CreatePost");
        }}
      >
        <Image
          style={styles.settings}
          source={require("../../../assets/icons/Gymbit_Icons_Black/Create_Post_Icon_Black.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 100,
    paddingTop: 30,
    backgroundColor: "white",
    display: "flex",
    flexDirection: "row",
  },

  notiButton: {
    width: 50,
    height: 50,
    paddingLeft: 10,
  },

  notification: {
    width: 50,
    height: 50,
  },

  logoContainer: {
    width: 100,
    height: 50,
    left: 75,
  },

  logo: {
    width: 100,
    height: 100,
    aspectRatio: 1,
  },

  settingsButton: {
    width: 50,
    height: 50,
    left: 150,
  },

  settings: {
    width: 50,
    height: 50,
  },
});

export default HomeHeader;
