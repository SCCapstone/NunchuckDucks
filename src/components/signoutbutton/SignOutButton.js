import { Text, Image, TouchableOpacity, View, Pressable, ImageBackground, ImageBackgroundComponent } from "react-native";
import { Auth, Amplify, DataStore } from "aws-amplify";
import { deleteAllCache } from "../../crud/CacheOperations";

const SignOutButton = () => {
  const signOut = async () => {
    try {
      await DataStore.clear();
      await Auth.signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  async function signOutOps() {
    await deleteAllCache();
    signOut();
  }

  return (
    <Pressable
      style={{
        backgroundColor: "#2e8cff",
        width: 100,
        height: 40,
        borderRadius: 30,
        justifyContent: "center",
      }}
      onPress={() => {
        signOutOps();
      }}
    >
      <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 18, color: "white" }}>Sign Out</Text>
    </Pressable>
  );
};

export default SignOutButton;
