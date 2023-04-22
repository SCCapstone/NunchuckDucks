import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PostList from "../components/PostList";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import { setLowerUsername } from "../crud/UserOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import { grayThemeColor } from "../library/constants";
import CustomButton from "../components/CustomButton";

export function MutualScreen(props) {
  //const [refresh, setRefresh] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [blowup, setBlowup] = useState(false);
  const refresh = props.refresh;
  const setRefresh = props.setRefresh;

  const nav = useNavigation();

  useEffect(() => {
    const focusHandler = nav.addListener("focus", () => {
      setRefresh(!refresh);
      //checkLowercaseUsername();
    });
  }, [refresh, nav]);

  // async function checkLowercaseUsername() {
  //   const username = await getCurrentUser();
  //   await setLowerUsername(username);
  // }
  return (
    <View
      testID="mutualScreen"
      style={{ height: "100%", backgroundColor: "white" /*,marginBottom:"22%" (i commented this out idk if it matters.*/ }}
    >
      <HomeHeader
        refresh={refresh}
        setRefresh={setRefresh}
        blowup={blowup}
        setBlowup={setBlowup}
        handlePress={() => setRefresh(!refresh)}
        testID="HomeHeader"
      />
      {isEmpty && (
        <View>
          <Text style={{ fontSize: 55, fontWeight: "700", color: "#808080", padding: 10 }}>
            Looks like your feed is empty. Fill it by posting a GymBit and following active friends!
          </Text>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#808080", padding: 10, alignSelf: "center" }}>
            Posts only last in your feed for 72 hours after posting. Fill the feed up by working out regularly, adding friends, and building
            an active GymBit community!
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <CustomButton style={{ width: "40%" }} text="Create a post" onClick={() => setBlowup(true)} />
            <View style={{ width: "5%" }} />
            <CustomButton style={{ width: "40%" }} text="Add a friend" onClick={() => nav.navigate("Followers")} />
          </View>
        </View>
      )}
      <PostList refresh={refresh} setRefresh={setRefresh} setIsEmpty={setIsEmpty} />
    </View>
  );
}
