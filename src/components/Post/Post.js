import { View, Image, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Storage from "@aws-amplify/storage";
import Reactions from "../Reactions";
import { grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
const styles = StyleSheet.create({
  postBox: {
    height: 500,
    width: "100%",
    color: "green",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 20,
  },
  captionBox: {},
  postHeader: {
    height: "10%",
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: grayThemeColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
    backgroundColor: grayThemeColor,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
});
export default function Post(props) {
  const entry = props.entry;
  const refresh = props.refresh;
  const [picture, setPicture] = useState(null);
  const [pfp, setPfp] = useState("");

  async function getPic() {
    // TODO retrieve post picture from the passed entry fileName
    const pic = await Storage.get(entry.photo);
    setPicture(pic);
    try {
      const pfps3 = await Storage.get(entry.username + "/pfp.png");
      console.log(typeof pfps3);
      setPfp(pfps3);
    } catch (error) {
      console.log("Error retrieving pfp: " + error);
    }
  }
  // get the pic again after a refresh
  useEffect(() => {
    getPic();
  }, [refresh]);

  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <ProfileMini
          src={pfp}
          style={{ height: 42, width: 42, marginLeft: 6, marginRight: 6 }}
          imageStyle={{ height: 42, width: 42 }}
        />
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
