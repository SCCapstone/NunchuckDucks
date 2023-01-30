import { View, Image, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import Reactions from "../Reactions";
import { grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
const styles = StyleSheet.create({
  postBox: {
    height: 500,
    width: "100%",
    color: "green",
    borderWidth: 2,
    marginBottom: 20,
    borderRadius: 20,
  },
  captionBox: {},
  postHeader: {
    height: "10%",
    flex: 1,
    //width: "100%",
    alignItems: "center",
    //justifyContent: "flex-start",
    backgroundColor: grayThemeColor,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  postUsername: {
    /* #3C8DD9 */
    color: "#2E8CFF",
    fontWeight: "bold",
    fontSize: 28,
  },
  footer: {
    height: "10%",
    width: "100%",
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: grayThemeColor,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
  },
  createdAt: {
    marginLeft: "auto", // gives 95% of margin to the left of createdAt
    marginRight: "5%", // effectively pushing it to the right
  },
});
export default function Post(props) {
  const entry = props.entry;
  const refresh = props.refresh;
  const [picture, setPicture] = useState(null);
  const [pfp, setPfp] = useState("");

  async function getPic() {
    // TODO retrieve post picture from the passed entry fileName
    const pic = await Storage.get(entry.photo);
    setPicture(pic);
    try {
      const pfps3 = await Storage.get(entry.username + "/pfp.png");
      console.log(typeof pfps3);
      setPfp(pfps3);
    } catch (error) {
      console.log("Error retrieving pfp: " + error);
    }
  }
  // get the pic again after a refresh
  useEffect(() => {
    getPic();
  }, [refresh]);

  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <ProfileMini
          src={pfp}
          style={{ height: 42, width: 42, marginLeft: 6, marginRight: 6 }}
          imageStyle={{ height: 42, width: 42 }}
        />
        <Text style={styles.postUsername}>{entry.username}</Text>
        <Text style={styles.createdAt}>{getTimeElapsed(entry.createdAt)}</Text>
      </View>
      <Image source={{ uri: picture }} style={{ flex: 8 }} />
      {/*<View style={styles.captionBox} /> Need to implement caption box as intended*/}
      <View name="Footer" flexDirection="row" style={styles.footer}>
        <Reactions />
        <Text>{entry.caption}</Text>
      </View>
    </View>
  );
}

function getTimeElapsed(createdAt) {
  var ans = ""; // the output
  if (createdAt == undefined) {
    // Checks that createdAt exists
    // Will not exist when DataStore is not connected to remote
    return ans;
  }
  var createdAtFormatted = createdAt.substring(0, 19); //gets rid of a few milliseconds to make it proper format
  var currDate = new Date(); // current date and time in UTC
  var dateUploaded = new Date(createdAtFormatted); // date and time of upload in UTC

  // Both dates are already in UTC, this just gets the time difference
  var diff = currDate.getTime() - dateUploaded.getTime();
  var minutesDifference = diff / (1000 * 60);
  var hoursDifference = Math.floor(minutesDifference / 60);
  var daysDifference = Math.floor(hoursDifference / 24);
  var monthsDifference = Math.floor(daysDifference / 30);
  var yearsDifference = Math.floor(monthsDifference / 12);

  if (minutesDifference < 1) {
    ans = "less than a minute ago";
  } else if (minutesDifference <= 60) {
    ans = Math.round(minutesDifference.toString()) + " minutes ago";
  } else if (hoursDifference <= 24) {
    ans = Math.round(hoursDifference.toString()) + " hours ago";
  } else if (daysDifference <= 30) {
    ans = Math.round(daysDifference.toString()) + " days ago";
  } else if (monthsDifference <= 12) {
    ans = Math.round(monthsDifference.toString()) + " months ago";
  } else {
    ans = Math.round(yearsDifference.toString()) + " years ago";
  }
  return ans;
}
