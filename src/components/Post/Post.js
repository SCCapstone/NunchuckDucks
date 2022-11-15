import { View, Image, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Storage from "@aws-amplify/storage";
const styles = StyleSheet.create({
  postBox: {
    height: 500,
    width: "100%",
    color: "green",
    borderWidth: 2,
    marginBottom: 20,
  },
  postHeader: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  postUsername: {
    /* #3C8DD9 */
    color: "#2E8CFF",
    fontWeight: "bold",
    fontSize: 28,
  },
});
export default function Post(props) {
  const entry = props.entry;
  const [picture, setPicture] = useState(null);

  async function getPic() {
    await Storage.get("pfp.png", {});
  }
  useEffect(() => {
    getPic();
  }, []);
  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <Text style={styles.postUsername}>{props.entry.username}</Text>
      </View>
      <Image source={{ uri: picture }} />
      <View
        name="Footer"
        style={{ height: "10%", width: "100%", justifyContent: "center" }}
      >
        <Image
          style={{ height: 40, width: 40 }}
          source={require("../../../assets/icons/Gymbit_Icons_Black/Applause_Icon_Black.png")}
        ></Image>
      </View>
    </View>
  );
}
