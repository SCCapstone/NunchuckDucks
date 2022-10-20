import { View, Button, TextInput } from "react-native";
export function CreatePost(props) {
  const [text, setText] = useState("");

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={styles.input}
        placeholder="write your post here"
        value={text}
        onChangeText={setText}
      />
      <Button title="Submit" style={styles.submit}>
        Submit
      </Button>
    </View>
  );
}
