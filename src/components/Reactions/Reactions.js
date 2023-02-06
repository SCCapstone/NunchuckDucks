import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { getCurrentAuthenticatedUser } from "../../library/GetAuthenticatedUser";
import {
  createReaction,
  getReactions,
  getUserReactions,
  removeReaction,
} from "../../crud/ReactionOperations";
import { ReactionType } from "../../models/index";

export default function Reactions({
  postID,
  commentsClicked,
  setCommentsClicked,
}) {
  const [applauseClicked, setApplauseClicked] = useState(false);
  const [strongClicked, setStrongClicked] = useState(false);
  const [numApplause, setNumApplause] = useState(0);
  const [numStrong, setNumStrong] = useState(0);

  async function setup() {
    const username = await getCurrentAuthenticatedUser();
    const userReactionClap = await getUserReactions(postID, username, "CLAP");
    const userReactionFlex = await getUserReactions(postID, username, "FLEX");
    if (userReactionClap.length > 0) setApplauseClicked(true);
    if (userReactionFlex.length > 0) setStrongClicked(true);
    const reactions = await getReactions(postID);
    setNumApplause(
      reactions.filter((val) => val.reactionType === "CLAP").length
    );
    setNumStrong(reactions.filter((val) => val.reactionType === "FLEX").length);
  }

  async function newReaction(reactionType) {
    const username = await getCurrentAuthenticatedUser();
    createReaction(username, reactionType, postID);
  }

  async function deleteReaction(reactionType) {
    const username = await getCurrentAuthenticatedUser();
    removeReaction(username, reactionType, postID);
  }

  useEffect(() => {
    setup();
  }, []);

  return (
    <View flexDirection="row">
      <View style={styles.column}>
        <Pressable
          onPress={() => {
            if (applauseClicked) {
              deleteReaction("CLAP");
            } else {
              newReaction("CLAP");
            }
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
        <Text style={styles.reactionTotals}>{numApplause}</Text>
      </View>

      <View style={styles.column}>
        <Pressable
          onPress={() => {
            if (strongClicked) {
              deleteReaction("FLEX");
            } else {
              newReaction("FLEX");
            }
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
        <Text style={styles.reactionTotals}>{numStrong}</Text>
      </View>
      <View style={styles.column}>
        <Pressable
          onPress={() => {
            setCommentsClicked(!commentsClicked);
          }}
        >
          <Image
            style={styles.reaction}
            source={
              commentsClicked
                ? require("../../../assets/icons/Gymbit_Icons_Trans/Comment_Icon_Trans.png")
                : require("../../../assets/icons/Gymbit_Icons_Black/Comment_Icon_Black.png")
            }
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reaction: {
    width: 48,
    height: 48,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  reactionTotals: {
    textAlign: "center",
  },
});
