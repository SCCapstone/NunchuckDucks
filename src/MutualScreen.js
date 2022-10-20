import { ScrollView, Text } from "react-native";
export function MutualScreen() {
  //const navigation = useNavigation();
  //const [posts, setPosts] = useState([]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ alignItems: "center", justifyContent: "center" }}
    >
      {/*posts.map((post) => (
          <Text>{post.Post}</Text>
        ))*/}
      {/*<Post />
        <Post />
        <Button
          title="Create Post"
          onPress={() => navigation.navigate("CreatePost")}
      />*/}
    </ScrollView>
  );
}
