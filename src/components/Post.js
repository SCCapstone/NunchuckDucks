import { View, Image, Text, StyleSheet } from "react-native";

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
    color: "#2E8CFF",
    fontWeight: "bold",
    fontSize: 28,
  },
});
export function Post(props) {
  const entry = props.entry;

  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <Text style={styles.postUsername}>{props.entry.username}</Text>
        <Image source={require("../../assets/icons/Applause_Icon.png")} />
      </View>
      <View
        name="Footer"
        style={{ height: "10%", width: "100%", justifyContent: "center" }}
      >
        <Text>Footer yayyy</Text>
      </View>
    </View>
  );
}
