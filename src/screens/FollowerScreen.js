import { View, ScrollView, StyleSheet, Text } from "react-native";
import { useState, useEffect, useCallback } from "react";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import FollowerMini from "../components/FollowerMini";
import AddFollowerModal from "../components/modals/AddFollowerModal";
import { getFollowersList, deleteFollower } from "../crud/FollowersOperations";
import {getFollowsList, deleteFollower as deleteFollowing,} from "../crud/FollowingOperations";
import { getCurrentUser } from "../crud/CacheOperations";
import { Toast } from "react-native-toast-message/lib/src/Toast";

// TODO convert to FlatList of other lazy loading schema so rendering doesn't take 1+ second for large lists
export function FollowerScreen({ route, navigation }) {
  const { isFollowerPage } = route.params;
  const [searchValue, setSearchValue] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [list, setList] = useState([]);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [nonCurrModalVisible, setNonCurrModalVisible] = useState(false);

  // TODO connect this to the backend
  useEffect(() => {
    // const list = isFollowerPage ? sampleFollowersList : sampleFollowingList;
    getLists(route.params.isFollowerPage).catch(console.error);
  }, [getLists, route.params, modalVisible, forceRefresh]);

  const getLists = useCallback(async (isFollowerPage) => {
    const currUser = await getCurrentUser();
    const list = isFollowerPage ? await getFollowersList(currUser) : await getFollowsList(currUser);
    // Maybe include guard clause to guarantee array
    if (!Array.isArray(list)) return;
    setList(list);
  }, []);

  const showFollowerDeletionSuccess = (usernameRemoved, isFollower) => {
    const message = isFollower ? `${usernameRemoved} is no longer following you` : `You have stopped following ${usernameRemoved}`;

    Toast.show({
      type: "success",
      text1: "Success",
      text2: message,
      position: "bottom",
      visibilityTime: 4000,
      bottomOffset: 80,
    });
  };

  const listItems = list
    .map((val) => (
      <FollowerMini
        testID="Follower_Screen.Follower"
        username={val.username}
        onDelete={async () => {
          let currUser = await getCurrentUser();
          if (isFollowerPage) {
            await deleteFollower(currUser, val.username);
            showFollowerDeletionSuccess(val.username, isFollowerPage);
          } else {
            await deleteFollower(val.username, currUser);
            showFollowerDeletionSuccess(val.username, isFollowerPage);
          }
          setForceRefresh(!forceRefresh);
          console.log(`Removed ${val.username}'s profile from your follower / following list!`);
        }}
        key={val.username}
        style={styles.followerMiniStyle}
        isFollowerPage={isFollowerPage}
      ></FollowerMini>
    ))
    .filter((val) => {
      const { username } = val.props;
      return username && username.startsWith(searchValue);
    });

  return (
    <View style={styles.container} testID="Follower_Screen_Header">
      <AddFollowerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        testID="Follower_Screen"
      ></AddFollowerModal>
      <View style={styles.stickyHeader}>
        <Header title={"Followers"}></Header>
        <CustomButton
          buttonType={"default"}
          text={"Follow New User"}
          onClick={() => setModalVisible(true)}
          testID="Follower_Screen.Follower_New_User"
        ></CustomButton>
        <View style={styles.pageChangeButtons}>
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            isSelected={!isFollowerPage}
            text={"Following"}
            onClick={() => navigation.navigate("Followers", { isFollowerPage: false })}
            textStyle={styles.pageChangeButtonsText}
          ></CustomButton>
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            isSelected={isFollowerPage}
            text={"Followers"}
            onClick={() => navigation.navigate("Followers", { isFollowerPage: true })}
            textStyle={styles.pageChangeButtonsText}
          ></CustomButton>
        </View>
        {listItems.length !== 0 && (
          <CustomTextInput
            customStyles={styles.searchBar}
            placeholder={"Search current friends..."}
            enteredValue={searchValue}
            onChangeHandler={(text) => setSearchValue(text)}
          ></CustomTextInput>
        )}
      </View>
      {/* TODO add "add friend" button and modal for user to enter this data */}

      {listItems.length !== 0 ? (
        <ScrollView style={styles.followerList}>{listItems}</ScrollView>
      ) : (
        <Text style={{ fontSize: 18, padding: 10, alignSelf: "center" }}>
          {route.params.isFollowerPage ? "No followers to show" : "Not following any users"}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "white",
    alignItems: "center",
  },
  stickyHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 5,
  },
  pageChangeButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
  },
  pageChangeButtonsText: {
    fontSize: 20,
  },
  searchBar: {
    margin: 10,
  },
  followerList: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  followerMiniStyle: {
    margin: 5,
  },
});
