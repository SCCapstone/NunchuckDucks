import { View, ScrollView, StyleSheet } from "react-native";
import { useState } from "react";

import Header from "../components/Header";
import CustomButton from "../components/CustomButton";
import CustomTextInput from "../components/CustomTextInput";
import FollowerMini from "../components/FollowerMini";

// TODO convert to FlatList of other lazy loading schema so rendering doesn't take 1+ second for large lists
export function FollowerScreen({ route, navigation }) {
  const { isFollowerPage } = route.params;
  const [searchValue, setSearchValue] = useState("");

  // TODO connect this to the backend
  const list = isFollowerPage ? sampleFollowersList : sampleFollowingList;

  const listItems = list
    .map((val) => (
      <FollowerMini
        userImageSrc={val.userImageSrc}
        username={val.username}
        // TODO make this have actual functionality --> after PoC
        onProfileClick={() =>
          console.log(`Clicked on ${val.username}'s profile!`)
        }
        // TODO Connect this to backend / add actual functionality
        onDelete={() =>
          console.log(
            `Removed ${val.username}'s profile from your follower / following list!`
          )
        }
        key={val.username}
        style={styles.followerMiniStyle}
      ></FollowerMini>
    ))
    .filter((val) => {
      const { username } = val.props;
      return username && username.startsWith(searchValue);
    });

  return (
    <View style={styles.container}>
      <View style={styles.stickyHeader}>
        <Header></Header>
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
          placeholder={"Search..."}
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

    alignItems: "center",
  },
  stickyHeader: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  pageChangeButtons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
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
