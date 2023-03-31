import { View, Text} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import PostList from "../components/PostList";
import HomeHeader from "../components/HomeHeader/HomeHeader";

export function MutualScreen() {
  const [refresh, setRefresh] = useState(true);
  const nav = useNavigation();
  useEffect(() => {
    const focusHandler = nav.addListener("focus", () => {
      setRefresh(!refresh);
    });
  }, [refresh, nav]);
  return (
    
      <View testID="mutualScreen" style={{ height:"100%", backgroundColor:"white"/*,marginBottom:"22%" (i commented this out idk if it matters.*/ }}>
        <HomeHeader handlePress={() => setRefresh(!refresh)} />
        <PostList refresh={refresh} setRefresh={setRefresh} />      
      </View>
    
  );
}
