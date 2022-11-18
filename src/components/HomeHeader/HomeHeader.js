/**
* This file will create a header to go on top of the home pages (Explore and Mutual), and allows the user to click on the bell to take them to the notification page and the gear to take
* them to the settings page
*/

import { Text, Image, View, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { blueThemeColor } from "../../library/constants"

const HomeHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.notiButton} onPress={() => {navigation.navigate("Goals")}}>
        <Image style={styles.notification}
        source={require("../../../assets/icons/Gymbit_Icons_Trans/Alert_Icon_Trans.png")}
        />
      </TouchableOpacity>

      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../../../assets/icons/Gymbit_Icons_Trans/Logo_Trans.png")} />
      </View>
      
      <TouchableOpacity style={styles.settingsButton} onPress={() => {navigation.navigate('Settings')}}>
        <Image style={styles.settings} source={require("../../../assets/icons/Gymbit_Icons_Trans/Settings_Icon_Trans.png")} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    paddingTop: 30,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row'
  },

  notiButton: {
    width: 50,
    height: 50,
    paddingLeft: 10
  },
  
  notification: {
    width: 50,
    height: 50
  },

  logoContainer: {
    width: 100,
    height: 50,
    left: 75
  },

  logo : {
    width: 100,
    height: 100,
    aspectRatio: 1
  },

  settingsButton: {
    width: 50,
    height: 50,
    left: 150
  },

  settings: {
    width: 50,
    height: 50
  }
})

export default HomeHeader;
