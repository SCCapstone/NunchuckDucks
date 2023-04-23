import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useEffect, useState } from "react";
import {
  createReaction,
  getUserReactions,
  removeReaction,
} from "../../crud/ReactionOperations";
import { getCurrentUser } from "../../crud/CacheOperations";
import { getAndObserveReactions } from "../../crud/observeQueries/ReactionsObserveQueries";
import { getReactions } from "../../crud/ReactionOperations";

export default function Reactions({
  postID,
  commentsClicked,
  setCommentsClicked,
}) {
  const [applauseClicked, setApplauseClicked] = useState(false);
  const [strongClicked, setStrongClicked] = useState(false);
  const [retrieveReactions, setRetrieveReactions] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [numApplause, setNumApplause] = useState(0);
  const [numStrong, setNumStrong] = useState(0);

  async function updateReactionCount() {
    const reactions = await getReactions(postID);
    if (!reactions) {
      console.error("Failed to retrieve reactions: ", reactions);
      return;
    }
    setReactions(reactions);
  }

  async function setup() {
    const username = await getCurrentUser();
    const userReactionClap = await getUserReactions(postID, username, "CLAP");
    const userReactionFlex = await getUserReactions(postID, username, "FLEX");
    if (userReactionClap.length > 0) setApplauseClicked(true);
    if (userReactionFlex.length > 0) setStrongClicked(true);
    await updateReactionCount();
  }

  async function newReaction(reactionType) {
    const username = await getCurrentUser();
    createReaction(username, reactionType, postID);
  }

  async function deleteReaction(reactionType) {
    const username = await getCurrentUser();
    removeReaction(username, reactionType, postID);
  }

  useEffect(() => {
    const createReactionsObserver = async () => {
      const subscription = getAndObserveReactions(postID, setRetrieveReactions);
      return subscription;
    };
    setup();
    const subscription = createReactionsObserver();
    return () => {
      if (subscription && subscription.unsubscribe) subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    updateReactionCount().catch((err) => console.error(err));
    return () => {};
  }, [retrieveReactions]);

  useEffect(() => {
    setNumApplause(
      reactions.filter((val) => val.reactionType === "CLAP").length
    );
    setNumStrong(reactions.filter((val) => val.reactionType === "FLEX").length);
  }, [reactions]);

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
