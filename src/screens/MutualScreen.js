import { View, Text} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PostList from "../components/PostList";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import { setLowerUsername } from "../crud/UserOperations";
import { getCurrentUser } from "../crud/CacheOperations";

export function MutualScreen() {
  const [refresh, setRefresh] = useState(true);
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
    
      <View testID="mutualScreen" style={{ height:"100%", backgroundColor:"white"/*,marginBottom:"22%" (i commented this out idk if it matters.*/ }}>
        <HomeHeader handlePress={() => setRefresh(!refresh)} />
        <PostList refresh={refresh} setRefresh={setRefresh} />      
      </View>
    
  );
}
