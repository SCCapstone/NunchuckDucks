import { useState } from "react";
import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import CustomButton from "../components/CustomButton";
import { blueThemeColor, grayThemeColor } from "../library/constants";
import CreateWorkoutModal from "../components/modals/CreateWorkoutModal";
export function WorkoutsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <CreateWorkoutModal modalVisible={modalVisible} setModalVisible={setModalVisible} />
      <View style={styles.stickyHeader}>
        <View style={{ height: "30%" }} />
        <CustomButton
          style={{ position: "relative" }}
          buttonType={"default"}
          text={"Create new workout"}
          onClick={() => setModalVisible(true)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    alignItems: "center",
  },
  stickyHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
  },
});
