import { View, Image, Text, StyleSheet, Pressable } from "react-native";
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
  reaction: {
    width: 48,
    height: 48,
  },
});
export default function Post(props) {
  const entry = props.entry;
  const refresh = props.refresh;
  const [picture, setPicture] = useState(null);

  async function getPic() {
    // TODO retrieve post picture from the passed entry fileName
    const pic = await Storage.get(entry.photo, { level: "protected" });
    setPicture(pic);
  }
  useEffect(() => {
    getPic();
  }, [refresh]);
  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <Text style={styles.postUsername}>{props.entry.username}</Text>
      </View>
      <Image source={{ uri: picture }} style={{ flex: 1 }} />
      <View
        name="Footer"
        flexDirection="row"
        style={{
          height: "10%",
          width: "100%",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Reactions />
        <Text>{entry.caption}</Text>
      </View>
    </View>
  );
}

function Reactions() {
  const [applauseClicked, setApplauseClicked] = useState(false);
  const [strongClicked, setStrongClicked] = useState(false);
  return (
    <View flexDirection="row">
      <Pressable
        onPress={() => {
          setApplauseClicked(!applauseClicked);
        }}
      >
        <Image
          style={styles.reaction}
          source={
            applauseClicked
              ? require("../../../assets/icons/Gymbit_Icons_Trans/Applause_Icon_Trans.png")
              : require("../../../assets/icons/Gymbit_Icons_Black/Applause_Icon_Black.png")
          }
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setStrongClicked(!strongClicked);
        }}
      >
        <Image
          style={styles.reaction}
          source={
            strongClicked
              ? require("../../../assets/icons/Gymbit_Icons_Trans/Strong_Icon_Trans.png")
              : require("../../../assets/icons/Gymbit_Icons_Black/Strong_Icon_Black.png")
          }
        />
      </Pressable>
    </View>
  );
}
