import { View, Button, TextInput, StyleSheet } from "react-native";
import { DataStore } from "@aws-amplify/datastore";
import { useState } from "react";
import { Post } from "../models";

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  submit: {
    height: 40,
  },
});

export function CreatePost() {
  const [text, setText] = useState("");
  var savePost = async () => {
    await DataStore.save(
      new Post({
        caption: text,
      })
    );
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <TextInput
        style={styles.input}
        placeholder="write your post here"
        value={text}
        onChangeText={setText}
      />
      <Button title="Submit" style={styles.submit} onPress={savePost}>
        Submit
      </Button>
    </View>
  );
}
