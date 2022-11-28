import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useState } from "react";

const styles = StyleSheet.create({
  reaction: {
    width: 48,
    height: 48,
  },
});
export default function Reactions() {
  const [applauseClicked, setApplauseClicked] = useState(false);
  const [strongClicked, setStrongClicked] = useState(false);
  return (
    <View flexDirection="row">
      <Pressable
        onPress={() => {
          setApplauseClicked(!applauseClicked);
        }}
      >
        <Image
          style={styles.reaction}
          source={
            applauseClicked
              ? require("../../../assets/icons/Gymbit_Icons_Trans/Applause_Icon_Trans.png")
              : require("../../../assets/icons/Gymbit_Icons_Black/Applause_Icon_Black.png")
          }
        />
      </Pressable>
      <Pressable
        onPress={() => {
          setStrongClicked(!strongClicked);
        }}
      >
        <Image
          style={styles.reaction}
          source={
            strongClicked
              ? require("../../../assets/icons/Gymbit_Icons_Trans/Strong_Icon_Trans.png")
              : require("../../../assets/icons/Gymbit_Icons_Black/Strong_Icon_Black.png")
          }
        />
      </Pressable>
    </View>
  );
}
