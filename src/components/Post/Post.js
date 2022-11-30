import { View, Image, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import Storage from "@aws-amplify/storage";
import Reactions from "../Reactions";
import { grayThemeColor } from "../../library/constants";
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

  async function getPic() {
    // TODO retrieve post picture from the passed entry fileName
    const pic = await Storage.get(entry.photo);
    setPicture(pic);
  }
  // get the pic again after a refresh
  useEffect(() => {
    getPic();
  }, [refresh]);

  return (
    <View style={styles.postBox}>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <Text style={styles.postUsername}>{entry.username}</Text>
        <Text style={styles.createdAt}>
          {getTimeElapsed(entry.createdAt)} days ago
        </Text>
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
  // The string is 2022-11-25T18:44:00.308Z
  /*var year = parseInt(createdAt.substring(0, 4));
  var month = parseInt(createdAt.substring(5, 7)) - 1;
  var day = parseInt(createdAt.substring(8, 10));
  var hour = parseInt(createdAt.substring(11, 13)) - 1;
  var min = parseInt(createdAt.substring(14, 16));
  var sec = parseInt(createdAt.substring(17, 19));*/
  var createdAtFormatted = createdAt.substring(0, 19);
  var currDate = new Date();
  //currDate = currDate.toUTCString();
  //currDate = new Date(currDate);
  var dateUploaded = new Date(createdAtFormatted);
  dateUploaded = dateUploaded.toUTCString();
  dateUploaded = new Date(dateUploaded);
  var diff = currDate.getTime() - dateUploaded.getTime();
  console.log(diff);
  var daysDifference = (diff / (1000 * 60 * 60 * 24)).toString();
  var roundedDaysDiff = daysDifference.substring(
    0,
    daysDifference.indexOf(".") + 3
  );
  return roundedDaysDiff;
}
