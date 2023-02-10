import { View, Image, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import Storage from "@aws-amplify/storage";
import Reactions from "../Reactions";
import { grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
import { cacheImageFromAWS, getImageFromCache } from "../../crud/CacheOperations";
import { useNetInfo } from "@react-native-community/netinfo";
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
  const username = entry.username;
  const refresh = props.refresh;
  const photoStr = entry.photo;
  const picName = photoStr.substring(photoStr.indexOf("/") + 1);
  const [picture, setPicture] = useState(null);

  const [pfp, setPfp] = useState("");

  async function getPictures() {
    console.log("Retrieving pic");
    // TODO retrieve post picture from the passed entry fileName
    //const postPfp = await getImageFromCache(username, "pfp.png"); // console logs pic "pfp.png found for user x..."
    const postPfp = entry.cachedPfp;

    if (postPfp !== "") {
      setPfp(postPfp);
    }
    const pic = entry.cachedPostPicture;

    //const pic = await getImageFromCache(username, picName);
    if (pic !== "") {
      console.log("Pic", picName, "for", username, "found in cache");
      setPicture(pic);
    } else if (entry.shouldBeCached === true) {
      console.log("Pic not in cache but it should be", entry.caption);
      let picCached = await cacheImageFromAWS(username, picName);
      //let picha = await Storage.get(photoStr);
      setPicture(picCached);
    } else {
      networkConnection = useNetInfo();
      console.log("Else Happened to ", username, "caption", entry.caption);
      console.log("PEE", entry);
      if (networkConnection.isConnected === true) {
        let picFromAWS = await Storage.get(photoStr);
        setPicture(picFromAWS);
      } else {
        console.log("Connection unavailable to render post", photoStr);
      }
    }
    /*const pic = await getImageFromCache(username,picName);
    if (pic !== "")
    {
      setPicture(pic);
    } else {
      const newlyCachedPic = await cacheImageFromAWS(username,picName);
      setPicture(newlyCachedPic);
    }*/
    //const postPic = await getImageFromCache(username,)
  }
  useEffect(() => {
    console.log("Reached useEffect for Post", username);
    getPictures();
  }, [refresh]);

  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <ProfileMini src={pfp} style={{ height: 42, width: 42, marginLeft: 6, marginRight: 6 }} imageStyle={{ height: 42, width: 42 }} />
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
  // returns time elapsed since post was posted, in varying levels of time
  var ans = ""; // the output
  if (createdAt == undefined) {
    // preliminary check to stop error that occurs
    return ans; // when post is expectd after creation, but createdAt cannot be retrieved yet
  }
  var createdAtFormatted = createdAt.substring(0, 19); //gets rid of a few milliseconds to make it proper format
  var currDate = new Date(); // current date and time
  var dateUploaded = new Date(createdAtFormatted); // date and time of upload

  const round = (numString) => {
    // round the output to two decimals
    return numString.substring(0, numString.indexOf(".") + 3);
  };
  // The answer will be correct for UTC time, which is  6 hours ahead of Eastern time
  // therefore, add 1800000 ms (6 hours); this will need to be addressed according to user's timezonee
  var diff = currDate.getTime() - dateUploaded.getTime() + 18000000; // get the difference between the two + 6 hrs
  var minutesDifference = diff / (1000 * 60);

  if (minutesDifference > 60) {
    // if more then 60 minutes, switch to hours
    var hoursDifference = minutesDifference / 60;
    if (hoursDifference > 24) {
      // if more than 24 hours, switch to days
      var daysDifference = hoursDifference / 24;
      ans = round(daysDifference.toString()) + " days ago";
    } else {
      ans = round(hoursDifference.toString()) + " hours ago";
    }
  } else {
    if (minutesDifference < 1) {
      // if less than a minute has passed
      ans = "less than a minute ago";
    } else {
      ans = round(minutesDifference.toString()) + " minutes ago";
    }
  }
  return ans;
}
