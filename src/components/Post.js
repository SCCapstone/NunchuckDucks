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
});
export function Post(props) {
  const entry = props.entry;
  return (
    <View style={styles.postBox}>
      <Text>Heloooo</Text>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <Text>{props.entry.username}</Text>
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
