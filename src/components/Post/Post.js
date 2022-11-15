import { View, Image, Text } from "react-native";
export default function Post() {
  return (
    <View style={{}}>
      <View
        name="Header"
        style={{
          height: "10%",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        flexDirection="row"
      >
        <Image
          style={{ height: "80%", width: "100%" }}
          /* source={require("./pictures/weeknd.jpeg")}
           * Taken from Nathan's research milestone, this is meant to
           * show a picture of the weeknd in a square, wrapped with the
           * header and footer of this post function */
        />
        <Text>Header yayyy</Text>
      </View>
      {/* This is the same thing as the obove Image
      <Image
        style={{ height: "80%", width: "100%" }}
        source={require("./pictures/weeknd.jpeg")}
      />
    */}
      <View
        name="Footer"
        style={{ height: "10%", width: "100%", justifyContent: "center" }}
      >
        <Text>Footer yayyy</Text>
      </View>
    </View>
  );
}
