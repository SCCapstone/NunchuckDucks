import { View, Button, Text } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PostList from "../components/PostList";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import SignOutButton from "../components/signoutbutton/SignOutButton";
import { DataStore } from "@aws-amplify/datastore";

export function MutualScreen(props) {
  //const [refresh, setRefresh] = useState(false);
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;

  const nav = useNavigation();
  useEffect(() => {
    /*const focusHandler = nav.addListener("focus", () => {
      setRefresh(!refresh);
    });*/
  }, [refresh, nav]);

  return (
    <View testID="mutualScreen" style={{ marginBottom: "22%" }}>
      <HomeHeader handlePress={() => setRefresh(!refresh)} />
      <PostList refresh={refresh} setRefresh={setRefresh} />
      <Text>Loading...</Text>
    </View>
  );
}
