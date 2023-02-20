import { View, Image, Text, StyleSheet, Pressable, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Storage } from "@aws-amplify/storage";
import Reactions from "../Reactions";
import { blueThemeColor, grayThemeColor } from "../../library/constants";
import ProfileMini from "../ProfileMini";
import { useNavigation } from "@react-navigation/native";
import NonCurrUserProfileModal from "../modals/NonCurrUserProfileModal.js/NonCurrUserProfileModal";
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
  blowupmain: {
    width:"100%",
    height: 250,
    marginTop:20,
    position:"absolute",
    right:0,
    bottom:0,
    backgroundColor: 'rgba(200,212,225,0.7)',
    borderRightWidth:0,
    borderLeftWidth:0,
    borderWidth: 2,
    borderTopWidth:3,
    borderRightColor:"black",
    
  },
  blowupheader: {
    height:53,
    borderColor: "black",
    color:blueThemeColor,
    fontSize: 35,
    fontWeight:"bold",
    marginTop:2,
    textAlign:"center",
    borderBottomWidth:3,
    
  },
  blowupbody: {
    fontSize: 21,
    textAlign:"left",
    paddingLeft:20,
    marginTop:5
  },
});
export default function Post(props) {
  const entry = props.entry;
  const refresh = props.refresh;
  const [picture, setPicture] = useState(null);
  const [pfp, setPfp] = useState("");
  const [blowup,setBlowup]= useState(false);
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState("");

  const handleBlowUp=()=>{
    setBlowup(!blowup);
  }

  async function getPic() {
    // TODO retrieve post picture from the passed entry fileName
    const pic = await Storage.get(entry.photo);
    setPicture(pic);
    try {
      const pfps3 = await Storage.get(entry.username + "/pfp.png");
      setPfp(pfps3);
    } catch (error) {
      console.log("Error retrieving pfp: " + error);
    }
  }
  // get the pic again after a refresh
  useEffect(() => {
    getPic();
    setBlowup(false);
  }, [refresh, modalVisible]);

  return (
    <View style={styles.postBox}>
      <NonCurrUserProfileModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        entry={entry}>
      </NonCurrUserProfileModal>
      <View name="Header" flexDirection="row" style={styles.postHeader}>
        <ProfileMini
          src={pfp}
          style={{ height: 42, width: 42, marginLeft: 6, marginRight: 6 }}
          imageStyle={{ height: 42, width: 42 }}
          onClick={() =>
            setModalVisible(true)
          }
        />
        {/*Need to make it navigate to users specific profile*/}
          <Text style={styles.postUsername}>{entry.username}</Text>
        <Text style={styles.createdAt}>{getTimeElapsed(entry.createdAt)}</Text>
      </View>
      <Pressable onPress={handleBlowUp} style={{backgroundColor:"rgba(30,144,255,0.5)", height:"78%", bottom:-20, marginTop:-20}}>
      <Image source={{ uri: picture }} style={{ flex: 8,}}/>
      </Pressable>
      <View> 
        {blowup ?
        <View style={styles.blowupmain}>
          <View style={styles.blowupheader}>
            <Text style = {styles.blowupheader}>Today's Workout</Text>
          </View>
          <View>
            <Text style={styles.blowupbody}>- {entry.caption}</Text>
          </View>
        </View>:<Text></Text>}
      </View>
      {/*replace get time elapsed w/ actual on click utility*/}
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
