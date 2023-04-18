import { View, ScrollView, StyleSheet } from "react-native";
import { useState, useEffect, useCallback } from "react";
import { Auth } from "aws-amplify";
import { DataStore } from "aws-amplify";
import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import FollowerMini from "../components/FollowerMini";
import AddFollowerModal from "../components/modals/AddFollowerModal";
import { getFollowersList, deleteFollower } from "../crud/FollowersOperations";
import {
  getFollowsList,
  deleteFollower as deleteFollowing,
} from "../crud/FollowingOperations";
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
    const list = isFollowerPage
      ? await getFollowersList(currUser)
      : await getFollowsList(currUser);
    // Maybe include guard clause to guarantee array
    if (!Array.isArray(list)) return;
    setList(list);
  }, []);

  const showFollowerDeletionSuccess = (usernameRemoved, isFollower) => {
    const message = isFollower
      ? `${usernameRemoved} is no longer following you`
      : `You have stopped following ${usernameRemoved}`;

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
        username={val.username}
        onDelete={async () => {
          const { attributes } = await Auth.currentAuthenticatedUser();
          let currUser = attributes.preferred_username;
          if (isFollowerPage) {
            await deleteFollower(currUser, val.username);
            showFollowerDeletionSuccess(val.username, isFollowerPage);
          } else {
            await deleteFollower(val.username, currUser);
            showFollowerDeletionSuccess(val.username, isFollowerPage);
          }
          setForceRefresh(!forceRefresh);
          console.log(
            `Removed ${val.username}'s profile from your follower / following list!`
          );
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
    <View style={styles.container}>
      <AddFollowerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      ></AddFollowerModal>
      <View style={styles.stickyHeader}>
        <Header title={"Followers"}></Header>
        <CustomButton
          buttonType={"default"}
          text={"Follow New User"}
          onClick={() => setModalVisible(true)}
        ></CustomButton>
        <View style={styles.pageChangeButtons}>
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            isSelected={!isFollowerPage}
            text={"Following"}
            onClick={() =>
              navigation.navigate("Followers", { isFollowerPage: false })
            }
            textStyle={styles.pageChangeButtonsText}
          ></CustomButton>
          <CustomButton
            buttonType={"hyperlink"}
            isUnderlined={true}
            isSelected={isFollowerPage}
            text={"Followers"}
            onClick={() =>
              navigation.navigate("Followers", { isFollowerPage: true })
            }
            textStyle={styles.pageChangeButtonsText}
          ></CustomButton>
        </View>
        <CustomTextInput
          customStyles={styles.searchBar}
          placeholder={"Search current friends..."}
          enteredValue={searchValue}
          onChangeHandler={(text) => setSearchValue(text)}
        ></CustomTextInput>
      </View>
      {/* TODO add "add friend" button and modal for user to enter this data */}
      <ScrollView style={styles.followerList}>{listItems}</ScrollView>
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

const sampleFollowersList = [
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John1",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John2",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John3",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John4",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John5",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John6",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John7",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John8",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John9",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John10",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "John11",
  },
  {
    userImageSrc: "invalid",
    username: "John12",
  },
];
const sampleFollowingList = [
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David1",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David2",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David3",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David4",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David5",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David6",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David7",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David8",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David9",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David10",
  },
  {
    userImageSrc:
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df",
    username: "David11",
  },
  {
    userImageSrc: "invalid",
    username: "David12",
  },
];
