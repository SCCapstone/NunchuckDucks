import { View, Image, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Storage from "@aws-amplify/storage";
import Reactions from "../Reactions";
const styles = StyleSheet.create({
  postBox: {
    height: 500,
    width: "100%",
    color: "green",
    borderWidth: 2,
    marginBottom: 20,
  },
  captionBox: {},
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
  footer: {
    height: "10%",
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
export default function Post(props) {
  const entry = props.entry;
  const refresh = props.refresh;
  const [picture, setPicture] = useState(null);

  async function getPic() {
    // TODO retrieve post picture from the passed entry fileName
    const pic = await Storage.get(entry.photo);
    setPicture(pic);
  }
  // get the pic again after a refresh
  useEffect(() => {
    getPic();
  }, [refresh]);

  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <Text style={styles.postUsername}>{props.entry.username}</Text>
      </View>
      <Image source={{ uri: picture }} style={{ flex: 1 }} />
      {/*<View style={styles.captionBox} /> Need to implement caption box as intended*/}
      <View name="Footer" flexDirection="row" style={styles.footer}>
        <Reactions />
        <Text>{entry.caption}</Text>
      </View>
    </View>
  );
}
